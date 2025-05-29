import { useState, useEffect, useRef } from 'react'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Link from 'next/link'
import { useFsFlag } from "@flagship.io/react-sdk"

export default function Index({ products = [] }) {
  const [productList, setProductList] = useState(products);
  const [limit, setLimit] = useState(products.length || 12); // ✅ Dynamic initial limit
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true); // ✅ Track if more data available
  const coffeeRef = useRef()

  const scrollHandler = (e) => {
    e.preventDefault()
    coffeeRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const flagRedirectNextLinkVal = useFsFlag("flagRedirectNextLink")
  const flagRedirectNextLink = flagRedirectNextLinkVal.getValue("/categories/beauty")

  const loadMore = async () => {
    if (loadingMore || !hasMore) return; // ✅ Prevent duplicate calls
    
    const newLimit = limit + 20
    setLoadingMore(true)
    
    try {
      const res = await fetch(`https://live-server1.vercel.app/products/?limit=${newLimit}`)
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      
      const newData = await res.json()
      const newProducts = Array.isArray(newData.products) ? newData.products : [];
      
      // ✅ Check if we've reached the end
      if (newProducts.length < newLimit || newProducts.length === productList.length) {
        setHasMore(false);
      }
      
      setProductList(newProducts)
      setLimit(newLimit)
    } catch (err) {
      console.error("Error loading more products:", err)
      // ✅ Could show user-friendly error message
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <>
      <Header scrollHandler={scrollHandler} />
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24 min-h-screen">
        <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="mt-1 text-2xl font-medium uppercase text-gray-900" ref={coffeeRef}>
              <Link href={flagRedirectNextLink}>Shop our products</Link>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {productList.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>

        {hasMore && (
          <div className="mt-10 text-center">
            <button
              onClick={loadMore}
              disabled={loadingMore}
              className="inline-block rounded-full bg-slate-800 px-6 py-3 text-white font-medium hover:bg-slate-700 disabled:opacity-50"
            >
              {loadingMore ? 'Loading...' : 'Load More'}
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  )
}

export async function getStaticProps() {
  try {
    const res = await fetch('https://live-server1.vercel.app/products/?limit=12', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    const products = Array.isArray(data.products) ? data.products : [];

    return {
      props: { products },
      revalidate: 3600, // ✅ Keep ISR for reliability
    };
  } catch (error) {
    console.error('Error fetching products:', error.message);
    return {
      props: { products: [] },
      revalidate: 60, // ✅ Retry soon on error
    };
  }
}


