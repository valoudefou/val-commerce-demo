import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { useFsFlag } from "@flagship.io/react-sdk"

function ProductCard( {product} ) {

const add_to_cart_plp = useFsFlag("add_to_cart_plp", false)
        const [isLoading, setLoading] = useState(true)
        function cn(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
    <Link href={`/products/${product.id}`} className="group">
            
        <div>
            <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
            <Image
            alt=""
            src={product.images[0]}
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
            <h3>{product.title}</h3>
            <p className='font-base font-bold'>{product.price}€</p>
        </div>

        {add_to_cart_plp.getValue() === true &&
            <button onClick={() => [pushCart(), setIsShown(!isShown)]} className="flex items-center justify-center text-sm font-base mt-5 border border-black bg-white px-4 py-4 text-black sm:px-8 w-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 py-0.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                Add To Cart
            </button>
        }
        </div>
    </Link>
    )
}

export default ProductCard
