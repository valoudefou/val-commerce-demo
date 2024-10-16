import ProductCard from '../../components/ProductCard'
import Navbar from '../../components/Navbar'

export default function Index({ products }) {
    return (
        <>
            <Navbar />
            <div className="py-24 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    <>
                        {/* {products.products.map((product) => (
                            <ProductCard product={product} key={product.id} /> 
                        ))} */}
                    </>
                </div>
            </div>
        </>
    )
}

// export async function getStaticProps() {
//     const res = await fetch('https://dummyjson.com/products?limit=30')
//     const data = await res.json()

//     return {
//         props: {
//             products: data,
//         },
//     }
// }
