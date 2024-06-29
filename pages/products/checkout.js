import { useEffect, useState, useRef } from "react"
import { useFsFlag } from "@flagship.io/react-sdk"
import Link from "next/link"

export default function Checkout() {
const [data, setData] = useState('')
const [addressOn, setAddressOn] = useState(false)
const sendBeginCheckout = useRef(0) // Prevent beginCheckout() from being called multiple times
// Get flag 
const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
const flagIndustry = useFsFlag("flagIndustry", "Product")
const flagColorLine = useFsFlag("flagColorLine", "after:border-gray-600")
const [searchAddress, setSearchAddress] = useState("")
const API_KEY = process.env.NEXT_PUBLIC_GETADDRESS_KEY
console.log(API_KEY)

useEffect(() => {
  fetch(`https://api.getaddress.io/autocomplete/${searchAddress}?api-key=${API_KEY}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data)
  })
}, [searchAddress])

const handleOnChange = (e) => {
  e.preventDefault()
  setSearchAddress(e.target.value)
}

async function beginCheckout () {
  sendBeginCheckout.current = sendBeginCheckout.current + 1

    if (sendBeginCheckout.current === 1) {
    window.dataLayer = window.dataLayer || []

    window.dataLayer.push({
      event: 'begin_checkout',
      ecommerce: {
        'currency': 'EUR',
        'value': data.productPrice,
        item: [{
          'item_id': data.productId,
          'item_name': data.productTitle,
          'item_category': data.productCategory,
          'price': data.productPrice,
          'quantity': data.productQuantity
        }]
      }
    })
  }
}

useEffect(() => {
  let timerId

  if (data) {
    timerId = setTimeout(() => {
      beginCheckout()
    }, 1500)
  }
  return () => clearTimeout(timerId);
}, [data])

useEffect(() => {
  const storedHtml = localStorage.getItem('currentProduct')
  if (storedHtml) {
    const value = window.localStorage.getItem('currentProduct')
    setData(JSON.parse(value))
  }
}, [])

return (
  <>
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-10 mt-10">
      <div className="flex justify-between">
        <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <a className="text-2xl px-2 font-bold leading-relaxed inline-block py-3 whitespace-nowrap uppercase text-gray-900" href="/">
            {flagIndustry.getValue()}
            <span className="text-sm font-thin py-1 absolute">®</span>
          </a>
        </div> 
        <div className="flex justify-between items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="mx-2" width="24" height="24" viewBox="0 0 24 24" fill="#1a1a1a">
            <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"></path>
          </svg>
          <span className="text-sm pr-2 py-3">
            Secure checkout
          </span>
        </div>
      </div>
      <div className="mt-8 px-3">
        <ol className="flex items-center w-full">
          <li className={"flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b " + flagColorLine.getValue() + " after:border-4 after:inline-block dark:after:border-blue-800"}>
            <span style={{backgroundColor: flagBackgroundColor.getValue()}} className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
              </svg>
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span style={{backgroundColor: flagBackgroundColor.getValue()}} className="text-white text-sm font-semibold flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
              2
            </span>
          </li>
          <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
            <span className="text-gray-400 text-sm font-semibold flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              3
            </span>
          </li>
          <li className="flex items-center w-full">
            <span className="text-gray-400 text-sm font-semibold flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
              4
            </span>
          </li>
        </ol>
      </div>
      <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="border rounded-2xl px-5 py-7 w-full">
            <div className="flex flex-col justify-start items-start w-full">
              <div className="w-full">
                <div className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                  Email
                </div>
                <div className="mt-6 w-full">
                  <div className="mb-4">
                    <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="email">
                      Email Address
                    </label>
                    <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="email" type="email" placeholder="Email address"/>
                    <div className="flex items-center mt-5 text-sm leading-5 align-start">
                      <input id="checked-checkbox" type="checkbox" value="" className="mr-2 w-5 h-5 border-gray-300 rounded"/>
                      <label>
                        Keep me up to date with the latest news, special offers and receive a welcome gift of 10% off your next order
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {!addressOn && (  
              <div className="flex flex-col justify-start items-start w-full mt-8">
                <div className="w-full">
                  <div className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Delivery address
                  </div>
                  <div className="mt-6 w-full">
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="first_name">
                          First Name
                        </label>
                        <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="first_name" type="text" placeholder="First name"/>
                      </div>
                      <div className="w-1/2 ml-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="last_name">
                          Last Name
                        </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="last_name" type="text" placeholder="Last name"/>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="phone">
                        Phone (optional)
                      </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="phone" type="phone" placeholder="Phone"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="address">
                        Address
                      </label>
                      <input onChange={(e) => handleOnChange(e)} className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="address" type="address" placeholder="Start typing your address"/>
                    </div>
                    <div className="flex">
                      <button onClick={() => setAddressOn(!addressOn)} className="underline mt-2 font-base">
                        Enter address manually
                      </button>
                    </div>
                    <div className="flex sm:flex-row flex-col sm:space-x-3 mt-8">
                      {paymentFeature1Click.getValue() === 'true' &&
                      <Link href='/products/confirmation'>
                        <button className="justify-center items-center w-full flex text-xl tracking-tight font-medium bg-black text-white text-extrabold py-4 px-16 rounded-full hover:bg-neutral-800">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="20px" height="20px">    
                            <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
                          </svg>
                          Pay
                        </button>
                      </Link>
                      }
                      <span className="text-md p-1 flex items-center justify-center">or</span>
                      <button onClick={() => [beginCheckout()]} className="justify-center items-center w-full flex py-4 px-7 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-semibold text-sm rounded-full font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                        </svg>
                        Continue To Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {addressOn && ( 
              <div className="flex flex-col justify-start items-start w-full mt-8">
                <div className="w-full">
                  <div className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Delivery address
                  </div>
                  <div className="mt-6 w-full">
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="first_name">
                          First Name
                        </label>
                        <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="first_name" type="text" placeholder="First name"/>
                      </div>
                      <div className="w-1/2 ml-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="last_name">
                          Last Name
                        </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="last_name" type="text" placeholder="Last name"/>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="company">
                        Company (optional)
                      </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="company" type="company" placeholder="Company"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="address line 1">
                        Address line 1
                      </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="address line 1" type="address line 1" placeholder="Address line 1"/>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="address line 2">
                        Address line 2 (optional)
                      </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="address line 2" type="address line 2" placeholder="Address line 2"/>
                    </div>
                    <div className="mb-4">
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="city" type="city" placeholder="City"/>
                    </div>
                    <div className="flex mb-4">
                      <div className="w-1/2 mr-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="country">
                          Country
                        </label>
                        <select className="border rounded-2xl w-full py-4 px-4 text-grey-darker border-r-8 border-transparent outline outline-neutral-200">
                          <option>United Kingdom</option>
                          <option>Isle of Man</option>
                        </select>
                      </div>
                      <div className="w-1/2 ml-1">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="postcode">
                          Postcode
                        </label>
                        <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="postcode" type="text" placeholder="Postcode"/>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="phone">
                        Phone (optional)
                      </label>
                      <input className="border rounded-2xl w-full py-4 px-4 text-grey-darker" id="phone" type="phone" placeholder="Phone"/>
                    </div>
                    <div className="flex">
                      <button onClick={() => setAddressOn(!addressOn)} className="underline mt-2 font-base">
                        Search again
                      </button>
                    </div>
                    <div className="flex sm:flex-row flex-col sm:space-x-3 mt-8">
                      {paymentFeature1Click.getValue() === 'true' &&
                      <Link href='/products/confirmation'>
                        <button className="justify-center items-center w-full flex text-xl tracking-tight font-medium bg-black text-white text-extrabold py-4 px-16 rounded-full hover:bg-neutral-800">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="20px" height="20px">    
                            <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
                          </svg>
                          Pay
                        </button>
                      </Link>
                      }
                      <span className="text-md p-1 flex items-center justify-center">or</span>
                      <button onClick={() => [beginCheckout()]} className="justify-center items-center w-full flex py-4 px-7 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-semibold text-sm rounded-full font-medium">
                        Continue To Delivery
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
          <div className="border rounded-2xl flex flex-col justify-start items-start px-5 py-7 w-full">
            <p className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
              Order details
            </p>
            <div className="mt-6 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
              <div className="w-full md:w-40">
                <img className="w-full hidden md:block" src={data.productImage} alt="dress"/>
                <img className="w-full md:hidden" src={data.productImage} alt="dress"/>
              </div>
              <div className="md:flex-row flex-col flex justify-between items-start w-full space-y-4 md:space-y-0">
                <div className="w-full flex flex-col justify-start items-start space-y-8">
                  <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{data.productTitle}</h3>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex flex-col flex-end">
                      <p className="text-sm dark:text-white leading-6 text-gray-700">
                        <span className="dark:text-gray-400 text-gray-400">
                          Order: 
                        </span> {data.transactionId}
                      </p>
                      <p className="text-sm dark:text-white leading-6 text-gray-700">
                        <span className="dark:text-gray-400 text-gray-400">
                          Category: 
                        </span> {data.productCategory}
                      </p>
                      <p className="text-sm dark:text-white leading-6 text-gray-700">
                        <span className="dark:text-gray-400 text-gray-400">
                          Quantity: 
                        </span> {data.productQuantity}
                      </p>
                    </div>
                    <p className="text-base leading-6 dark:text-white text-gray-800">{data.productPrice} €</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border rounded-2xl px-5 py-7 flex flex-col-reverse md:flex-row xl:flex-col-reverse xl:justify-end justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            <div className="flex flex-col w-full space-y-6 mt-6 md:mt-0 lg:mt-0 xl:mt-6 sm:mt-6">
              <div className="flex border-gray-200">
                <input className="border rounded-l-2xl w-full py-4 px-4 text-grey-darker" id="coupon" type="coupon" placeholder="Discount code"/>
                <button className="bg-black hover:bg-blue-dark text-white rounded-r-2xl text-sm font-medium px-7" type="submit">
                  Apply
                </button>
              </div>
              <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">
                Summary
              </h3>
              <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-7">
                <div className="flex justify-between w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Subtotal</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data.productPrice} €</p>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base dark:text-white leading-4 text-gray-800">
                    Shipping</p>
                  <p className="text-base dark:text-gray-300 leading-4 text-gray-600">
                    8.01 €</p>
                </div>
              </div>
              <div className="flex justify-between items-center w-full">
                  <p className="text-lg dark:text-white font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                <p className="text-lg dark:text-gray-300 font-semibold leading-4 text-gray-800">{Math.round(data.productPrice + 8)} €</p>
              </div>
            </div>
            <div className="flex xl:pb-0 lg:pb-6 md:pb-6 justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col w-full space-y-6">
                <h3 className="text-xl dark:text-white font-semibold leading-4 text-gray-800">
                  Shipping</h3>
                <div className="flex justify-between items-start w-full pb-7 border-b mb-10">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-sm leading-6 dark:text-white font-semibold text-gray-800">
                        DPD Delivery<br />
                        <span className="text-sm font-normal">
                          within 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-semibold leading-6 dark:text-white text-gray-800">
                    8.01 €
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}