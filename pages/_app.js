import '../styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'
import { Flagship, FlagshipProvider } from "@flagship.io/react-sdk";

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
  return (
    <>
      <Head>
        <title>The Coffee House</title>
      </Head>
      <Layout>
      <FlagshipProvider
      visitorData={initialVisitorData}
      initialFlagsData={initialFlagsData} //  set initial flags fetched server side
      envId={"blrok2jb3fq008ho9c70"}
      apiKey={"k0Q3wqL9GEajXlL6dw8vr4zfqxz50LIa7QAJDz8q"}
    >
        <Component {...pageProps} />
        </FlagshipProvider>
      </Layout>
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
    id: "my_visitor_id",
    context: {
      any: "value",
    },
  };

  // Create a new visitor
  const visitor = flagship?.newVisitor({
    visitorId: initialVisitorData.id,
    context: initialVisitorData.context,
  });

  //Fetch flags
  await visitor?.fetchFlags();

  // Pass data to the page via props
  return {
    ...appProps,
    initialFlagsData: visitor?.getFlagsDataArray(),
    initialVisitorData,
  };
};

export default MyApp
