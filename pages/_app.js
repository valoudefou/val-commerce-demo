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
const appProps = await App.getInitialProps(appContext);

//Start the Flagship SDK
const flagship = Flagship.start("blrok2jb3fq008ho9c70", "k0Q3wqL9GEajXlL6dw8vr4zfqxz50LIa7QAJDz8q", {
fetchNow: false,
});

const initialVisitorData = {
id: "my_visitor_id343",
context: {
segment: "coffee",
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
