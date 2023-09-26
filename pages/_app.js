import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import App from "next/app"
import Footer from '../components/Footer'
import { v4 as uuidv4 } from 'uuid'
import { useEffect } from 'react'

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {

// AB Tasty anti flicker
useEffect(() => {
if (typeof window !== 'undefined') {
        const antiFlicker = document.querySelector('#ab-tasty-anti-flicker')
        if (antiFlicker && window.ABTasty !== 'undefined') {
            window.addEventListener('abtasty_executedCampaign', (event) => {
                console.log(event.detail)
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
<FlagshipProvider
envId={"blrok2jb3fq008ho9c70"}
apiKey={"k0Q3wqL9GEajXlL6dw8vr4zfqxz50LIa7QAJDz8q"}
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
const flagship = Flagship.start("blrok2jb3fq008ho9c70", "k0Q3wqL9GEajXlL6dw8vr4zfqxz50LIa7QAJDz8q", {
fetchNow: false,
})
const initialVisitorData = {
id: uuidv4(),
context: {
organisation: "whatever",
segment: "coffee",
login: 'true',
system: "ios",
regionId: 3,
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
