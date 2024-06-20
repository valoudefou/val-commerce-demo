import Image from 'next/image'
import { useRouter } from 'next/router'
import { useFsFlag } from "@flagship.io/react-sdk"
import { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/Navbar'
import Emotion from '../../components/Emotion'

export default function Product(props) {
    const [data, setData] = useState('')
    const sendItemView = useRef(0)

    async function pushView() {
        sendItemView.current = sendItemView.current + 1
        
        if (sendItemView.current === 1) {
            window.dataLayer = window.dataLayer || []

            window.dataLayer.push({
                event: 'view_item',
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

    async function pushCart() {
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
            "date": todayDate
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
    }

    const handleClick = () => {
        const storedHtml = localStorage.getItem('currentProduct')

        if (!storedHtml) {
            alert('Please Add To Cart and then Click Pay')
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
    }, []);

    // Get flag 
    const paymentFeature1Click = useFsFlag("paymentFeature1Click", "false")
    const router = useRouter()

    if (router.isFallback) {
        return <div className='flex justify-center h-screen items-center text-4xl font-thin invisible'>Loading...</div>
    }

    return (
        <div onLoad={() => [pushView()]} className="flex h-auto flex-col justify-between">
            <Navbar />
            <div className="mx-auto mb-24 max-w-1xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="mx-auto items-center flex flex-col lg:flex-row p-10">
                    <Image
                        alt="coffee"
                        className="rounded-lg object-contain self-center px-8"
                        src={props.product.images[0]}
                        width={560}
                        height={640}
                    />
                    <div className="mt-10 flex flex-col lg:pl-20 md:pl-0">
                        <h1 className="mt-1 text-2xl font-medium text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl">
                            {props.product.title}
                        </h1>
                        <h1 className="mt-3 text-2xl font-bold text-gray-500 sm:text-3xl sm:tracking-wide lg:text-2xl">
                            {props.product.price}€
                        </h1>
                        <button onClick={() => [pushCart()]} className="flex items-center justify-center text-sm font-base mt-5 border border-black bg-white px-4 py-4 text-black sm:px-8 w-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 py-0.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                            <Emotion />
                        </button>
                        {paymentFeature1Click.getValue() === 'true' &&
                            <button onClick={handleClick}
                                className="flex items-center justify-center text-2xl font-medium mt-5 border border-transparent bg-black px-4 py-3 text-white shadow-sm hover:bg-neutral-600 sm:px-8 w-full"> 
                                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="24px" height="24px">    
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