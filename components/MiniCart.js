import Link from "next/link"
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React from "react"
import Image from "next/image"

export default function MiniCart() {
    const fs = useFlagship()

    //get flag 
    const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
  return (
    <div className="absolute right-0 bg-white z-50 p-5 border border-gray-200 rounded-lg mt-3 mr-4 shadow-lg">
        <div className="flex flex-col space-y-4">
                <div className="flex items-center">
                <div className="flex flex-col text-gray-700 font-light w-4/5 justify-around">
                    <div className="text-gray-900 font-light text-base w-2/3">Force 10 ring Small model in 18k pink gold and diamonds</div>
                        <div className="flex">
                            <span className="text-gray-500 font-light text-sm">1 x</span>
                            <span className="text-gray-500 font-light text-sm px-2">$2330</span>
                        </div>
                </div>
                <div className="w-1/5">
                <Image
             src="/product.png"
             alt="product-ring"
             width={100}
                height={100}
             />
                </div>
                <span className="text-gray-500 font-light text-sm">X</span>
            </div>
            <div className="flex items-center">
                <div className="flex flex-col text-gray-700 font-light w-4/5 justify-around">
                    <div className="text-gray-900 font-light text-base w-2/3">Force 10 ring Small model in 18k pink gold and diamonds</div>
                        <div className="flex">
                            <span className="text-gray-500 font-light text-sm">1 x</span>
                            <span className="text-gray-500 font-light text-sm px-2">$2330</span>
                        </div>
                </div>
                <div className="w-1/5">
                <Image
             src="/product.png"
             alt="product-ring"
             width={100}
                height={100}
             />
                </div>
                <span className="text-gray-500 font-light text-sm">X</span>
            </div>

        <div className="flex justify-between font-light">
            <div className="text-gray-500 text-base">TOTAL</div>
            <div className="text-gray-500 tracking-wide text-base">$4660</div>
        </div>

        <div className="flex space-x-4 place-content-end">
            <button className="items-center flex text-sm px-4 py-2 border border-transparent bg-orange-600 font-normal text-white shadow-sm hover:bg-orange-400">
                <span className="px-1">Checkout</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
            </button>
            {paymentFeature1Click.getValue() === 'true' &&
            <Link href='/products/confirmation'>
            <button
              className="text-sm px-4 py-2 border border-transparent bg-black font-normal text-white shadow-sm hover:bg-neutral-600"
            > 
              Pay with 1-Click
            </button>
            </Link>
            }
            </div>
            </div>
    </div>
  )
}