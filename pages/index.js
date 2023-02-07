import ProductCard from '../components/ProductCard'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import { useRef } from 'react'
import { createClient } from 'contentful'

export async function getStaticProps() {
    const client = createClient({
        space: 'mwr46hk1hvcf',
        accessToken: 'P7e2zlwtUe4ZDhEuBW9cQ8ma8ViKddL3f1oYrfCHbdk'
    })
    const res = await client.getEntries({
        content_type: 'product'
    })
    console.log('exec')
    return {
        props: {
            products: res.items
        }
    }
}

export default function Gallery({ data }) {
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
Shop our products
</p>
</div>
</div>
<div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">

<ProductCard product='/pretty-woman-ring-mini' key="" />

</div>
</div>
</>
)
}

// export async function getStaticProps() {
// const swellProducts = await swell.products.list()

// return {
// props: {
// data: swellProducts,
// },
// }
// }
