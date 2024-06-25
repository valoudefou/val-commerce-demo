import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, useFsFlag } from "@flagship.io/react-sdk"
import App from "next/app"
import { v4 as uuidv4 } from 'uuid'
import { createContext, useState, useEffect, useRef } from 'react'

export const AppContext = createContext()

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData, OnVisitorExposed }) {
    const [isShown, setIsShown] = useState(false)
    const sendData = useRef(0) // Prevent dataLayer to push duplicates of abtasty_flag event

    useEffect(() => {
        localStorage.setItem('FS_VISITOR', initialVisitorData.id) // BYOID in localStorage
        document.cookie = 'FS_VISITOR=' + initialVisitorData.id // BYOID in a cookie
        sendData.current = sendData.current + 1

        if (sendData.current === 1) {
            initialFlagsData.map(items => dataLayer.push({
                'event': 'abtasty_flag',
                "campaignId": items.campaignId,
                "campaignType": items.campaignType,
                "isReference": items.isReference,
                "key": items.key,
                "slug": items.slug,
                "val": items.value,
                "variationGroupId": items.variationGroupId,
                "variationId": items.variationId
            }))
        }
        
        if (typeof window !== 'undefined') {
            const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')
            
            if (antiFlicker && window.ABTasty !== 'undefined') {
                window.addEventListener('abtasty_executedCampaign', () => {
                    function antiFlicker() {
                        const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')  
                        antiFlicker.style.visibility = 'hidden'
                    }
                    setTimeout(antiFlicker, 500)
                })
            } 
        } 

        // Anti-flicker when AB Tasty is not defined
        window.addEventListener('load', () => {
            const antiFlicker = document.querySelector('#ab-tasty-anti-flicker') 

            if (antiFlicker) {
                antiFlicker.style.visibility = 'hidden'
            }
        })
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
                    console.log('flagship_event', {
                        distinct_id: exposedVisitor.id,
                        ...fromFlag.metadata
                    })}
                >
                    <Head />
                    <title>{'The ' + flagIndustry.getValue() + ' House'}</title>
                    <Component {...pageProps} />
                </FlagshipProvider>
            </AppContext.Provider>
        </>
    )
}

MyApp.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext)

    // Start the Flagship SDK
    const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
        fetchNow: false,
    })

    const initialVisitorData = {
        id: '3c970578-679d-49a6-81b9-cdad6960a63b',
        // id: uuidv4(),
            context: {
            organisation: "whatever",
            device: 'mobile',
            store: 'US',
            subscription: 'true',
            segment: 'shop',
            store: '1',
            positioning: 'terrace',
            member: 'true',
            beta: 'test',
            product: '20948209482098490284',
            login: 'true',
            book: 'test',
            sku: '92842942398',
            ios: "true",
            regionId: 3,
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
        initialFlagsData: visitor?.getFlagsDataArray(),
        initialVisitorData,
    }
}

export default MyApp