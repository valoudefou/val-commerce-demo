import Navbar from '/components/Navbar'
import { useState, useEffect, useRef } from "react"
import ProductCard from '/components/ProductCard'
import { useSearchParams } from 'next/navigation'
import { themeAtom } from "../pages/_app"
import { useAtom } from "jotai"
import Footer from './Footer'

export default function SearchResults() {
    const [searchResults, setSearchResults] = useState([])
    const totalCount = useRef(0)
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null
    const [newSearch, setSearch] = useAtom(themeAtom)
    const [message, setMessage] = useState('Search results')

    useEffect(() => {
        const getData = async () => {
            const response = await fetch(`https://live-server1.vercel.app/products/search?q=${searchQuery}`)
            const data = await response.json()
            totalCount.current = data.total
            setSearchResults(data)
            setSearch(true)
        }
        getData()
    }, [newSearch])

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 mb-24 lg:max-w-7xl lg:px-8 min-h-screen">
                <div className="sm:py-12 mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="flex justify-center font-medium text-2xl leading-9 text-gray-900 sm:text-2xl sm:tracking-tight lg:text-2xl">
                            <span>{totalCount.current > 0 ? '' : message}</span>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {searchResults.products?.map((product) => (
                        <ProductCard product={product} key={product.id} className="cursor-pointer py-3 px-5 border-b hover:bg-slate-100" />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    )
}