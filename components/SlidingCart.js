import Link from "next/link"
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import Image from "next/image"

function SlidingCart() {
const fs = useFlagship()
//get flag 
const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
return (
<div>
<div className="h-screen w-screen top-0 z-20 bg-gray-900 fixed opacity-70"></div>
<div className="flex-auto h-screen top-0 z-20 select-none fixed right-0 bg-white p-8 border border-gray-200 shadow-lg">
<div className="grid grid-cols-1 gap-4 py-20">
<div className="mb-10 text-3xl font-semibold text-gray-900">Cart</div>
<div className="flex items-center">
<div className="flex flex-col text-gray-700 font-light justify-around">
<span className="text-gray-900 font-light text-normal mt-2 w-4/5">Force 10 ring Small model in 18k pink gold and diamonds</span>
<div className="flex items-center">
<span className="text-gray-500 font-light text-normal">1 x</span>
<span className="text-gray-500 font-light text-normal px-2">2,330.00 €</span>
</div>
</div>
<Image
src="/product.png"
alt="product-ring"
width={70}
height={70}
/>
<span className="text-gray-500">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 w-4 h-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</span>
</div>
<div className="flex items-center">
<div className="flex flex-col text-gray-700 font-light justify-around">
<span className="text-gray-900 font-light text-normal mt-2 w-4/5">Force 10 ring Small model in 18k pink gold and diamonds</span>
<div className="flex items-center">
<span className="text-gray-500 font-light text-normal">1 x</span>
<span className="text-gray-500 font-light text-normal px-2">2,330.00 €</span>
</div>
</div>
<Image
src="/product.png"
alt="product-ring"
width={70}
height={70}
/>
<span className="text-gray-500">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 w-4 h-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
</svg>
</span>
</div>
<div className="flex justify-between font-light border-t-[1px] py-3 mt-6 text-sm">
<span className="text-gray-500 text-base font-normal">TOTAL</span>
<span className="text-gray-500 tracking-wide text-base font-normal">4,660.00 €</span>
</div>
<div className="flex space-x-4 place-content-end items-stretch">
{paymentFeature1Click.getValue() === 'true' &&
<Link href='/products/confirmation'>
<button
className="flex items-center text-2xl px-5 py-2 border border-transparent bg-black font-normal text-white shadow-sm hover:bg-neutral-600"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="23px" height="23px">    
<path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
</svg>
Pay
</button>
</Link>
}
<button className="items-center flex text-normal px-5 py-2 border border-transparent bg-orange-600 font-normal text-white shadow-sm hover:bg-orange-700"
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 py-0.5 w-5 h-5">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
Checkout
</button>
</div>
</div>
</div>
</div>
)
}

export default SlidingCart