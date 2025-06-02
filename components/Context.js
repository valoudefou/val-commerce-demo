import { useEffect } from "react";
import { useFlagship } from "@flagship.io/react-sdk";
import { atom, useAtom } from "jotai";
import { useState } from "react";

export const userContext = atom({ ["key"]: "value" });

export default function Context() {
    const { updateContext, clearContext } = useFlagship();
    const [context, setContext] = useAtom(userContext);
    const [step, setStep] = useState("key");
    const [key, setKey] = useState("");
    const [value, setValue] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // NEW: controls bubble vs expanded

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

    // Bubble style
    const bubbleStyle = "fixed bottom-6 right-6 z-20 bg-black text-white rounded-full w-14 h-14 flex items-center justify-center shadow-xl cursor-pointer";
    // Expanded box style (your original styles, but with higher z-index and transition)
    const boxStyle = "border flex flex-col border-gray-200 my-4 mx-4 py-7 px-9 fixed bottom-0 right-0 z-30 w-auto bg-white rounded-3xl shadow-xl transition-all";

    return (
        <>
            {!isOpen && (
                <div
                    className={bubbleStyle}
                    onClick={() => setIsOpen(true)}
                    title="Open user context"
                >
                    {/* Bubble icon (e.g., a user or settings icon) */}
                    <svg xmlns="http://www.w3.org/2000/svg" height="32" width="32" viewBox="0 0 48 48" aria-hidden="true">
                        <circle fill="#fff" cx="24" cy="24" r="22"/>
                        <path fill="#000" d="M24 26c-5.33 0-16 2.67-16 8v4h32v-4c0-5.33-10.67-8-16-8zm0-4a8 8 0 100-16 8 8 0 000 16z"/>
                    </svg>
                </div>
            )}
            {isOpen && (
                <div className={boxStyle}>
                    {/* Close/minimize button */}
                    <button
                        onClick={() => setIsOpen(false)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-black text-xl font-bold"
                        aria-label="Close"
                        type="button"
                    >
                        <svg class="h-5 w-5 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
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
            )}
        </>
    );
}
