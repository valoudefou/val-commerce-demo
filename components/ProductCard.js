import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

function ProductCard({ product }) {
  const fs = useFlagship()
  const viewDetailsPlp = useFsFlag("viewDetailsPlp").getValue(false)
  const [isLoading, setLoading] = useState(true)

  const handleViewDetailsClick = () => {
    fs.sendHits({
      type: HitType.EVENT,
      category: "Action Tracking",
      action: "Click View Details PLP",
      label: "Engagement"
    })
  }

  return (
    <Link href={`/products/${product.id}`} className="group block w-full">
      <div className="flex flex-col rounded-2xl overflow-hidden shadow-sm transition hover:shadow-md bg-white">
        <div className="relative aspect-[1/1] bg-gray-100">
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            onLoad={() => setLoading(false)}
            className={cn(
              "object-cover transition duration-700 ease-in-out",
              isLoading
                ? "scale-105 blur-md grayscale"
                : "scale-100 blur-0 grayscale-0"
            )}
          />
          {product.tag && (
            <span className="absolute top-2 left-2 bg-white/80 text-xs text-gray-800 px-2 py-1 rounded-full">
              {product.tag}
            </span>
          )}
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-start text-sm text-gray-900">
            <h3 className="font-medium">{product.title}</h3>
            <p className="font-semibold text-slate-600">{product.price}€</p>
          </div>

          {viewDetailsPlp && (
            <button
              onClick={handleViewDetailsClick}
              className="flex items-center justify-center gap-2 w-full py-2 border border-gray-300 rounded-full text-sm text-slate-600 font-medium transition hover:bg-gray-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
              View details
            </button>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
