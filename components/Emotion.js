import { useContext } from "react"
import { AppContext } from "../pages/_app"

export default function Emotion() {
    const [isShown, setIsShown] = useContext(AppContext)

    return (
        <div onClick={() => setIsShown(!isShown)}>
            Add To Cart
        </div>
    )
}