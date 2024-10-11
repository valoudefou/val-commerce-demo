import { useContext, useState, useEffect } from "react"
import { AppContext } from "../pages/_app"
import ProductCard from '/components/ProductCard'
import { useSearchParams } from 'next/navigation'

export default function Results() {
    const [test, setTest] = useContext(AppContext)
    const [searchResults, useData] = useState([])
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null
    // const encodedSearchQuery = encodeURI(searchQuery || "")

    useEffect(() => {
        async function getData() {
            let response
            response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
            const data = await response.json()
            useData(data)
            setTest(test)
        }
        getData()
        console.log('inside' + test)
    }, [test])

    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <>
                {searchResults.products?.map((product) => (
                    <ProductCard product={product} key={product.id} className="cursor-pointer py-3 px-5 border-b hover:bg-slate-100" />
                ))}
            </>
        </div>
    )
}