// import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

// export default function Footer({ children }) {
// const fs = useFlagship();
// const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
// return (
// <>
// <main>{children}</main>
// <footer className="center items-center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs fixed inset-x-0 bottom-0 h-25 z-50 font-normal">
// <p>Powered by Next.js / Vercel / Tailwind / Contentful / AB Tasty / EmotionsAI</p>
// <span>|</span>
// <a
// href="https://github.com/valoudefou/val-commerce-demo"
// style={{color: flagBackgroundColor.getValue()}}
// >
// GitHub
// </a>
// </footer>
// </>
// )
// }


import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { useEffect, useState } from "react";

export default function Footer({ children }) {

    const [items, setItems] = useState([]);

    useEffect(() => {
        const items = JSON.parse(window.sessionStorage.getItem('ABTastyCustomSegments'));
        if (items) {
            const interval1 = setInterval(() => {
                console.log('checking emotionsAI info')
                console.log('emotionsAI info is found')
                clearInterval(interval1)
                const interval2 = setInterval(() => {
                    console.log('emotionsAI determines emotional need as the user browses the app')
                    if (items.length > 1) {
                        console.log("The user emotion passed to AB Tasty SDK is -----> " + items[1].dotaki_need)
                        setItems(items)
                        clearInterval(interval2)
                    }
                }, 1000);
            }, 1000);
        }
    }, []);


    const fs = useFlagship();
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
    return (
        <>
        <main>{children}</main>
        <footer className="center items-center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs fixed inset-x-0 bottom-0 h-25 z-50 font-normal">
        <p>Powered by Next.js / Vercel / Tailwind / Contentful / AB Tasty / EmotionsAI</p>
        <span>|</span>
        <a
        href="https://github.com/valoudefou/commerce-demo"
        style={{color: flagBackgroundColor.getValue()}}>
        GitHub
        </a>
        </footer>
        </>
    )
}

