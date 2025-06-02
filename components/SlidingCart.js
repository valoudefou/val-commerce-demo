import Link from "next/link"
import { useFsFlag } from "@flagship.io/react-sdk"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../pages/_app"
import Image from "next/image"
import { pushToDataLayer } from "../utils/analytics"

function SlidingCart() {
  const [isShown, setIsShown] = useContext(AppContext)

  // Function to format the price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(price);
  }

  async function handleRemoveItem () {
    setIsShown(false)
    const itemName = 'currentProduct'
    localStorage.removeItem(itemName)

    pushToDataLayer({
      event: 'remove_from_cart',
      ecommerce: {
        'currency': 'EUR',
        'value': data.productPrice,
        items: [{
          'item_id': data.productId,
          'item_name': data.productTitle,
          'item_category': data.productCategory,
          'price': data.productPrice,
          'quantity': data.productQuantity
        }]
      }
    })
  }

  const [cartContent, setHtmlContent] = useState('')
  const [data, setData] = useState('')

  const handleClick = () => {
    setHtmlContent(false)
  }

  useEffect(() => {
    const storedHtml = localStorage.getItem('currentProduct')
    const cartContent = '<p className="font-semibold">1 item in your basket</p>'

    if (storedHtml) {
      setHtmlContent(cartContent)
      const value = window.localStorage.getItem('currentProduct')
      setData(JSON.parse(value))
    }
  }, [])

  // Get flag 
  const paymentFeature1ClickVal = useFsFlag("paymentFeature1Click")
  const paymentFeature1Click = paymentFeature1ClickVal.getValue(false)

  return (
    <div>
      <div onClick={() => setIsShown(!isShown)} className="h-screen w-screen top-0 z-20 bg-gray-800 fixed opacity-25"></div>
      <div className="flex-auto h-screen top-0 z-20 fixed right-0 bg-white p-6 border border-gray-200">
        <div className="w-64">
          <div className="text-3xl font-semibold text-gray-900 pt-20">
            Cart
          </div>
          {cartContent ? (
            <div className="grid grid-cols-1 gap-3 py-[15px]" dangerouslySetInnerHTML={{ __html: cartContent }} />
            ) : (
            <p className="grid grid-cols-1 gap-3 py-[15px]">
              The cart is empty
            </p>
          )}
          <div className="flex items-center justify-between">
            {cartContent && (
              <div className="flex flex-col text-gray-700 font-light justify-around pr-5">
                <span className="text-gray-900 font-light text-sm mt-2">{data.productTitle}</span>
                <div className="flex items-center">      
                  <span className="text-gray-500 font-light text-sm">{data.productQuantity} x</span>
                  <span className="text-gray-500 font-light text-sm px-2">{formatPrice(data.productPrice)} €</span>
                </div>
              </div>
            )}
            <div>
              {cartContent && (
                <Image
                  src={data.productImage}
                  alt=""
                  width={70}
                  height={70}
                />
              )}
            </div>
            {cartContent && (
              <button onClick={handleClick} className="navbar-close ml-5">
                <svg onClick={() => [handleRemoveItem()]} class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            )}
          </div>
          {cartContent && (
            <div className="flex justify-between border-t-[1px] py-3 mt-6 text-lg">
              <span className="text-gray-500">
                Total
              </span>
              <span className="text-gray-500">{formatPrice(data.productPrice)} €</span>
            </div>
          )}
          {cartContent && (
            <div className="flex justify-between mt-3">
              {paymentFeature1Click === true &&
                <Link href='/products/confirmation'>
                  <button className="flex items-center justify-center text-base w-28 font-medium bg-black text-white tracking-wide text-bold py-3 px-6 rounded-full hover:bg-neutral-800">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="20px" height="20px">    
                      <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
                    </svg>
                    Pay
                  </button>
                </Link>
              }
              <Link href='/products/checkout'>
                <button className="flex items-center justify-center py-3 px-6 bg-white border-2 hover:bg-gray-50 border-gray-300 text-slate-600 text-semibold text-sm rounded-full font-medium">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                  </svg>
                  Checkout
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SlidingCart
