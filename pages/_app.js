import '../styles/globals.css'
import Head from 'next/head'
import { Flagship, FlagshipProvider, useFsFlag } from "@flagship.io/react-sdk"
import { createContext, useState, useEffect, useRef } from 'react'
import { atom, useAtom } from 'jotai'
import { usePathname } from "next/navigation"
import Context from '../components/Context'

export const AppContext = createContext()
export const themeAtom = atom(false)
export const pagePath = atom('')

function MyApp({ Component, pageProps }) {
    const [isShown, setIsShown] = useState(false)
    const pathname = usePathname()
    const [path, setPath] = useAtom(pagePath)
    const iframeRef = useRef(null)
    const [initialVisitorData, setInitialVisitorData] = useState(null)
    const [initialFlagsData, setInitialFlagsData] = useState({})
    const flagIndustryVal = useFsFlag("flagIndustry", "Product")
    const flagIndustry = flagIndustryVal.getValue()

    useEffect(() => {
        setPath(pathname)

        if (!iframeRef.current) {
            const iframe = document.createElement("iframe")
            iframe.style.visibility = "hidden"
            iframe.async = true
            document.body.appendChild(iframe)
            iframeRef.current = iframe
        }

        iframeRef.current.src = `https://live-server1.vercel.app${pathname}`

        return () => {
            if (iframeRef.current?.parentNode) {
                iframeRef.current.parentNode.removeChild(iframeRef.current)
                iframeRef.current = null
            }
        }
    }, [pathname, setPath])

    useEffect(() => {
        window.dispatchEvent(new CustomEvent('spaDetection', { detail: { message: 'SPA' } }))
    }, [path])

    // ⚠️ NEW: Fetch visitor + flags on client only
    useEffect(() => {
        async function fetchFlags() {
            const flagship = Flagship.start(process.env.NEXT_PUBLIC_FS_ENV, process.env.NEXT_PUBLIC_FS_KEY, {
                fetchNow: false
            })

            const visitorData = {
                id: '4c970578-679d-49a6-81b9-cdad6960a99b',
                context: {
                    device: 'mobile',
                    route: '',
                    segment: 'cosmetic',
                    login: true,
                    region: 3,
                    user: 'new'
                }
            }

            const visitor = flagship.newVisitor({
                visitorId: visitorData.id,
                context: visitorData.context
            })

            await visitor.fetchFlags()
            setInitialVisitorData(visitorData)
        }

        fetchFlags()
    }, [])

    if (!initialVisitorData) {
        // Optionally show a loading screen
        return <div>Loading...</div>
    }

    return (
        <AppContext.Provider value={[isShown, setIsShown]}>
            <FlagshipProvider
                envId={process.env.NEXT_PUBLIC_FS_ENV}
                apiKey={process.env.NEXT_PUBLIC_FS_KEY}
                visitorData={initialVisitorData}
                initialFlagsData={initialFlagsData}
                onVisitorExposed={({ exposedVisitor, fromFlag }) => 
                    dataLayer.push({
                        event: 'abtasty_flag',
                        campaignId: fromFlag.metadata.campaignId,
                        campaignType: fromFlag.metadata.campaignType,
                        isReference: fromFlag.metadata.isReference,
                        key: fromFlag.key,
                        slug: fromFlag.metadata.slug,
                        val: fromFlag.value,
                        variationId: fromFlag.metadata.variationId,
                        variationName: fromFlag.metadata.variationName,
                    })
                }
            >
                <Head />
                <Context />
                <title>{'The ' + flagIndustry + ' House'}</title>
                <Component {...pageProps} />
            </FlagshipProvider>
        </AppContext.Provider>
    )
}

export default MyApp
