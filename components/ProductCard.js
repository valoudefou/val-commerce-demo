import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

function ProductCard( {product} ) {
    const viewDetailsPlp = useFsFlag("viewDetailsPlp", false)
    const [isLoading, setLoading] = useState(true)
    const { hit: fsHit } = useFlagship()

    function cn(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    return (
        <Link href={`/products/${product.id}`} className="group">
            <div className='cursor-pointer flex flex-col'>
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

                <div className="mt-4 flex items-center justify-between text-base font-normal text-gray-900">
                    <h3>{product.title}</h3>
                    <p className='font-base font-bold'>{product.price}€</p>
                </div>

                {viewDetailsPlp.getValue() === true &&
                    <button onClick={()=>{

                        fsHit.send({
                            type: HitType.EVENT,
                            category: "Action Tracking",
                            action: "Click View Details PLP",
                            label: "Engagement"
                        })

                    }} className="mt-5 py-3 bg-white border hover:bg-gray-50 border-slate-600 text-slate-600 text-semibold text-sm rounded-full font-medium w-full">
                    View details
                    </button>
                }
            </div>
        </Link>
    )
}

export default ProductCard