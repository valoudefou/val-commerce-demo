import { useFlagship } from "@flagship.io/react-sdk"
import { atom, useAtom } from 'jotai'
import { useEffect } from "react"

export const userContext = atom({['']: ''})

export default function Context() {
    const { updateContext } = useFlagship()
    const [context, setContext] = useAtom(userContext)
    const handleApply = (e) => {
        e.preventDefault();
    
        const key = e.target.previousSibling.previousSibling.value;
        let value = e.target.previousSibling.value;
    
        // Determine if the value is a boolean
        if (value.toLowerCase() === "true") {
            value = true;
        } else if (value.toLowerCase() === "false") {
            value = false;
        } else {
            // Try to convert the value to an integer if applicable
            const parsedValue = parseInt(value, 10);
            value = !isNaN(parsedValue) ? parsedValue : value; // Use integer if valid, otherwise keep as string
        }
    
        setContext({ [key]: value });
        updateContext({ [key]: value });
    
        alert(`Context key: "${key}" value: ${value} added to the user!`);
    };

    useEffect(() => {
        setContext({['geolocation']: 'uk'})
        updateContext({['geolocation']: 'uk'})
    }, [])

    return (
        <>
        <div className="border flex flex-col border-gray-200 my-5 mx-5 py-7 px-9 fixed bottom-0 right-0 z-10 sm:w-2/3 md:w-2/3 lg:w-2/4 xl:w-2/6 w-auto bg-white rounded-3xl shadow-xl">
            <h3 className="flex flex-col text-md dark:text-white font-semibold leading-5 text-gray-800 px-2 mb-4">
                User context to activate flag
            </h3>
            <form>
                <div className="flex">
                    <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 rounded-l-2xl w-full py-3 px-4 text-grey-darker" id="key" type="text" placeholder="key (e.g. geolocation)"/>
                    <input className="focus:outline-none border border-slate-300 text-sm text-gray-800 border-l-0 w-full py-3 px-4 text-grey-darker" id="value" type="text" placeholder="value (e.g. uk)"/>
                    <button onClick={handleApply} className="bg-black hover:bg-blue-dark text-white rounded-r-2xl text-sm font-medium px-5" type="submit">
                        Apply
                    </button>
                </div>
            </form>
        </div>        
        </>
    )
}