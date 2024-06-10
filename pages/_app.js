import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import App from "next/app"
import Footer from '../components/Footer'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {

useEffect(() => {

    if (typeof window !== 'undefined') {
        const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')

        if (antiFlicker && window.ABTasty !== 'undefined') {
            window.addEventListener('abtasty_executedCampaign', (event) => {
                // console.log(event.detail)
                function antiFlicker() {
                    const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')  
                    antiFlicker.style.visibility = 'hidden'
                }
                setTimeout(antiFlicker, 500)
            })
        } 
    } 

    // anti flicker when AB Tasty is not defined
    window.addEventListener('load', () => {
        const antiFlicker = document.querySelector('#ab-tasty-anti-flicker') 

        if (antiFlicker) {
            antiFlicker.style.visibility = 'hidden'
        }
    })
    
}, [])

//get flag 
const fs = useFlagship()
const flagIndustry = useFsFlag("flagIndustry", "Product")
return (
<>
{/* <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={() => setName("")}>Clear</button>
    </div> */}
<FlagshipProvider
onVisitorExposed={({ exposedVisitor, fromFlag }) => {
    window.abtasty.send("segment", {
        s: {
          userId: exposedVisitor.id,
          flagInfo: fromFlag.metadata
        }
    })
}}
envId={process.env.NEXT_PUBLIC_FS_ENV}
apiKey={process.env.NEXT_PUBLIC_FS_KEY}
visitorData={initialVisitorData}
initialFlagsData={initialFlagsData || {}}>

<Head />
<title>{'The ' + flagIndustry.getValue() + ' House'}</title>
<Component {...pageProps} />
<Footer />

</FlagshipProvider>
</>
)
}
MyApp.getInitialProps = async (appContext) => {
const appProps = await App.getInitialProps(appContext)

//Start the Flagship SDK
const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
    fetchNow: false,
})

const initialVisitorData = {
// id: 'test20',
id: uuidv4(),
context: {
    organisation: "whatever",
    device: 'mobile',
    store: 'US',
    subscription: 'true',
    page: '/product',
    segment: 'shop',
    member: 'true',
    beta: 'test',
    product: '20948209482098490284',
    login: 'true',
    book: 'test',
    sku: '92842942398',
    ios: "true",
    regionId: 3,
    android: '0.0.3',
    },
}
// Create a new visitor
const visitor = flagship?.newVisitor({
    visitorId: initialVisitorData.id,
    context: initialVisitorData.context,
})

//Fetch flags
await visitor?.fetchFlags()

// Pass data to the page via props
return {
    ...appProps,
    initialFlagsData: visitor?.getFlagsDataArray(),
    initialVisitorData,
    }
}

export default MyApp
