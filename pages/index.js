import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useRef } from 'react'
import Link from 'next/link'
import { createClient } from 'contentful'


export default function Index( {products, articles, sheetdata} ) {
// console.log(sheetdata)
// console.log(products)


let coffeeRef = useRef()
const scrollHandler = (e) => {
e.preventDefault()
coffeeRef.scrollIntoView({
behavior: 'smooth',
block: 'start',
})
}

return (
<>
<Navbar />
<Header scrollHandler={scrollHandler} />
<div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
<div className="sm:py-15 mx-auto max-w-7xl py-16 px-4 sm:px-6 lg:px-8">
<div className="text-center">
<p
className="mt-1 text-3xl font-bold uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl"
ref={(element) => (coffeeRef = element)}
>
<Link href='/products'>
Shop our products
</Link>
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
    const client = createClient({
        space: 'mwr46hk1hvcf',
        accessToken: 'P7e2zlwtUe4ZDhEuBW9cQ8ma8ViKddL3f1oYrfCHbdk',
        })
const res = await fetch('https://dummyjson.com/products')
const data = await res.json()
const req1 = await fetch('https://nextjs-abtasty.vercel.app/api/sheet');
const res1 = await req1.json();
const art = await client.getEntries({
    content_type: 'articles'
    })
return {
props: {
products: data,
articles: art.items,
sheetdata: res1.data
},
}
}







