import Image from 'next/image'
import { HitType, useFsFlag, useFlagship } from "@flagship.io/react-sdk"
import Link from 'next/link'
import Navbar from '../components/Navbar'

export default function Header() {
const fs = useFsFlag()
const { getFlag } = useFlagship()

// Get flag 
const flagImageSrcVal = getFlag("flagImageSrc")
const flagImageSrc = flagImageSrcVal.getValue("/jewelry.jpg")
const flagBtnTextVal = getFlag("flagBtnText", "Shop")
const flagBtnText = flagBtnTextVal.getValue()
const flagIndustryVal = getFlag("flagIndustry", "Product")
const flagIndustry = flagIndustryVal.getValue()
const flagBackgroundColorVal = getFlag("flagBackgroundColor")
const flagBackgroundColor = flagBackgroundColorVal.getValue("black")

  return (
    <header className="relative">
      <Navbar/>
      <div className="absolute inset-x-0 bottom-0 h-1/2" />
        <div className="mx-auto">
          <div className="relative sm:overflow-hidden">
            <div className="absolute inset-0">
              <Image
                priority
                layout='fill'
                className="h-full w-full object-cover"
                src={flagImageSrc}
                alt={flagIndustry}
              />
              <div className="absolute inset-0" />
            </div>
            <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="mx-auto max-w-xl text-center text-xl font-semibold uppercase tracking-wide text-white">
            {'The ' + flagIndustry + ' House'}
            </p>
            <h1 className="mt-1 text-center font-semibold text-gray-900 text-4xl sm:text-5xl">
            <span className="block text-white">Life is better with</span>
            <span className="block" style={{color: flagBackgroundColor}}>{flagIndustry}</span>
            </h1>
            <div className="mt-10 flex justify-center">
              <Link href="/products">
                <button onClick={()=>{
                    fs.sendHits({
                      type: HitType.EVENT, 
                      category: EventCategory.USER_ENGAGEMENT,
                      action: "click",
                      label: "label",
                      value: 100
                    })
                  }}
                  className="flex items-center justify-center py-4 px-8 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-bold text-sm rounded-full font-medium" id="ab-btn">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                  </svg>
                  {flagBtnText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}