import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

function ProductCard( {product} ) {
    const fs = useFlagship()
    const viewDetailsPlp = useFsFlag("viewDetailsPlp", false)
    const [isLoading, setLoading] = useState(true)
    const { hit: fsHit } = useFlagship()
    
    function cn(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className='cursor-pointer flex flex-col'>
                <div className='py-6 px-6 rounded-lg border border-gray-200'>
                    <div className="rounded flex-1 aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
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
                </div>
                <div className="mt-4 flex items-start justify-between text-base font-normal text-gray-900">
                    <h3>{product.title}</h3>
                    <p className='font-base font-bold text-slate-600 tracking-wide'>{product.price}€</p>
                </div>
                {viewDetailsPlp.getValue() === true &&
                    <button onClick={()=>{
                        fsHit.send({
                            type: HitType.EVENT,
                            category: "Action Tracking",
                            action: "Click View Details PLP",
                            label: "Engagement"
                        })
                    }} className="flex items-center justify-center mt-5 py-4 bg-white border hover:bg-gray-50 border-gray-300 text-slate-600 text-semibold text-sm rounded-full font-medium w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                    </svg>
                    View details
                    </button>
                }
            </div>
        </Link>
    )
}

export default ProductCard