import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, useFsFlag, useFlagship } from "@flagship.io/react-sdk"
import App from "next/app"
import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect } from 'react'
import { atom, useAtom } from 'jotai'
import { usePathname } from "next/navigation"

export const AppContext = createContext()
export const themeAtom = atom(false)
export const pagePath = atom('')

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
    const [isShown, setIsShown] = useState(false)
    const pathname = usePathname()
    const [path, setPath] = useAtom(pagePath)
    setPath(pathname)

    useEffect(() => {
        localStorage.setItem('FS_VISITOR', initialVisitorData.id) // BYOID in localStorage
        document.cookie = 'FS_VISITOR=' + initialVisitorData.id // BYOID in a cookie
    }, [])

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
                    <Head/>
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
        // id: '4c970578-679d-49a6-81b9-cdad6960a63b',
        id: uuidv4(),
            context: {
            device: 'mobile',
            route: '',
            segment: 'cosmetic',
            login: true,
            region: 3
        },
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