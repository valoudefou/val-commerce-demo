import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import App from "next/app"
import Footer from '../components/Footer'

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
const fs = useFlagship()

//get flag 
const flagIndustry = useFsFlag("flagIndustry", "Product")
return (
<>
<FlagshipProvider
visitorData={initialVisitorData}
initialFlagsData={initialFlagsData} //  set initial flags fetched server side
envId={process.env.FS_ENV}
apiKey={process.env.FS_KEY}>
<Head />
<title>{'The ' + flagIndustry.getValue() + ' House'}</title>
<Component {...pageProps} />
<Footer />
</FlagshipProvider>
</>
)
}

MyApp.getInitialProps = async (appContext) => {
const appProps = await App.getInitialProps(appContext);

//Start the Flagship SDK
const flagship = Flagship.start(process.env.FS_ENV, process.env.FS_KEY, {
fetchNow: false,
});

const initialVisitorData = {
id: "my_visitor_id192",
context: {
segment: "jewelry",
system: "ios",
regionId: 3,
},
};

// Create a new visitor
const visitor = flagship?.newVisitor({
visitorId: initialVisitorData.id,
context: initialVisitorData.context,
});

//Fetch flags
await visitor?.fetchFlags()

// Pass data to the page via props
return {
...appProps,
initialFlagsData: visitor?.getFlagsDataArray(),
initialVisitorData,
};
};

export default MyApp
