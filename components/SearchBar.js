import { useRef } from "react"
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"

export default function SearchBar() {
const fs = useFlagship()
const flagIndustry = useFsFlag("flagIndustry", "Product")
const clickPoint = useRef()
const handleFocus = () => {
clickPoint.current.style.display = "none"
}

const handleBlur = () => {
clickPoint.current.style.display = "block"
}

return (
<div className="items-center px-4 justify-center hidden sm:flex" >
<div className="relative mr-3">
<div className="absolute top-3 left-3 items-center" ref={clickPoint}>
<svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
</div>
<input
type="text"
className="block p-2 font-light pl-10 w-70 text-gray-900 bg-gray-50 rounded-lg border border-gray-200 focus:pl-3 lowercase"
placeholder={'Search ' + flagIndustry.getValue() + ' ...'}
onFocus={handleFocus}
onBlur={handleBlur}
/>
</div>
</div>
);
}