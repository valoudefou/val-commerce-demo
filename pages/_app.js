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
        // create a new datalyer, or let it be empty
        window.dataLayer = window.dataLayer || [];

        //reset datalayer if length greater than 150, otherwise might cause issues
        if (window.dataLayer.length > 150) {
            window.dataLayer = []

            // this is how the documentation says to flush the datalayer, but is not working
            // so using the above line where dataLayer = []

            /*window.dataLayer.push(function() {
            this.reset();
            })*/
        }

        // window.exponea.getSegments(  <---- Documentation getSegments method https://documentation.bloomreach.com/engagement/docs/accessing-exposed-segmentations-from-engagement
        // exposingCategory,  
        // successCallback,  
        // errorCallback,  
        // options  
        // )
        
        // store Bloomreach Segmentation in Variable Const??

        // insert Bloomreach data into datalayer
        window.dataLayer.push({
            'id': '66140257f4cb337324209871',
            'segmentation_id': '6655eb642e47971cc0272a72'
        },
        {                  
            'id': '66140257f4cb337324209871',
            'segmentation_id': '6655eb642e47971cc0272a73'
        });
    }

    if (typeof window !== 'undefined') {
        const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')

        if (antiFlicker && window.ABTasty !== 'undefined') {
            window.addEventListener('abtasty_executedCampaign', (event) => {
                // console.log(event.detail)
                function antiFlicker() {
                    const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')  

                    antiFlicker.style.visibility = 'hidden'
                    // fsHit.send({
                    //     type: HitType.PAGE, // or "PAGEVIEW",
                    //     documentLocation: location.href
                    // });
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
    segment: 'coffee',
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
