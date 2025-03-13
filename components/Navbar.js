import { useState, useRef, useEffect, useContext } from "react"
import { AppContext } from "../pages/_app"
import { useRouter } from "next/navigation"
import { useFsFlag } from "@flagship.io/react-sdk"
import SlidingCart from "./SlidingCart"
import MiniCart from "./MiniCart"
import Link from 'next/link'
import { themeAtom } from "../pages/_app"
import { useAtom } from "jotai"

const Navbar = () => {
    const [isShown, setIsShown] = useContext(AppContext)
    const [cartContent, setHtmlContent] = useState(true)
    const [burgerOn, setBurgerOn] = useState(false)
    const [searchOpen, setSearchOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const router = useRouter()
    const [search, setSearch] = useAtom(themeAtom)
    const [products, setProducts] = useState([]);
    const totalCount = useRef(0);

    useEffect(() => {
        if (!searchQuery) {
            setProducts([]);
            return;
        }

        const fetchData = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
                const data = await response.json();
                totalCount.current = data.total;
                setProducts(data.products || []);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        const delayDebounce = setTimeout(() => {
            fetchData();
        }, 500); // Debounce API calls to avoid spam requests

        return () => clearTimeout(delayDebounce);
    }, [searchQuery]);

    const onSearch = (e) => {
        e.preventDefault()
        const encodedSearchQuery = encodeURI(searchQuery)
        router.push(`/search?q=${encodedSearchQuery}`)
        const newSearch = search === true ? false : true
        setSearch(newSearch)
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()
            const encodedSearchQuery = encodeURI(searchQuery)
            router.push(`/search?q=${encodedSearchQuery}`)
            const newSearch = search === true ? false : true
            setSearch(newSearch)
        }
    }

    useEffect(() => {
        const storedHtml = localStorage.getItem('currentProduct')
        if (storedHtml) {
            setHtmlContent(true)
        } 
        else if (!storedHtml) {
            setHtmlContent(false)
        }
    }, [isShown])

    // Get flag 
    const flagIndustryVal = useFsFlag("flagIndustry")
    const flagIndustry = flagIndustryVal.getValue("Product")
    const flagCartFeatureVal = useFsFlag("flagCartFeature")
    const flagCartFeature = flagCartFeatureVal.getValue("MiniCart")
    const flagBackgroundColorVal = useFsFlag("flagBackgroundColor")
    const flagBackgroundColor = flagBackgroundColorVal.getValue("black")

    return (
        <>
            {searchOpen && (
                <div onClick={() => setSearchOpen(!searchOpen)} className="h-screen w-screen top-0 z-20 bg-gray-800 fixed opacity-0"></div>
            )}
            {searchOpen && (
                <form className="sm:hidden bg-white fixed w-full px-6 py-6 z-30 border-b-[1px] border-gray-200">
                    <input 
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="search" 
                        className="w-full block p-4 font-light pl-12 text-gray-900 bg-gray-50 border rounded-2xl border-gray-200" 
                        placeholder='Search term ...' 
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <div className="absolute top-11 left-10 items-center">
                        <svg onClick={(e) => onSearch(e)} className="cursor-pointer w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    {products.length > 0 && (
                        <div className="absolute top-20 left-6 w-[90%] max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                            <div>
                                {products.map((product) => (
                                    product.id ? (
                                        <div key={product.id} className="p-2 border-b last:border-b-0">
                                            <Link href={`/products/${product.id}`} passHref>
                                                <div className="block">
                                                    <p className="text-gray-900 font-medium">{product.title}</p>
                                                    <p className="text-sm text-gray-500">{product.price} USD</p>
                                                </div>
                                            </Link>
                                        </div>
                                    ) : null
                                ))}
                            </div>
                        </div>
                    )}
                </form>
            )}
            <nav className="relative w-full z-20 flex flex-wrap items-center lg:justify-between sm:px-5 sm:py-1 px-2 py-1 bg-white border-b-[1px] border-gray-200">
                <div className="flex flex-auto items-center justify-between">
                    <nav className="sm:px-0 lg:hidden relative flex lg:justify-between items-center bg-white">
                        <div className="lg:hidden">
                            <button onClick={() => setBurgerOn(!burgerOn)} className="navbar-burger flex items-center text-black p-3">
                                <svg className="block h-5 w-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
                                </svg>
                            </button>
                        </div>
                    </nav>
                    {burgerOn && (  
                        <div className="navbar-menu relative z-40">
                            <div onClick={() => setBurgerOn(!burgerOn)} className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"></div>  
                            <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
                                <div className="flex justify-between items-center mb-6">
                                    <div className="text-2xl px-4 font-bold leading-relaxed inline-block py-3 whitespace-nowrap uppercase text-gray-900">
                                        {flagIndustry}
                                        <span className="text-sm font-thin py-1 absolute">®</span>
                                    </div>
                                    <button onClick={() => setBurgerOn(!burgerOn)} className="navbar-close pr-3">
                                        <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                                <div>
                                    <ul>
                                        <li className="mb-1">
                                            <div className="block p-3 text-sm font-mormal text-gray-900 rounded">Cosmetic</div>
                                        </li>
                                        <li className="mb-1">
                                            <div className="block p-3 text-sm font-mormal text-gray-900 rounded">Food</div>
                                        </li>
                                        <li className="mb-1">
                                            <div className="block p-3 text-sm font-mormal text-gray-900 rounded">Fashion</div>
                                        </li>
                                        <li className="mb-1">
                                            <div className="block p-3 text-sm font-mormal text-gray-900 rounded">Tech</div>
                                        </li>
                                        <li className="mb-1">
                                            <div className="block p-3 text-sm font-mormal text-gray-900 rounded">Motor</div>
                                        </li>
                                    </ul>
                                </div>
                            </nav> 
                        </div>
                    )} 
                    <div className="relative mr-auto flex justify-start lg:w-auto lg:static lg:block lg:justify-start">
                        <Link href='/'>
                            <div className="text-2xl px-5 font-bold leading-relaxed inline-block py-3 whitespace-nowrap uppercase text-gray-900">
                                {flagIndustry}
                                <span className="text-sm font-thin py-1 absolute">®</span>
                            </div>
                        </Link>
                    </div> 
                    <div className="mr-auto">
                        <form className="hidden sm:flex relative">
                            <div className="absolute top-4 left-4 items-center">
                                <svg onClick={(e) => onSearch(e)} className="cursor-pointer w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input 
                                onChange={(e) => setSearchQuery(e.target.value)}
                                type="search" 
                                className="w-[350px] block p-3 font-light pl-12 text-gray-900 bg-gray-50 rounded-lg border border-gray-200" 
                                placeholder='Search term ...'
                                onKeyDown={(e) => handleKeyDown(e)}
                            />
                        </form>
                    </div>
                        <div className="md:px-5 md:py-0 xl:py-0 px-3 lg:py-0 py-3 lg:flex items-center">
                            <ul className="hidden flex-col lg:flex lg:flex-row list-none relative">
                                <li className="nav-item group relative">
                                    <p className="my-1 text-sm text-gray-900 hover:text-gray-700 font-normal md:mx-3 md:my-0">
                                    <Link href="/blog/content-1">
                                        <span>Cosmetic</span>
                                    </Link>
                                    </p>
                                    <div className="mega-menu absolute -left-[20px] top-full hidden w-96 bg-white shadow-lg group-hover:block rounded-3xl">
                                    <ul className="p-6">
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/beauty">Beauty</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/fragrances">Fragrances</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/skin-care">Skin Care</Link></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="nav-item group relative">
                                    <p className="my-1 text-sm text-gray-900 hover:text-gray-700 font-normal md:mx-3 md:my-0">
                                    <Link href="/blog/content-1">
                                        <span>Food</span>
                                    </Link>
                                    </p>
                                    <div className="mega-menu absolute -left-[110px] top-full hidden w-96 bg-white shadow-lg group-hover:block rounded-3xl">
                                    <ul className="p-6">
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/groceries">Gorceries</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/kitchen-accessories">Kitchen</Link></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="nav-item group relative">
                                    <p className="my-1 text-sm text-gray-900 hover:text-gray-700 font-normal md:mx-3 md:my-0">
                                    <Link href="/blog/content-1">
                                        <span>Fashion</span>
                                    </Link>
                                    </p>
                                    <div className="mega-menu absolute -left-[170px] top-full hidden w-96 bg-white shadow-lg group-hover:block rounded-3xl">
                                    <ul className="p-6">
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/home-decoration">Home</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/mens-shirts">Men Shirts</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/mens-shoes">Men Shoes</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/womens-shoes">Womens Shoes</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/mens-watches">Mens Watches</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/womens-watches">Womens Watches</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/sports-accessories">Sports</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/sunglasses">Sunglasses</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/tops">Tops</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/womens-bags">Bags</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/womens-dresses">Dresses</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/womens-jewellery">Jewellery</Link></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="nav-item group relative">
                                    <p className="my-1 text-sm text-gray-900 hover:text-gray-700 font-normal md:mx-3 md:my-0">
                                    <Link href="/blog/content-1">
                                        <span>Tech</span>
                                    </Link>
                                    </p>
                                    <div className="mega-menu absolute -left-[249px] top-full hidden w-96 bg-white shadow-lg group-hover:block rounded-3xl">
                                    <ul className="p-6">
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/laptops">Laptops</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/mobile-accessories">Mobile Accessories</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/smartphones">Smartphones</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/tablets">Tablets</Link></li>
                                    </ul>
                                    </div>
                                </li>
                                <li className="nav-item group relative">
                                    <p className="my-1 text-sm text-gray-900 hover:text-gray-700 font-normal md:mx-3 md:my-0">
                                    <Link href="/blog/content-1">
                                        <span>Motor</span>
                                    </Link>
                                    </p>
                                    <div className="mega-menu absolute -left-[306px] top-full hidden w-96 bg-white shadow-lg group-hover:block rounded-3xl">
                                    <ul className="p-6">
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/motorcycle">Motorcycles</Link></li>
                                        <li className="py-1 text-sm text-gray-700"><Link href="/categories/vehicle">Cars</Link></li>
                                    </ul>
                                    </div>
                                </li>
                            </ul>

                            <div className="flex">
                            <div onClick={() => setSearchOpen(!searchOpen)} className="pr-2 flex justify-center cursor-pointer">
                                <p className="sm:hidden relative text-gray-900 hover:text-gray-700" target="_blank">
                                    <svg className="w-6 h-6 text-gray-900" stroke="white" strokeWidth="0.8" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
                                    </svg>
                                </p>
                            </div>
                            <div onClick={() => setIsShown(!isShown)} className="pl-3 flex justify-center lg:pl-5 sm:px-0 cursor-pointer lg:py-3 md:block">
                                <p className="relative text-gray-900 hover:text-gray-700" target="_blank">
                                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"></path>
                                    </svg>
                                    {cartContent && (
                                        <span style={{backgroundColor: flagBackgroundColor}} className="absolute top-0 left-0 rounded-full bg-indigo-100 text-gray-900 p-1 text-sm"></span>
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            {isShown && flagCartFeature === 'MiniCart' && (    
                <MiniCart />
            )}
            {isShown && flagCartFeature === 'SlidingCart' && (    
                <SlidingCart />
            )}
        </>
    )
}

export default Navbar