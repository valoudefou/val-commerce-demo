import Navbar from '/components/Navbar'
import { useState, useEffect, useContext } from "react"
import ProductCard from '/components/ProductCard'
import { useSearchParams } from 'next/navigation'
import { AppContext } from "../pages/_app"

export default function SearchResults() {
    const [searchResults, useData] = useState([])
    const [isShown, setIsShown] = useContext(AppContext)
    const [sub, setSearch] = useContext(AppContext)
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null
    // const encodedSearchQuery = encodeURI(searchQuery || "")

    useEffect(() => {
        const getData = async () => {
            let response
            response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            const data = await response.json()
            useData(data)
        }
        getData()
    }, [sub])

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mt-1 flex justify-center font-medium text-2xl leading-9 text-gray-900 sm:text-2xl sm:tracking-tight lg:text-2xl">
                            <span>search results "{searchQuery}"</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {searchResults.products?.map((product) => (
                            <ProductCard product={product} key={product.id} className="cursor-pointer py-3 px-5 border-b hover:bg-slate-100" />
                        ))}
                </div>
            </div>
        </>
    )
}