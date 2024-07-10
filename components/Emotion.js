import { useContext } from "react"
import { AppContext } from "../pages/_app"

export default function Emotion() {
    const [isShown, setIsShown] = useContext(AppContext)

    return (
        <div className="add-to-cart px-4 py-4 flex items-center justify-center text-sm font-base" onClick={() => setIsShown(!isShown)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
            Add To Cart
        </div>
    )
}