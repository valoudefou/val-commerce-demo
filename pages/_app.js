import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, useFsFlag } from "@flagship.io/react-sdk"
import App from "next/app"
import { createContext, useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { usePathname } from "next/navigation"
import Context from '../components/Context'

export const AppContext = createContext()
export const themeAtom = atom(false)
export const pagePath = atom('')

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
    const [isShown, setIsShown] = useState(false)
    const pathname = usePathname()
    const [path, setPath] = useAtom(pagePath)

    useEffect(() => {
        setPath(pathname); // Update the atom state when `pathname` changes.
        console.log(pathname);
    }, [pathname, setPath]); // Dependencies to avoid unnecessary reruns.

    useEffect(() => {
        // Create a custom event
        const customEvent = new CustomEvent('spaDetection', {
            detail: { message: 'SPA' },
        });

        // Dispatch the event on the window object
        window.dispatchEvent(customEvent);
    }, [path]);

    // Get flag 
    const flagIndustryVal = useFsFlag("flagIndustry")
    const flagIndustry = flagIndustryVal.getValue("Product")

    return (
        <>
            <AppContext.Provider value={[isShown, setIsShown]}>
                <FlagshipProvider
                    envId={process.env.NEXT_PUBLIC_FS_ENV}
                    apiKey={process.env.NEXT_PUBLIC_FS_KEY}
                    visitorData={initialVisitorData}
                    initialFlagsData={initialFlagsData || {}}
                    onVisitorExposed={({ exposedVisitor, fromFlag }) => 
                        dataLayer.push({
                            'event': 'abtasty_flag',
                            "campaignId": fromFlag.metadata.campaignId,
                            "campaignType": fromFlag.metadata.campaignType,
                            "isReference": fromFlag.metadata.isReference,
                            "key": fromFlag.key,
                            "slug": fromFlag.metadata.slug,
                            "val": fromFlag.value,
                            "variationId": fromFlag.metadata.variationId,
                            "variationName": fromFlag.metadata.variationName,
                        })
                    }
                >
                    <Head />
                    <Context />
                    <title>{'The ' + flagIndustry + ' House'}</title>
                    <Component {...pageProps} />
                </FlagshipProvider>
            </AppContext.Provider>
        </>
    )
}

MyApp.getInitialProps = async (AppContext) => {
    const appProps = await App.getInitialProps(AppContext)
    const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
        fetchNow: false,
    })

    const initialVisitorData = {
        id: '',
            context: {
            device: 'mobile',
            route: '',
            segment: 'cosmetic',
            login: true,
            region: 3
        }
    }

    const visitor = flagship?.newVisitor({
        visitorId: initialVisitorData.id,
        context: initialVisitorData.context,
    })

    await visitor?.fetchFlags()

    return {
        ...appProps,
        initialVisitorData,
    }
}

export default MyApp