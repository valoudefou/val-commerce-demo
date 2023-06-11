import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function ProductCard( {product } ) {
const [isLoading, setLoading] = useState(true)
function cn(...classes) {
return classes.filter(Boolean).join(' ')
}
return (
<Link href={`/products/${product.productId}`} className="group">
<div>
<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
<Image
alt=""
src={product.smallImage}
layout='fill'
objectFit="cover"
className={cn(
'duration-700 ease-in-out group-hover:opacity-75',
isLoading
? 'scale-110 blur-2xl grayscale'
: 'scale-100 blur-0 grayscale-0'
)}
onLoadingComplete={() => setLoading(false)}
/>
</div>
<div className="mt-4 flex items-center justify-between text-base font-normal text-gray-900">
<h3>{product.name}</h3>
<p className='font-base font-bold'>{product.price}</p>
</div>
</div>
</Link>
)
}

export default ProductCard