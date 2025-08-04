import Link from "next/link"
import { useFsFlag } from "@flagship.io/react-sdk"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../pages/_app"
import Image from "next/image"
import { pushToDataLayer } from '../utils/analytics'

export default function MiniCart() {
  const [isShown, setIsShown] = useContext(AppContext)
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY > 50)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  async function handleRemoveItem() {
    setIsShown(false)
    const itemName = 'currentProduct'
    localStorage.removeItem(itemName)

    if (data && data.productPrice) {
      pushToDataLayer({
        event: 'remove_from_cart',
        ecommerce: {
          currency: 'EUR',
          value: data.productPrice,
          items: [{
            item_id: data.productId,
            item_name: data.productTitle,
            item_category: data.productCategory,
            price: data.productPrice,
            quantity: data.productQuantity
          }]
        }
      })
    }
  }

  const [cartContent, setHtmlContent] = useState('')
  const [data, setData] = useState(null)

  const handleClick = () => setHtmlContent(false)

  useEffect(() => {
    const storedHtml = localStorage.getItem('currentProduct')
    const cartContent = '<p>1 item in your basket</p>'

    if (storedHtml) {
      setHtmlContent(cartContent)
      try {
        const value = window.localStorage.getItem('currentProduct')
        setData(JSON.parse(value))
      } catch (error) {
        console.error('Error parsing stored product data:', error)
      }
    }
  }, [])

  const paymentFeature1ClickVal = useFsFlag("paymentFeature1Click")
  const paymentFeature1Click = paymentFeature1ClickVal.getValue(false)

  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(price);
  }

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setIsShown(false)}
        className={`fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity ${
          isShown ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Cart panel */}
      <aside
        className={`fixed top-5 right-5 z-50 w-80 max-w-full bg-white rounded-xl shadow-xl transition-transform transform ${
          isShown ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-6">
          <header className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-900">Cart</h2>
   
          </header>

          {cartContent && data ? (
            <>
              <div className="flex items-center space-x-4">
                <Image
                  src={data.productImage}
                  alt={data.productTitle || 'Product image'}
                  width={70}
                  height={70}
                  className="rounded-md object-cover"
                />
                <div className="flex flex-col flex-1">
                  <span className="text-gray-900 font-medium">{data.productTitle}</span>
                  <div className="flex space-x-2 text-gray-500 text-sm">
                    <span>{data.productQuantity} ×</span>
                    <span>{formatPrice(data.productPrice)}</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    handleRemoveItem()
                    handleClick()
                  }}
                  aria-label="Remove item"
                  className="text-gray-400 hover:text-gray-600 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="h-5 w-5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-between border-t border-gray-200 pt-4">
                <span className="text-gray-500 font-semibold">Total</span>
                <span className="text-gray-900 font-semibold">{formatPrice(data.productPrice)}</span>
              </div>

  {/* ... inside your JSX ... */}
<div className="flex space-x-4 mt-4">
  {paymentFeature1Click && (
    <Link
      href="/products/confirmation"
      className="flex items-center justify-center flex-1 bg-black text-white font-semibold rounded-full py-3 hover:bg-neutral-800 transition"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="white"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        className="mr-2"
      >
        <path d="M16.125 1c-1.153.067-2.477.709-3.264 1.527-.711.744-1.272 1.849-1.043 2.918 1.253.033 2.511-.626 3.264-1.459.703-.779 1.236-1.866 1.043-2.957zm.068 4.443c-1.809 0-2.565 1.111-3.818 1.111-1.289 0-2.467-1.04-4.027-1.04-2.122 0-5.347 1.965-5.347 6.596 0 4.213 3.818 9.889 5.973 9.889 1.309.013 1.627-0.823 3.403-0.832 1.778-.013 2.161.843 3.472.832 1.476-.011 2.628-1.633 3.47-2.918.604-0.92.852-1.39 1.32-2.43-3.473-.88-4.164-6.481-0.0-7.639-.786-1.34-3.08-2.57-4.445-2.57z" />
      </svg>
      Pay
    </Link>
  )}
  <Link
    href="/products/checkout"
    className="flex items-center justify-center flex-1 py-3 px-6 border-2 border-gray-300 rounded-full font-semibold text-gray-700 hover:bg-gray-50 transition"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6 mr-2"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
    </svg>
    Checkout
  </Link>
</div>
            </>
          ) : (
            <p className="text-gray-500 text-center py-12 font-light">Your cart is empty</p>
          )}
        </div>
      </aside>
    </>
  )
}
