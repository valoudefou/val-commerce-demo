import ProductCard from '../../components/ProductCard'
import Navbar from '../../components/Navbar'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'

export default function Page() {
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null
    // const encodedSearchQuery = encodeURI(searchQuery || "")
    const [data, useData] = useState([])
    const getSearch = useRef(0)

    useEffect(() => {
        // getSearch.current = getSearch.current + 1

        async function getData() {

                let response
                response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
                const data = await response.text()
                useData(JSON?.parse(data))
            
        }
        getData()
    }, [])

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="mt-1 font-medium text-2xl leading-9 text-gray-900 sm:text-2xl sm:tracking-tight lg:text-2xl">
                            Search results "{searchQuery}"
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <>
                    {data.products?.map((product) => (
                        <ProductCard product={product} key={product.id} className="cursor-pointer py-3 px-5 border-b hover:bg-slate-100" />
                    ))}
                    </>
                </div>
            </div>
        </>
    )
}