import { useFsFlag } from "@flagship.io/react-sdk"
import Link from 'next/link'

export default function Footer({ children }) {
    const flagBackgroundColorVal = useFsFlag("//flagBackgroundColor")
    const flagBackgroundColor = flagBackgroundColorVal.getValue("white")

    return (
        <>
            <main>
                {children}
            </main>
            <footer className="mt-auto items-center flex justify-between space-x-3 p-4 text-xs">
                    <span>
                        &copy; AB Tasty / Next.js / Tailwind
                    </span>
                <Link href="https://github.com/valoudefou/commerce-demo" style={{color: flagBackgroundColor}} className="py-1 px-2 font-medium text-xs bg-[#111827] rounded-[5px]">
                    GitHub
                </Link>
            </footer>
        </>
    )
}