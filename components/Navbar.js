import { useState, useEffect, useContext } from "react"
import { AppContext } from "../pages/_app"
import { useFsFlag } from "@flagship.io/react-sdk"
import SlidingCart from "./SlidingCart"
import MiniCart from "./MiniCart"
import Link from 'next/link'

export default function Navbar() {
    const [isShown, setIsShown] = useContext(AppContext)
    const [cartContent, setHtmlContent] = useState(true)
    const [burgerOn, setBurgerOn] = useState(false)

    useEffect(() => {
        const storedHtml = localStorage.getItem('currentProduct')
        if (storedHtml) {
            setHtmlContent(true)
        } 
        else  if (!storedHtml) {
            setHtmlContent(false)
  
        }
    }, [isShown])

    // Get flag 
    const flagIndustry = useFsFlag("flagIndustry", "Product")
    const flagCartFeature = useFsFlag("flagCartFeature", "MiniCart")
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")

    return (
        <>
            <nav className="relative z-40 flex flex-wrap items-center lg:justify-between px-2 py-2 bg-white border-b-[1px] border-gray-200">
                <div className="flex flex-auto items-center justify-between">
                    <nav class="sm:px-0 lg:hidden relative flex lg:justify-between items-center bg-white">
                        <div class="lg:hidden">
                            <button onClick={() => setBurgerOn(!burgerOn)} class="navbar-burger flex items-center text-black p-3">
                                <svg class="block h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </nav>
                    {burgerOn && (  
                        <div class="navbar-menu relative z-50">
                
                        <div onClick={() => setBurgerOn(!burgerOn)} class="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>  
                        <nav class="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                            <div class="flex justify-between items-center mb-8">
                                <a className="text-2xl px-4 font-bold leading-relaxed inline-block py-3 whitespace-nowrap uppercase text-gray-900" href="/">
                                    {flagIndustry.getValue()}
                                    <span className="text-sm font-thin py-1 absolute">®</span>
                                </a>
                                <button onClick={() => setBurgerOn(!burgerOn)} class="navbar-close">
                                    <svg class="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                            <div>
                                <ul>
                                    <li class="mb-1">
                                        <a class="block p-4 text-sm font-normal text-gray-900 rounded" href="#">Documentation</a>
                                    </li>
                                    <li class="mb-1">
                                        <a class="block p-4 text-sm font-normal text-gray-900 rounded" href="#">Contact</a>
                                    </li>
                                    <li class="mb-1">
                                        <a class="block p-4 text-sm font-normal text-gray-900 rounded" href="#">About</a>
                                    </li>
                                </ul>
                            </div>
                        </nav>   
                    </div>
                    )}
                    <div className="relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
                        <a className="text-2xl px-7 font-bold leading-relaxed inline-block py-3 whitespace-nowrap uppercase text-gray-900" href="/">
                            {flagIndustry.getValue()}
                            <span className="text-sm font-thin py-1 absolute">®</span>
                        </a>
                    </div>
                    <div className="items-center px-4 justify-center sm:flex">
                        <div className="hidden sm:flex relative">
                            <div className="absolute top-3 left-3 items-center">
                                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
                            </div>
                            <input type="text" className="epoq_search_box w-96 ui-autocomplete-input block p-2 font-light pl-10 text-gray-900 bg-gray-50 rounded border border-gray-200 focus:pl-10" placeholder={'Search ' + flagIndustry.getValue() + ' ...'} />
                        </div>
                    </div>
                    <div className="md:px-5 md:py-0 xl:py-0 px-3 lg:py-0 py-3 lg:flex items-center">
                        <ul className="hidden flex-col lg:flex lg:flex-row list-none">
                            <li className="nav-item">
                                <a className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0" href="/">
                                    <Link href='/blog/content-1'><span className="ml-2">Documentation</span></Link>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0" href="/">
                                    <span className="ml-2">Contact</span>
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0" href="/">
                                    <span className="ml-2">About</span>
                                </a>
                            </li>
                        </ul>
                        <div onClick={() => setIsShown(!isShown)} className="pl-3 pr-0 flex justify-center lg:pl-5 sm:px-0 cursor-pointer lg:py-3 md:block">
                            <a className="relative text-gray-900 hover:text-gray-700" target="_blank">
                                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                                {cartContent && (
                                <span style={{ backgroundColor: flagBackgroundColor.getValue() }} className="absolute top-0 left-0 rounded-full bg-indigo-100 text-gray-900 p-1 text-sm"></span>
                                )}
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            {isShown && flagCartFeature.getValue() === 'MiniCart' && (    
                <MiniCart />
            )}
            {isShown && flagCartFeature.getValue() === 'SlidingCart' && (    
                <SlidingCart />
            )}
        </>
    )
}