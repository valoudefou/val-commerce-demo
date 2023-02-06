import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function Footer({ children }) {
const fs = useFlagship();
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
return (
<>
<main>{children}</main>
<footer className="center items-center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs fixed inset-x-0 bottom-0 h-25 z-50 font-normal">
<p>Powered by Next.js / Contentful / Vercel / Tailwind CSS / Epoq / Flagship by AB Tasty</p>
<span>|</span>
<a
href="https://github.com/valoudefou/commerce-demo"
style={{color: flagBackgroundColor.getValue()}}
>
Source code
</a>
</footer>
</>
)
}
