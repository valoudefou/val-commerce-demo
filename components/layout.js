import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function Layout({ children }) {
  const fs = useFlagship();
  const flagBackgroundColor = useFsFlag("flagBackgroundColor", "#FF6600")
  return (
    <>
      <main>{children}</main>
      <footer className="center mt-5 flex justify-center space-x-4 bg-[#E7E8EF] p-4 text-xs">
        <p>Powered by Next.js, Swell, and Vercel </p>
        <span>|</span>
        <a
          href="https://github.com/Nutlope/nextjs-swell"
          className="font-medium text-orange-600" style={{color: flagBackgroundColor.getValue()}}
        >
          Source code
        </a>
      </footer>
    </>
  )
}
