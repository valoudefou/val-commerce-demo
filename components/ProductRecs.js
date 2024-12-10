import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFsFlag } from "@flagship.io/react-sdk";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductRecs() {
    const [rec, setRec] = useState("");
    const [isLoading, setLoading] = useState(true);
    const flagProductRecsVal = useFsFlag("flagProductRecs");
    const flagProductRecs = flagProductRecsVal.getValue(
        "2dd95ccd-103c-4633-bca6-0c25a272096d"
    );

    function cn(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    useEffect(() => {
        async function getRecs() {
            const res = await fetch(
                `https://client.experiences.get-potions.com/v1/715/experience/` +
                    flagProductRecs
            );
            const data = await res.json();
            setRec(data);
        }
        getRecs();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="flex-col m-10">
            <h2 className="mt-1 flex justify-center text-3xl font-bold uppercase text-gray-900 sm:text-3xl sm:tracking-tight lg:text-3xl">
                {rec.name}
            </h2>
            <Slider {...settings} className="mt-6">
                {rec.products?.map((item) => (
                    <div key={item.id} className="px-4">
                        <Link href={item.link}>
                            <div className="rounded-xl bg-gray-200 justify-center flex">
                                <Image
                                    alt={item.title}
                                    src={item.img_link}
                                    width={400}
                                    height={400}
                                    style={{ height: "inherit" }}
                                    className={cn(
                                        "duration-700 ease-in-out group-hover:opacity-75",
                                        isLoading
                                            ? "scale-110 blur-2xl grayscale"
                                            : "scale-100 blur-0 grayscale-0"
                                    )}
                                    onLoadingComplete={() => setLoading(false)}
                                />
                            </div>
                        </Link>
                        <div className="flex items-start justify-between text-base font-normal text-gray-900 mt-4">
                            <h3>{item.title}</h3>
                            <p className="font-base font-bold text-slate-600 tracking-wide">
                                {item.price}€
                            </p>
                        </div>
                        <Link href={item.link}>
                            <button className="my-4 w-full flex items-center justify-center py-4 px-8 bg-slate-950 border border-slate-600 text-white text-bold text-sm rounded-full font-medium">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1"
                                    stroke="currentColor"
                                    className="w-6 h-6 py-1"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                                    />
                                </svg>
                                Discover
                            </button>
                        </Link>
                    </div>
                ))}
            </Slider>
        </div>
    );
}