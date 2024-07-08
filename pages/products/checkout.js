import { useEffect, useState, useRef } from "react"
import { useFsFlag } from "@flagship.io/react-sdk"
import Link from "next/link"

export default function Checkout() {
// Get flag 
const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
const flagIndustry = useFsFlag("flagIndustry", "Product")
const flagColorLine = useFsFlag("flagColorLine", "after:border-black")
const API_KEY = process.env.NEXT_PUBLIC_GETADDRESS_KEY
// STATES
const [data, setData] = useState('') // LocalStorage product added to cart
const [fullAddressComponent, setFullAddressComponent] = useState(false) // Display full address component
const sendBeginCheckout = useRef(0) // Prevent beginCheckout() from being called multiple times
const [autoCompleteDropdown, setAutocompleteDropdown] = useState("") // Dropdown list with dropDownAddresses as the user types
const [dropDownAddresses, setDropdownAddresses] = useState([]) // Store data from autocomplete service to display in dropdown
const autoFilledData = useRef([]) // Get address details populate inputs
const addressId = useRef() // Address ID to retrieve address details in second fetching
const searchInput = useRef(null) // Start typing address input focus status
const [error, setError] = useState([])
const [paymentStep, setPaymentStep] = useState(false)
// CUSTOMER DATA
const [first_name, setFirstName] = useState("")
const [last_name, setLastName] = useState("")
const [email, setEmail] = useState("")
const [address_1, setAddress1] = useState("")
const [address_2, setAddress2] = useState("")
const [city, setCity] = useState("")
const [postcode, setPostCode] = useState("")
const [phone, setPhone] = useState("")

// const [inputs, setInputs] = useState(initialValues)
// const handleChange = useCallback(
//   ({target:{name,value}}) => setInputs(state => ({ ...state, [name]:value }), [setError('')])
// )

useEffect(() => {
  const errorList = []
console.log(email)
  if (!email) {
    errorList.push("email")
  }
  if (!first_name) {
    errorList.push("first_name")
  }
  if (!last_name) {
    errorList.push("last_name")
  }
  if (!address_1) {
    errorList.push("address_1")
  }
  if (!city) {
    errorList.push("city")
  }
  if (!postcode) {
    errorList.push("postcode")
  }
  setError(errorList)
}, [first_name, last_name, email, address_1, city, postcode])

const handleSubmit = (e) => {
  e.preventDefault()

  if (!fullAddressComponent) {
    setFullAddressComponent(!fullAddressComponent)
  }
  if (error.length === 0) {
    setPaymentStep(!paymentStep)
    setFullAddressComponent(fullAddressComponent)
  } else {
    alert('Information required')
  }
}

useEffect(() => {
  if (document.activeElement === searchInput.current) {
    async function getData() {
      let response
      response = await fetch(`https://api.getaddress.io/autocomplete/${autoCompleteDropdown}?api-key=${API_KEY}`)
      const data = await response.text()
      setDropdownAddresses(JSON.parse(data))
    }
    getData()
  }
}, [autoCompleteDropdown])

async function autoPopulateAddress() {
  let response
  response = await fetch(`https://api.getaddress.io/get/${addressId.current}?api-key=${API_KEY}`)
  const data = await response.text()
  autoFilledData.current = [JSON.parse(data).line_1, JSON.parse(data).line_2, JSON.parse(data).town_or_city, JSON.parse(data).postcode]
  setAddress1(JSON.parse(data).line_1)
  setAddress2(JSON.parse(data).line_2)
  setCity(JSON.parse(data).town_or_city)
  setPostCode(JSON.parse(data).postcode)
  // console.log(autoFilledData.current)
  setFullAddressComponent(!fullAddressComponent)
}

const handleOnChange = (e) => {
  e.preventDefault()
  setAutocompleteDropdown(e.target.value)
}

const handleClick = (e) => {
  addressId.current = e.target.attributes[0].nodeValue
  autoPopulateAddress()
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

async function searchAgain () {
  setFullAddressComponent(!fullAddressComponent)
  setAutocompleteDropdown('')
  setError('')
}

async function autoCompleteDropdownManually () {
  setFullAddressComponent(!fullAddressComponent)
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
    <form noValidate onSubmit={handleSubmit}>
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
              <span className="flex items-center justify-center w-10 h-10 bg-black rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
                <svg className="w-3.5 h-3.5 text-white lg:w-4 lg:h-4 dark:text-blue-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 12">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5.917 5.724 10.5 15 1.5"/>
                </svg>
              </span>
            </li>
            <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
              <span className="text-white text-sm font-semibold flex items-center justify-center w-10 h-10 bg-black rounded-full lg:h-12 lg:w-12 dark:bg-blue-800 shrink-0">
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
          {!paymentStep && (
            <div className="border rounded-2xl px-5 py-7 w-full">
              <div className="flex flex-col justify-start items-start w-full">
                <div className="w-full">
                  <div id="delivery-address" className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">
                    Email
                  </div>
                  <div className="mt-6 w-full">
                    <div className="mb-4">
                      <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="email">
                        Email Address
                      </label>
                      <input 
                        name="email" 
                        value={email} 
                        autocomplete="on"
                        onChange={(e) => setEmail(e.target.value)} 
                        className={error.includes("email") && fullAddressComponent ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                        id="email" type="email" 
                        placeholder="Email address"
                      />
                      <div className={error.includes("email") && fullAddressComponent ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your email</div>
                      <div className="flex items-center mt-5 text-sm leading-5 align-start">
                        <input type="checkbox" value="" className="mb-auto mr-2 w-5 h-5 border-gray-300 rounded"/>
                        <div>
                          <label>
                            Keep me up to date with the latest news, special offers and receive a welcome gift of 10% off your next order
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {!fullAddressComponent && (  
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
                          <input 
                            value={first_name} 
                            name="first_name" 
                            onChange={(e) => setFirstName(e.target.value)} 
                            className="border rounded-2xl w-full py-4 px-4 text-grey-darker"
                            id="first_name" 
                            type="text"
                            placeholder="First name"
                          />
                        </div>
                        <div className="w-1/2 ml-1">
                          <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="last_name">
                            Last Name
                          </label>
                        <input 
                          name="last_name" 
                          value={last_name} 
                          onChange={(e) => setLastName(e.target.value)} 
                          className="border rounded-2xl w-full py-4 px-4 text-grey-darker"
                          id="last_name" 
                          type="text" 
                          placeholder="Last name"
                        />
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="address">
                          Address
                        </label>
                        <input 
                          onChange={(e) => handleOnChange(e)} 
                          ref={searchInput} 
                          className="border rounded-2xl w-full py-4 px-4 text-grey-darker" 
                          id="address" 
                          type="address" 
                          placeholder="Start typing your address"
                        />
                      </div>
                      <div>
                        {autoCompleteDropdown && (
                          <ul className="border-x border-t rounded shadow-lg">
                            {dropDownAddresses.suggestions?.map((item) => (
                              <li onClick={handleClick} data={item.id} key={item.id} className="cursor-pointer py-3 px-5 border-b hover:bg-slate-100">{item.address}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="flex">
                        <button onClick={() => [autoCompleteDropdownManually()]} className="underline mt-7 font-base">
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
                        <button type="submit" onClick={() => [beginCheckout()]} className="justify-center items-center w-full flex py-4 px-7 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-semibold text-sm rounded-full font-medium">
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
              {fullAddressComponent && ( 
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
                          <input 
                            name="first_name" 
                            value={first_name} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            className={error.includes("first_name") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                            id="first_name" 
                            type="text" 
                            placeholder="First name"
                          />
                          <div className={error.includes("first_name") ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your first name</div>
                        </div>
                        <div className="w-1/2 ml-1">
                          <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="last_name">
                            Last Name
                          </label>
                          <input 
                            name="last_name" 
                            value={last_name} 
                            onChange={(e) => setLastName(e.target.value)} 
                            className={error.includes("last_name") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                            id="last_name" 
                            type="text" 
                            placeholder="Last name"
                          />
                          <div className={error.includes("last_name") ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your last name</div>
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
                        <input 
                          name="address_1" 
                          onChange={(e) => setAddress1(e.target.value)} 
                          className={error.includes("address_1") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                          value={address_1} 
                          id="address_1" 
                          type="address_1" 
                          placeholder="Address line 1"
                        />
                        <div className={error.includes("address_1") ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your address</div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="address line 2">
                          Address line 2 (optional)
                        </label>
                        <input 
                          name="address_2" 
                          onChange={(e) => setAddress2(e.target.value)} 
                          className={error.includes("address_2") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                          value={address_2} 
                          id="address_2" 
                          type="address_2" 
                          placeholder="Address line 2"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="city">
                          City
                        </label>
                        <input 
                          name="city" 
                          onChange={(e) => setCity(e.target.value)} 
                          className={error.includes("city") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                          value={city} 
                          id="city" 
                          type="city" 
                          placeholder="City"
                        />
                        <div className={error.includes("city") ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your city</div>
                      </div>
                      <div className="flex mb-4">
                        <div className="w-1/2 mr-1">
                          <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="country">
                            Country
                          </label>
                          <select className="w-full py-4 px-4 text-grey-darker border-r-8 border-transparent outline-slate-100">
                            <option value=">United Kingdom">United Kingdom</option>
                            <option value=">Isle of Man">Isle of Man</option>
                          </select>
                        </div>
                        <div className="w-1/2 ml-1">
                          <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="postcode">
                            Postcode
                          </label>
                          <input 
                            name="postcode" 
                            onChange={(e) => setPostCode(e.target.value)} 
                            className={error.includes("postcode") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                            value={postcode} 
                            id="postcode" 
                            type="text" 
                            placeholder="Postcode"
                          />
                          <div className={error.includes("postcode") ? "text-red-400 text-sm py-1 px-1 font-medium" : "hidden"}>Please enter your postcode</div>
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-grey-darker text-sm font-normal mb-2 ml-2" htmlFor="phone">
                          Phone (optional)
                        </label>
                        <input 
                          name="phone" 
                          onChange={(e) => setPhone(e.target.value)} 
                          className={error.includes("phone") ? "border-red-400 border-2 rounded-2xl w-full py-4 px-4 text-grey-darker focus:outline-none" : "border rounded-2xl w-full py-4 px-4 text-grey-darker"} 
                          value={phone} 
                          id="phone" 
                          type="phone" 
                          placeholder="Phone"
                        />
                      </div>
                      <div className="flex">
                        <button onClick={() => [searchAgain()]} className="underline mt-2 font-base">
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
                        <button type="submit" onClick={() => [beginCheckout()]} className="justify-center items-center w-full flex py-4 px-7 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-semibold text-sm rounded-full font-medium">
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
            </div>
            )}
            {paymentStep && (
              <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="border rounded-2xl px-5 py-7 w-full">
                  <div className="flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="md:flex flex-col flex justify-between items-start w-full space-y-7">
                      <div className="flex justify-between items-start w-full border-b pb-6">
                        <div className="flex flex-col flex-end">
                          <p className="text-sm dark:text-white leading-6 text-gray-700">
                            <span className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Your details</span>
                          </p>
                          <p className="text-sm dark:text-white leading-6 text-gray-700 mt-2">
                            <span className="text-base dark:text-white leading-4 text-gray-800">{email}</span>
                          </p>
                        </div>
                        <p className="text-base leading-6 dark:text-white text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="#111111"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                        </p>
                      </div>
                      <div className="flex justify-between items-start w-full mt-7">
                        <div className="flex flex-col flex-end">
                          <p className="text-sm dark:text-white leading-6 text-gray-700">
                            <span className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Deliver to</span>
                          </p>
                          <p className="text-sm dark:text-white leading-6 text-gray-700 mt-2">
                            <span className="text-base dark:text-white leading-4 text-gray-800">{first_name + ' ' + last_name + ', ' + address_1 + ', ' + city + ', ' + postcode}</span>
                          </p>
                        </div>
                        <p className="text-base leading-6 dark:text-white text-gray-800">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="24" width="24" fill="#111111"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:flex-row border rounded-2xl flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col justify-start px-5 py-7 w-full dark:bg-gray-800 space-y-6">
                    <h3 className="text-lg dark:text-white font-semibold leading-5 text-gray-800">Delivery options</h3>
                    <div className="bg-amber-50 py-8 sm:px-8 px-4 border-amber-200 border-2 rounded-2xl">
                      <div className="flex items-center">
                        <input checked type="radio" value="" name="delivery" className="sm:mr-8 mr-4 align-center w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <div className="flex justify-center items-center space-x-4">
                          <div className="w-8 h-8">
                            <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
                          </div>
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-sm leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br />
                              <span className="text-sm font-normal">within 24 Hours</span>
                            </p>
                          </div>
                        </div>
                        <div className="flex ml-auto">
                          <p className="text-base font-semibold leading-6 dark:text-white text-gray-800">8.01 €</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center md:flex-row border rounded-2xl flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                  <div className="flex flex-col justify-start px-5 py-7 w-full dark:bg-gray-800 space-y-6">
                    <h3 className="text-lg dark:text-white font-semibold leading-5 text-gray-800">Select payment method</h3>
                    <div className="bg-amber-50 p-8 sm:px-8 px-4 border-amber-200 border-2 rounded-2xl">
                      <div className="flex items-center">
                        <input checked type="radio" value="" name="payment" className="sm:mr-8 mr-4 align-center w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <div className="flex justify-center items-center space-x-4">
                          <div className="flex flex-col justify-start items-center">
                            <p className="text-sm leading-6 dark:text-white font-semibold text-gray-800">Credit or debit card<br /></p>
                          </div>
                        </div>
                        <div className="flex ml-auto">
                          <svg className="m-1" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="60" height="45">
                            <path opacity="0.07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                            <circle fill="#EB001B" cx="15" cy="12" r="7"></circle><circle fill="#F79E1B" cx="23" cy="12" r="7"></circle>
                            <path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z"></path>
                          </svg>
                          <svg className="m-1" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" width="60" height="45">
                            <path opacity="0.07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z"></path>
                            <path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32"></path>
                            <path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688"></path>
                          </svg>
                        </div>
                      </div>
                      <form class="w-full my-6">
                        <input type="text" class="border-slate-400 border rounded-2xl w-full py-4 px-4 text-grey-darker" placeholder="1111 1111 1111 1110" />
                        <div class="flex gap-x-2 my-4">
                          <div class="flex-1">
                            <input type="text" class="border-slate-400 border rounded-2xl w-full py-4 px-4 text-grey-darker" placeholder="01/26" />
                          </div>
                          <div class="flex-1">
                            <input type="text" class="border-slate-400 border rounded-2xl w-full py-4 px-4 text-grey-darker" placeholder="123" />
                          </div>
                        </div>
                        <input type="text" class="border-slate-400 border rounded-2xl w-full py-4 px-4 text-grey-darker" placeholder="MR MIKE BEE" />
                      </form>
                    </div>
                    <div className="flex flex-col items-center w-full justify-center">
                    <p className="mb-8 text-center leading-6 text-sm">
                      By submitting this order you are accepting our <br/>
                      <a className="cursor-pointer underline text-amber-500" rel="noopener noreferrer" target="_blank">
                        Terms and Conditions
                      </a>
                    </p>
                      <Link href='/products/confirmation'>
                        <button className="w-full flex font-medium bg-black text-white py-4 px-16 rounded-full hover:bg-neutral-800">
                          Pay Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
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
              <div className="flex flex-col w-full space-y-6">
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
            </div>
          </div>
        </div>
      </div>
    </form>
  </>
  )
}