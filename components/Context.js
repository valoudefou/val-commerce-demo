import { useFlagship } from "@flagship.io/react-sdk"
import { atom, useAtom } from 'jotai'
import { useEffect } from "react"

export const userContext = atom({['']: ''})

export default function Context() {
    const { updateContext } = useFlagship()
    const [context, setContext] = useAtom(userContext)
    const handleApply = (e) => {
        e.preventDefault()
        setContext({[e.target.previousSibling.previousSibling.value]: e.target.previousSibling.value})
        updateContext({[e.target.previousSibling.previousSibling.value]: e.target.previousSibling.value})
        alert('Context key: ' + '"' + e.target.previousSibling.previousSibling.value + '"' + ' value: ' + e.target.previousSibling.value + ' added to the user!')
    }

    useEffect(() => {
        setContext({['geolocation']: 'uk'})
        console.log(context)
        updateContext({['geolocation']: 'uk'})
    }, [])

    return (
        <>
        <div className="border flex flex-col border-gray-200 my-10 mx-10 py-7 px-9 fixed bottom-0 right-0 z-10 sm:w-2/3 md:w-2/3 lg:w-2/4 xl:w-2/6 w-auto bg-white rounded-3xl shadow-xl">
            <h3 className="flex flex-col text-md dark:text-white font-semibold leading-5 text-gray-800 px-2 mb-4">
                User context to activate flag
            </h3>
            <form>
                <div className="flex">
                    <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 rounded-l-2xl w-full py-3 px-4 text-grey-darker" id="coupon" type="coupon" placeholder="key (e.g. geolocation)"/>
                    <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 border-l-0 w-full py-3 px-4 text-grey-darker" id="coupon" type="coupon" placeholder="value (e.g. uk)"/>
                    <button onClick={handleApply} className="bg-black hover:bg-blue-dark text-white rounded-r-2xl text-sm font-medium px-4" type="submit">
                        Apply
                    </button>
                </div>
            </form>
        </div>        
        </>
    )
}