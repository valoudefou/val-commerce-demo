import { useFlagship } from "@flagship.io/react-sdk"

export default function Context() {
    const { updateContext } = useFlagship()
    const handleApply = (e) => {
        e.preventDefault()
        updateContext({[e.target.previousSibling.previousSibling.value]: e.target.previousSibling.value})
        alert('key: ' + e.target.previousSibling.previousSibling.value + ' and ' + 'value: ' + e.target.previousSibling.value + ' added to the user!')
    }

    return (
        <>
        <div className="border flex flex-col border-gray-200 my-10 mx-10 py-7 px-9 fixed bottom-0 right-0 z-10 sm:w-2/3 md:w-2/3 lg:w-2/4 xl:w-2/6 w-auto bg-white rounded-3xl shadow-xl">
            <h3 className="flex flex-col text-md dark:text-white font-semibold leading-5 text-gray-800 px-2 mb-4">
                AB Tasty user context to activate flag
            </h3>
            <div className="flex">
                <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 rounded-l-2xl w-full py-4 px-4 text-grey-darker" id="coupon" type="coupon" placeholder="key (eg. geolocation)"/>
                <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 border-l-0 w-full py-4 px-4 text-grey-darker" id="coupon" type="coupon" placeholder="value (eg. uk)"/>
                <button onClick={handleApply} className="bg-black hover:bg-blue-dark text-white rounded-r-2xl text-sm font-medium px-7" type="submit">
                    Apply
                </button>
            </div>
        </div>        
        </>
    )
}