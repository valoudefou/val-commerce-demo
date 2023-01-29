import '../styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'
import { Flagship, FlagshipProvider, HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import App from "next/app"
import Script from 'next/script'

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
  const fs = useFlagship();

  //get flag 
  const flagIndustry = useFsFlag("flagIndustry", "Product");
  return (
    <>
      <Script src="https://try.abtasty.com/1ceff369b6cd9aceaa9ee318e6498167.js" />
      <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-983490BZWX" />
      <FlagshipProvider
      visitorData={initialVisitorData}
      initialFlagsData={initialFlagsData} //  set initial flags fetched server side
      envId={"blrok2jb3fq008ho9c70"}
      apiKey={"k0Q3wqL9GEajXlL6dw8vr4zfqxz50LIa7QAJDz8q"}
    >
      <Head>
        <title>{'The ' + flagIndustry.getValue() + ' House'}</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
        <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-983490BZWX');
        `}
      </Script>
      </Layout>
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
    id: "my_visitor_id8",
    context: {
      segment: "jewelry",
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
