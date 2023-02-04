import swell from '../../swell'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import Link from 'next/link'
import { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function Product({ product }) {
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
const router = useRouter()
  async function checkout(productId) {
    await swell.cart.setItems([])
    await swell.cart.addItem({
      product_id: productId,
      quantity: 1,
    })
    const cart = await swell.cart.get()
    router.push(cart.checkout_url)
  }
  return (
    <div className="flex h-auto flex-col justify-between">
          <Navbar />
      <div className="mx-auto mt-16 max-w-1xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="mx-auto flex flex-col lg:flex-row">
          <Image
            alt="coffee"
            className="rounded-lg object-contain self-center px-8"
            src={product.images[0].file.url}
            width={560}
            height={640}
          />
          <div className="mt-10 flex flex-col sm:mt-0">
            <h1 className="mt-1 text-2xl font-semibold text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl">
              {product.name}
            </h1>
            <h1 className="mt-3 text-3xl font-bold text-gray-500 sm:text-3xl sm:tracking-tight lg:text-2xl">
              ${product.price}
            </h1>
            <button
              className="mt-5 rounded-md border border-transparent bg-orange-600 px-4 py-3 font-medium text-white shadow-sm hover:bg-orange-400 sm:px-8"
              onClick={() => checkout(product.id)}
            >
              Checkout
            </button>
            <>
            {paymentFeature1Click.getValue() === 'true' &&
            <button
              className="mt-5 rounded-md border border-transparent bg-black px-4 py-3 font-medium text-white shadow-sm hover:bg-neutral-600 sm:px-8"
            > 
              <Link href='/products/confirmation' width="100%">
              Pay with 1-Click
              </Link>
            </button>
            }
            </>
            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold">
              Description
            </div>
            <p className="max-w-xxl font-light">{product.description}</p>
          </div>
        </div>
      </div>
      <div id={'epoq-widget-' + epoqWidgetId.getValue()} className="epoq-recommendations-widget"></div>
    </div>
  )
}

export async function getStaticProps({ params }) {
  const swellProduct = await swell.products.get(params.slug)
  return {
    props: {
      product: swellProduct,
    },
  }
}

export async function getStaticPaths() {
  const swellProducts = await swell.products.list()
  let fullPaths = []
  for (let product of swellProducts.results) {
    fullPaths.push({ params: { slug: product.id } })
  }

  return {
    paths: fullPaths,
    fallback: 'blocking',
  }
}


