import ProductCard from '../../components/ProductCard'
import Navbar from '../../components/Navbar'
import { useSearchParams } from 'next/navigation'

export default function Index({ products }) {
    const search = useSearchParams()
    const searchQuery = search ? search?.get('q') : null
    const encodedSearchQuery = encodeURI(searchQuery || "")

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p className="mt-1 text-3xl leading-9 font-bold uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl">
                            Results for {encodedSearchQuery}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <>
                        {products.products.map((product) => (
                            <ProductCard product={product} key={product.id} /> 
                        ))}
                    </>
                </div>
            </div>
        </>
    )
}

export async function getStaticProps() {
    const res = await fetch(`https://dummyjson.com/products/search?q=phone`)
    // const res = await fetch(`https://dummyjson.com/products/search?q=${params.slug}`)
    const data = await res.json()

    return {
        props: {
            products: data,
        },
    }
}


// export async function getStaticPaths() {
//     return {
//         paths: [{ 
//             params: { slug: 'phone'} 
//         }],
//         fallback: true
//     }
// }