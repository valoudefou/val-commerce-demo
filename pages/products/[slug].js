import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFsFlag, useFlagship } from "@flagship.io/react-sdk"
import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Emotion from '../../components/Emotion'
import ProductRecs from '../../components/ProductRecs'
import { useAtom } from 'jotai'
import { pagePath } from "/pages/_app"

export default function Product(props) {
    const [data, setData] = useState('')
    const sendData = useRef(0) // Prevent pushView() from being called multiple times
    const { updateContext } = useFlagship()
    const [path, setPath] = useAtom(pagePath)

    const possibleLabel = [
        "4 in stock", 
        "3 in stock", 
        "5 in stock", 
        "Popular",
        "2 in stock"
    ]

    useEffect(() => {
        updateContext({['route']: path})
    }, [path])

    async function pushView() {
        sendData.current = sendData.current + 1

        if (sendData.current === 1) {
            window.dataLayer = window.dataLayer || []

            if (window.ABTasty !== undefined) {
                window?.ABTastyReload()
            }

            window.dataLayer.push({
                event: 'view_item',
                info: possibleLabel[(Math.floor(Math.random() * possibleLabel.length))],
                ecommerce: {
                    'currency': 'EUR',
                    'value': props.product.price,
                    items: [{
                        'item_id': props.product.id,
                        'item_name': props.product.title,
                        'price': props.product.price,
                        'item_category': props.product.category,
                        'quantity': 1
                    }]
                }
            })
        }
    }

    function pushCart() {
        const transactionId = '#' + Math.floor(Math.random() * 100000)
        const today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        const todayDate = mm + '/' + dd + '/' + yyyy
        const product = {
            "productId": props.product.id,
            "productCategory": props.product.category,
            "productTitle": props.product.title, 
            "productPrice": props.product.price,
            "productImage": props.product.images[0],
            "productQuantity": 1,
            "transactionId": transactionId,
            "date": todayDate,
            "info": "Popular"
        }

        localStorage.setItem('currentProduct', JSON.stringify(product))
        window.dataLayer = window.dataLayer || []

        window.dataLayer.push({
            event: 'add_to_cart',
            ecommerce: {
                'currency': 'EUR',
                'value': data.productPrice,
                items: [{
                    'item_id': data.productId,
                    'item_name': data.productTitle,
                    'item_category': data.productCategory,
                    'price': data.productPrice,
                    'quantity': data.productQuantity
                }]
            }
        })
        
        const x = window.scrollX
        const y = window.scrollY
        window.scroll(x, y - 1)
    }

    const handleClick = () => {
        const storedHtml = localStorage.getItem('currentProduct')

        if (!storedHtml) {
            alert('Please Add To Cart')
        } 
        else {
            window.location.href = "/products/confirmation"
        }
    }

    useEffect(() => {
        const storedHtml = localStorage.getItem('currentProduct')

        if (storedHtml) {
            const value = window.localStorage.getItem('currentProduct')
            setData(JSON.parse(value))
        }
    }, [])

    // Get flag 
    const paymentFeature1ClickVal = useFsFlag("paymentFeature1Click")
    const paymentFeature1Click = paymentFeature1ClickVal.getValue(false)
    const router = useRouter()

    if (router.isFallback) {
        return <div className='flex justify-center h-screen items-center text-4xl font-thin invisible'>Loading...</div>
    }

    return (
        <div onLoad={() => [pushView()]} className="flex h-auto flex-col justify-between">
            <Navbar />
            <div className="mx-auto max-w-1xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative mx-auto items-center flex flex-col lg:flex-row">
                    <div id='ab-product' className='relative'>
                        <Image
                            alt="coffee"
                            className="rounded-lg object-contain self-center px-8"
                            src={props.product.images[0]}
                            width={560}
                            height={640}
                        />
                    </div>
                    <div className="flex flex-col lg:p-20 md:p-10">
                        <h1 className="mt-1 text-2xl font-medium text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl">
                            {props.product.title}
                        </h1>
                        <h1 className="mt-3 text-2xl font-semibold text-slate-500">
                            {props.product.price}€
                        </h1>

                        {/* Reviews Section */}
                        <div className="mt-6">
                            {props.product.reviews && props.product.reviews.length > 0 ? (
                                props.product.reviews.map((review, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex items-center">
                                            <span className="text-yellow-500">
                                                {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                            </span>
                                            <span className="ml-2 text-sm text-gray-500">{review.author}</span>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-600">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500">No reviews yet.</p>
                            )}
                        </div>

                        <button onClick={() => [pushCart()]} className="mt-5 bg-white border-2 hover:bg-gray-50 border-gray-300 text-slate-600 text-semibold text-sm rounded-full font-medium w-full">
                            <Emotion />
                        </button>
                        {paymentFeature1Click === true &&
                            <button onClick={handleClick} className="justify-center mt-4 items-center w-full flex text-xl tracking-tight font-medium bg-black text-white text-extrabold py-4 px-14 rounded-full hover:bg-neutral-800"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="20px" height="20px">    
                                    <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z"/>
                                </svg>
                                Pay
                            </button>
                        }
                        <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold text-base">
                            Description
                        </div>
                        <p className="max-w-xxl font-light text-base tracking-normal">
                            {props.product.description}
                        </p>
                    </div>
                </div>
            </div>
            <ProductRecs />
        </div>
    )
}

export async function getStaticProps(context) {
    const { params } = context
    const res = await fetch(`https://dummyjson.com/products/${params.slug}`)
    const data = await res.json()

    return {
        props: {
            product: data,
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: [{ 
            params: { slug: '1'} 
        }],
        fallback: true
    }
}