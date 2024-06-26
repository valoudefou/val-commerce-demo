import { useFsFlag } from "@flagship.io/react-sdk"

export default function Footer({ children }) {
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")

    return (
        <>
            <main>
                {children}
            </main>
            <footer className="max-w-fit mt-auto items-center flex justify-center space-x-3 p-4 text-xs inset-x-0 z-20">
                <p>Next.js / Vercel / Tailwind / AB Tasty</p>
                    <span>|</span>
                <a href="https://github.com/valoudefou/commerce-demo" style={{color: flagBackgroundColor.getValue()}} className="p-1 font-medium text-xs bg-[#111827] rounded-[5px]">
                    GitHub
                </a>
            </footer>
        </>
    )
}

