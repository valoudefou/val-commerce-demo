import { useFsFlag } from "@flagship.io/react-sdk"

export default function Footer({ children }) {
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")

    return (
        <>
            <main>
                {children}
            </main>
            <footer className="mt-auto items-center flex justify-between space-x-3 p-4 text-xs inset-x-0 z-20">
                <span>
                    &copy; AB Tasty / Next.js / Tailwind
                </span>
                <a href="https://github.com/valoudefou/commerce-demo" style={{color: flagBackgroundColor.getValue()}} className="p-1 font-medium text-xs bg-[#111827] rounded-[5px]">
                    GitHub
                </a>
            </footer>
        </>
    )
}

