import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFsFlag } from "@flagship.io/react-sdk";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function NextArrow({ onClick }) {
    return (
        <div
            className="absolute top-1/3 right-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md cursor-pointer z-10"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
            </svg>
        </div>
    );
}

function PrevArrow({ onClick }) {
    return (
        <div
            className="absolute top-1/3 left-0 transform -translate-y-1/2 bg-gray-200 p-2 rounded-full shadow-md cursor-pointer z-10"
            onClick={onClick}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6 text-gray-700"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 19.5l-7.5-7.5 7.5-7.5"
                />
            </svg>
        </div>
    );
}

export default function ProductRecs() {
    const [rec, setRec] = useState("");
    const [isLoading, setLoading] = useState(true);
    const flagProductRecsVal = useFsFlag("flagProductRecs");
    const flagProductRecs = flagProductRecsVal.getValue(
        "4ce1a290-4b79-4a8d-9aa8-0ef891168941"
    );
    const flagConfigCarouselVal = useFsFlag("flagConfigCarousel");
    const flagConfigCarousel = flagConfigCarouselVal.getValue({
        dots: true,
        infinite: true,
        autoplay: false,
        speed: 400,
        slidesToShow: 5,
        slidesToScroll: 1,
        // nextArrow: <NextArrow />,
        // prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    });
    const settings = (flagConfigCarousel);

    function cn(...classes) {
        return classes.filter(Boolean).join(" ");
    }

    useEffect(() => {
        async function getRecs() {
            try {
                const res = await fetch(
                    `https://client.experiences.get-potions.com/v1/715/experience/` + flagProductRecs
                );
                const data = await res.json();
                setRec(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
        getRecs();
    }, [flagProductRecs]);    

    return (
        <div className="flex-col pt-10 pb-60 relative px-4 sm:px-6 lg:px-8">
            <div className="mt-1 mb-[60px] text-3xl font-medium text-center uppercase text-gray-900 sm:text-3xl lg:text-3xl leading-relaxed">
                {rec.name}
            </div>
            <Slider {...settings} className="mt-6">
                {rec.products?.map((item) => (
                    <div key={item.id} className="px-4 h-full">
                        <Link href={item.link}>
                            <div className="flex rounded-xl bg-gray-200 justify-center">
                                <Image
                                    alt={item.title}
                                    src={item.img_link}
                                    width={400}
                                    height={400}
                                    style={{ height: "inherit" }}
                                    className={cn(
                                        "contain-strict duration-700 ease-in-out group-hover:opacity-75",
                                        isLoading
                                            ? "scale-110 blur-2xl grayscale"
                                            : "scale-100 blur-0 grayscale-0"
                                    )}
                                    onLoadingComplete={() => setLoading(false)}
                                />
                            </div>
                        </Link>
                        <div className="flex flex-col justify-between h-32 mt-4">
                            <div className="flex justify-between text-base font-normal text-gray-900">
                                <h3>{item.title}</h3>
                                <p className="font-base font-bold text-slate-600 tracking-wide">
                                    {new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(item.price)}€
                                </p>
                            </div>
                            <Link href={item.link}>
                                <button className="w-full flex items-center justify-center py-4 px-8 my-4 bg-slate-950 border border-slate-600 text-white text-bold text-sm rounded-full font-medium">
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
                    </div>
                ))}
            </Slider>
        </div>
    );
}