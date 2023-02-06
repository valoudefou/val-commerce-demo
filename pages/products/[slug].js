import Image from 'next/image'
import { useRouter } from 'next/router'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function Product() {
// useEffect(() => {
//   const script = document.createElement('script')
//   script.src = '//cdn.epoq.de/flow/quickstartdemo1.js'
//   script.async = false
//   document.body.appendChild(script)
// }, [])

const fs = useFlagship()

//get flag 
const epoqWidgetId = useFsFlag("epoqWidgetId", "homepage-alternatives")
const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
const [showMe, setShowMe] = useState(paymentFeature1Click.getValue())
// const router = useRouter()
// async function checkout(productId) {
// await swell.cart.setItems([])
// await swell.cart.addItem({
// product_id: productId,
// quantity: 1,
// })
// const cart = await swell.cart.get()
// router.push(cart.checkout_url)
// }
return (
<div className="flex h-auto flex-col justify-between">
<Navbar />
<div className="mx-auto mt-16 mb-24 max-w-1xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
<div className="mx-auto flex flex-col lg:flex-row">
{/* <Image
alt="coffee"
className="rounded-lg object-contain self-center px-8"
src={product.images[0].file.url}
width={560}
height={640}
/> */}
<div className="mt-10 flex flex-col sm:mt-0">
<h1 className="mt-1 text-2xl font-medium text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl">
{/* {product.name} */}
</h1>
<h1 className="mt-3 text-3xl font-bold text-gray-500 sm:text-3xl sm:tracking-wide lg:text-2xl">
{/* ${product.price} */}
</h1>
<button
className="flex items-center justify-center text-sm font-base mt-5 border border-transparent bg-orange-600 px-4 py-4 text-white shadow-sm hover:bg-orange-800 sm:px-8 w-full"
// onClick={() => checkout(product.id)}
>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 py-0.5">
<path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
</svg>
Checkout
</button>
<>
{paymentFeature1Click.getValue() === 'true' &&
<Link href='/products/confirmation'>
<button
className="flex items-center justify-center text-2xl font-normal mt-5 border border-transparent bg-black px-4 py-3 text-white shadow-sm hover:bg-neutral-600 sm:px-8 w-full"
> 
<svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="24px" height="24px">    
<path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
</svg>
Pay
</button>
</Link>
}
</>
<div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold text-base">
Description
</div>
<p className="max-w-xxl font-light text-sm">
{/* {product.description} */}
</p>
</div>
</div>
</div>
<div id={'epoq-widget-' + epoqWidgetId.getValue()} className="epoq-recommendations-widget"></div>
</div>
)
}

// export async function getStaticProps({ params }) {
// const swellProduct = await swell.products.get(params.slug)
// return {
// props: {
// product: swellProduct,
// },
// }
// }

// export async function getStaticPaths() {
// const swellProducts = await swell.products.list()
// let fullPaths = []
// for (let product of swellProducts.results) {
// fullPaths.push({ params: { slug: product.id } })
// }

// return {
// paths: fullPaths,
// fallback: 'blocking',
// }
// }


