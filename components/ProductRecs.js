import Image from 'next/image'

import { useState, useEffect, useRef } from 'react'

import Link from 'next/link'

export default function Product(props) {

    const [rec, setRec] = useState('')
    const ref = useRef(null)


    useEffect(() => {
        async function getRecs() {
            const res = await fetch("https://client.experiences.get-potions.com/v1/715/experience/22316fa2-b18c-43b0-a77f-a4bc8c1af5c1")
            const data = await res.json()
            setRec(data)
        }
        getRecs()
    }, [])


    return (
       
            <div className='flex-col m-10'>
                <h2 className='mt-1 text-3xl font-bold uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl flex justify-center'>{rec.name}</h2>
                <ul id='abtasty-recs' className='scroll-smooth overflow-hidden flex justify-center' ref={ref}>
                    {rec.products?.map((item) => (
                        <li key={item.id} className="justify-between flex px-8 py-5 m-2 mb-6 mt-10 border shadow-lg flex-col">
                            <Link href={item.link}>
                                <div className='w-56 text-xl flex-col flex font-medium text-gray-900 sm:tracking-tight'>
                                    <Image
                                        alt="product picture"
                                        src={item.img_link}
                                        width={400}
                                        height={400}
                                    />
                                    {item.title}
                                <span className='text-lg font-semibold text-slate-500'>{item.price} €</span>
                                </div>
                            </Link>
                            <Link href={item.link}>
                                <button href='/' className="my-4 w-full flex items-center justify-center py-4 px-8 bg-slate-950 border border-slate-600 text-white text-bold text-sm rounded-full font-medium">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"/>
                                    </svg>
                                    Discover
                                </button>
                            </Link>
                        </li>
                    ))}
                </ul>
       
    
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