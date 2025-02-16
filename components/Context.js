import { useEffect } from "react";
import { useFlagship } from "@flagship.io/react-sdk";
import { atom, useAtom } from "jotai";
import { useState } from "react";

export const userContext = atom({ ["key"]: "value" });

export default function Context() {
    const { updateContext, clearContext } = useFlagship();
    const [context, setContext] = useAtom(userContext);
    const [step, setStep] = useState("key"); // Tracks if we're entering the "key" or "value"
    const [key, setKey] = useState(""); // Stores the key input
    const [value, setValue] = useState(""); // Stores the value input
    const [successMessage, setSuccessMessage] = useState(false); // Tracks if the success message is displayed

    // useEffect(() => {
    //     const iframe = document.createElement("iframe");
    //     iframe.src = "https://live-server1.vercel.app/";
    //     iframe.style.visibility = "hidden"; // Hide the iframe
    //     iframe.async = true;
    //     document.body.appendChild(iframe);
    
    //     return () => {
    //         document.body.removeChild(iframe);
    //     };
    // }, []);

    const handleApply = (e) => {
        e.preventDefault();
        if (step === "key") {
            if (key.trim() === "") return alert("Please enter a key");
            setStep("value");
        } else if (step === "value") {
            if (value.trim() === "") return alert("Please enter a value");
            clearContext();
            const newContext = { [key]: value };
            setContext(newContext);
            updateContext(newContext);
            setSuccessMessage(true);
            setTimeout(() => {
                setSuccessMessage(false);
                resetForm();
            }, 4000);
        }
    };

    const resetForm = () => {
        setKey("");
        setValue("");
        setStep("key");
    };

    return (
        <div className="border flex flex-col border-gray-200 my-4 mx-4 py-7 px-9 fixed bottom-0 right-0 z-10 w-auto bg-white rounded-3xl shadow-xl">
            {!successMessage && (
                <h3 className="flex flex-col text-md dark:text-white font-semibold leading-5 text-gray-800 px-2 mb-4">
                    User context to activate flag
                </h3>
            )}
            {successMessage ? (
                <div className="flex gap-2 items-center justify-center">    
                    <svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 48 48" aria-hidden="true">
                        <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
                        <path className="tick" fill="none" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
                    </svg>
                    <div className="text-[#5bb543] font-medium text-sm text-center">
                        Context successfully sent!
                    </div>
                </div>
            ) : (
                <form>
                    <div className="flex">
                        {step === "key" ? (
                            <input
                                className="focus:outline-none border border-slate-300 text-sm text-gray-800 rounded-l-2xl w-full py-3 px-4 text-grey-darker"
                                type="text"
                                placeholder="key (e.g. geolocation)"
                                value={key}
                                onChange={(e) => setKey(e.target.value)}
                            />
                        ) : (
                            <input
                                className="focus:outline-none border border-slate-300 text-sm text-gray-800 rounded-l-2xl w-full py-3 px-4 text-grey-darker"
                                type="text"
                                placeholder="value (e.g. uk)"
                                value={value}
                                onChange={(e) => setValue(e.target.value)}
                            />
                        )}
                        <button
                            onClick={handleApply}
                            className="bg-black hover:bg-blue-dark text-white rounded-r-2xl text-sm font-medium px-5"
                            type="submit"
                        >
                            {step === "key" ? "Apply" : "Send"}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
