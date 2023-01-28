import '../styles/globals.css'
import Layout from '../components/layout'
import Head from 'next/head'
import { Flagship, FlagshipProvider } from "@flagship.io/react-sdk";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>The Coffee House</title>
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
