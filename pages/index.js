import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { useRef } from 'react'
import Link from 'next/link'
import { createClient } from 'contentful'
import { useFsFlag } from "@flagship.io/react-sdk";

export default function Index({ products }) {
  let coffeeRef = useRef()

  const scrollHandler = (e) => {
    e.preventDefault()
    coffeeRef.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  // Get flag 
  const flagRedirectNextLinkVal = useFsFlag("flagRedirectNextLink")
  const flagRedirectNextLink = flagRedirectNextLinkVal.getValue("/categories/beauty")

  return (
    <>
      <Header scrollHandler={scrollHandler} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24 min-h-screen">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p
              className="mt-1 text-3xl font-medium uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl"
              ref={(element) => (coffeeRef = element)}
            >
              <Link href={flagRedirectNextLink}>
                Shop our products
              </Link>
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  )
}

export async function getServerSideProps(context) {
  // Initialize Contentful client
  const client = createClient({
    space: process.env.NEXT_PUBLIC_SPACE,
    accessToken: process.env.NEXT_PUBLIC_TOKEN,
  })

  // Fetch products from your API (assuming this is your own product endpoint)
  const res = await fetch('https://live-server1.vercel.app/products/?limit=12')
  const data = await res.json()

  // Fetch articles if needed (optional, based on your original code)
  const art = await client.getEntries({
    content_type: 'articles',
  })

  return {
    props: {
      products: data,
      articles: art.items, // Note: If you don’t use articles on this page, consider removing
    },
  }
}