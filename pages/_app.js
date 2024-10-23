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
    const { updateContext } = useFlagship()
    const pathname = usePathname()
    const [path, setPath] = useAtom(pagePath)
    setPath(pathname)

    useEffect(() => {
        localStorage.setItem('FS_VISITOR', initialVisitorData.id) // BYOID in localStorage
        document.cookie = 'FS_VISITOR=' + initialVisitorData.id // BYOID in a cookie
    }, [])

    // Get flag 
    const flagIndustry = useFsFlag("flagIndustry", "Product")

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
                    <title>{'The ' + flagIndustry.getValue() + ' House'}</title>
                    <Component {...pageProps} />
                </FlagshipProvider>
            </AppContext.Provider>
        </>
    )
}

MyApp.getInitialProps = async (AppContext) => {
    const appProps = await App.getInitialProps(AppContext)

    // Start the Flagship SDK
    const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
        fetchNow: false,
    })

    const initialVisitorData = {
        id: '4c970578-679d-49a6-81b9-cdad6960a63b',
        // id: uuidv4(),
            context: {
            organisation: "whatever",
            device: 'mobile',
            store: 'US',
            route: '',
            subscription: 'true',
            segment: 'cosmetic',
            store: '1',
            profile: 'something',
            positioning: 'terrace',
            member: 'true',
            login: 'true',
            book: 'test',
            sku: '92842942398',
            ios: "true",
            regionId: 3,
            ios: '16'
        },
    }
    // Create a new visitor
    const visitor = flagship?.newVisitor({
        visitorId: initialVisitorData.id,
        context: initialVisitorData.context,
    })

    // Fetch flags
    await visitor?.fetchFlags()

    // Pass data to the page via props
    return {
        ...appProps,
        // initialFlagsData: visitor?.getFlagsDataArray(),
        initialVisitorData,
    }
}

export default MyApp