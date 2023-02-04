import Image from 'next/image'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function Header({ scrollHandler }) {
  const fs = useFlagship();

  //get flag 
  const flagImageSrc = useFsFlag("flagImageSrc", "/hero.jpg")
  const flagBtnText = useFsFlag("flagBtnText", "Shop")
  const flagIndustry = useFsFlag("flagIndustry", "Product")
  const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
  return (
    <header className="relative">
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gray-100" />
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <Image
              priority
              fill
              className="h-full w-full object-cover"
              src={flagImageSrc.getValue()}
              alt={flagIndustry.getValue()}
            />
            <div className="absolute inset-0 bg-orange-100 mix-blend-multiply" />
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center text-xl font-semibold uppercase tracking-wide text-white">
              {'The ' + flagIndustry.getValue() + ' House'}
            </p>
            <h1 className="mt-1 text-center font-medium text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              <span className="block text-white">Life is better with</span>
              <span className="block text-orange-500" style={{color: flagBackgroundColor.getValue()}}>{flagIndustry.getValue()}</span>
            </h1>

            <div className="mx-auto mt-10 max-w-xs sm:flex sm:max-w-none sm:justify-center">
              <button
                className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-100 sm:px-8" id="ab-btn"
                onClick={scrollHandler}
              >
                {flagBtnText.getValue()}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
