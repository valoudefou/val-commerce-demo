import React, { useState } from "react"
import SearchBar from "./SearchBar"
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import SlidingCart from "./SlidingCart"
import MiniCart from "./MiniCart"

export default function Navbar() {
const [isShown, setIsShown] = useState(false)
const fs = useFlagship()

//get flag 
const flagIndustry = useFsFlag("flagIndustry", "Product")
const flagCartFeature = useFsFlag("flagCartFeature", "MiniCart")
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
const [navbarOpen, setNavbarOpen] = React.useState(false);
const my_test_flag = useFsFlag("my_test_flag", 5)
return (
<>
<nav className="relative z-40 flex flex-wrap items-center justify-between px-2 py-2 bg-white border-b-[1px] border-gray-200">
<div className="container mx-auto flex lg:flex-wrap items-center justify-between">
<div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
<a
className="text-2xl px-7 font-bold leading-relaxed inline-block mr-4 py-3 whitespace-nowrap uppercase text-gray-900"
href="/"
>
{flagIndustry.getValue()}
<span className="text-sm font-thin py-1 absolute">®</span>
{/* <span className="text-2xl font-normal py-1 absolute ml-10 bg-red-600 p-10 text-white">
{my_test_flag.getValue()}
{my_test_flag.getValue()}
{my_test_flag.getValue()}
</span> */}
</a>
<button
className="text-gray-900 cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
type="button"
onClick={() => setNavbarOpen(!navbarOpen)}
>
</button>
</div>
<SearchBar />
<div
className={
"lg:flex items-center" +
(navbarOpen ? " flex" : " hidden")
}
id="example-navbar-danger"
>
<ul className="flex flex-col lg:flex-row list-none lg:ml-auto uppercase">
<li className="nav-item">

<a
className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0"
href="/"
>
<span className="ml-2">Home</span>
</a>
</li>
<li className="nav-item">
<a
className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0"
href="/"
>
<span className="ml-2">Shop</span>
</a>
</li>
<li className="nav-item">
<a
className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0"
href="/"
>
<span className="ml-2">Contact</span>
</a>
</li>
<li className="nav-item">
<a
className="my-1 text-sm text-gray-900 hover:text-gray-700 font-light md:mx-4 md:my-0"
href="/"
>
<span className="ml-2">About</span>
</a>
</li>
</ul>
<div onClick={() => setIsShown(!isShown)}

className="flex justify-center px-7 py-3 md:block">
<a className="relative text-gray-900 hover:text-gray-700" target="_blank">
<svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
</svg>
<span style={{ backgroundColor: flagBackgroundColor.getValue() }} className="absolute top-0 left-0 rounded-full bg-indigo-100 text-gray-900 p-1 text-xs"></span>
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