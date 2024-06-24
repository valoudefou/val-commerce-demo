import { useFsFlag } from "@flagship.io/react-sdk"

export default function Footer({ children }) {
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")

    return (
        <>
            <main>
                {children}
            </main>
            <footer className="center items-center flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs fixed inset-x-0 bottom-0 h-25 z-20">
                <p>Next.js / Vercel / Tailwind / AB Tasty</p>
                    <span>|</span>
                <a href="https://github.com/valoudefou/commerce-demo" style={{color: flagBackgroundColor.getValue()}} className="p-1 font-medium text-xs bg-[#111827] rounded-[5px]">
                    GitHub
                </a>
            </footer>
        </>
    )
}

