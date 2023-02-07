import Image from 'next/image'
import Link from 'next/link'

export default function ProductCard() {
return (
<Link href="/products/pretty-woman-ring-mini-model" className="group">
<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
<Image
alt=""
src="/product.png"
fill
/>
</div>
<div className="mt-4 flex items-center justify-between text-base font-normal text-gray-900">
<h3>Pretty Woman ring Mini model 18k white gold and diamonds</h3>
<p className='font-base font-bold'>1,650.00€</p>
</div>
</Link>
)
}
