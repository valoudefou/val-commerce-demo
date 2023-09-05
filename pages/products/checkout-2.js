import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function Checkout() {
const fs = useFlagship();
//get flag 
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
return (
<>
<Link href="/">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" color={flagBackgroundColor.getValue()} strokeWidth="0.8" stroke="currentColor" className="absolute left-7 top-7 h-12 w-12">
<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</Link>
<h2 id="order-details" className='bg-yellow-500 sm:leading-tight flex justify-center h-screen items-center px-16 text-center sm:text-5xl text-3xl font-thin'>User goes through a new checkout funnel to A/B test</h2>
</>
);
}