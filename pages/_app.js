import '../styles/globals.css';
import Head from 'next/head';
import { Flagship, FlagshipProvider, useFsFlag } from "@flagship.io/react-sdk";
import App from "next/app";
import { createContext, useState, useEffect, useRef } from 'react';
import { atom, useAtom } from 'jotai';
import { usePathname } from "next/navigation";
import Context from '../components/Context';
import { pushToDataLayer } from '../utils/analytics';

export const AppContext = createContext()
export const themeAtom = atom(false)
export const pagePath = atom('')

function MyApp({ Component, pageProps, initialFlagsData, initialVisitorData }) {
    const [isShown, setIsShown] = useState(false)
    const pathname = usePathname()
    const [path, setPath] = useAtom(pagePath)
    const iframeRef = useRef(null)

    useEffect(() => {
        setPath(pathname); // Update the atom state when `pathname` changes.
        console.log(pathname);
    
        if (!iframeRef.current) {
            // Create the iframe only once
            const iframe = document.createElement("iframe");
            iframe.style.visibility = "hidden"; // Hide the iframe
            iframe.async = true;
            document.body.appendChild(iframe);
            iframeRef.current = iframe;
        }
        
        // Update the iframe src instead of replacing it
        iframeRef.current.src = `https://live-server1.vercel.app${pathname}`;

        return () => {
            if (iframeRef.current && iframeRef.current.parentNode) {
                iframeRef.current.parentNode.removeChild(iframeRef.current);
                iframeRef.current = null;
            }
        };
    }, [pathname, setPath]); // Dependencies to avoid unnecessary reruns

    // useEffect(() => {
    //     // Create a custom event
    //     const customEvent = new CustomEvent('spaDetection', {
    //         detail: { message: 'SPA' },
    //     });

    //     // Dispatch the event on the window object
    //     window.dispatchEvent(customEvent);
    // }, [path]);

    // Get flag 
    const flagIndustryVal = useFsFlag("flagIndustry")
    const flagIndustry = flagIndustryVal.getValue("Product")

    return (
        <>
            <AppContext.Provider value={[isShown, setIsShown]}>
                <FlagshipProvider
                    envId={process.env.NEXT_PUBLIC_FS_ENV}
                    apiKey={process.env.NEXT_PUBLIC_FS_KEY}
                    visitorData={initialVisitorData}
                    initialFlagsData={initialFlagsData || {}}
                    onVisitorExposed={({ exposedVisitor, fromFlag }) => 
                        pushToDataLayer({
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
                    <Head />
                    <Context />
                    <title>{'The ' + flagIndustry + ' House'}</title>
                    <Component {...pageProps} />
                </FlagshipProvider>
            </AppContext.Provider>
        </>
    )
}

MyApp.getInitialProps = async (AppContext) => {
    const appProps = await App.getInitialProps(AppContext)
    const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
        fetchNow: false,
    })

    const initialVisitorData = {
        id: '4c970578-679d-49a6-81b9-cdad6960a99b', // Pass ID or AB Tasty generates one when empty
        context: {
            device: 'mobile',
            route: '',
            segment: 'coffee',
            login: true,
            region: 3,
            user: 'new'
        }
    }

    const visitor = flagship?.newVisitor({
        visitorId: initialVisitorData.id,
        context: initialVisitorData.context,
    })

    await visitor?.fetchFlags()

    return {
        ...appProps,
        initialVisitorData,
    }
}

export default MyApp
