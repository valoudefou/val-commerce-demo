import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { useEffect, useState } from "react"

export default function Emotion() {

    // const [items, setItems] = useState([]);

    // useEffect(() => {
    //     const items = JSON.parse(window.sessionStorage.getItem('ABTastyCustomSegments'));
    //     if (items) {
    //         const interval1 = setInterval(() => {
    //             console.log('checking emotionsAI info')
    //             console.log('emotionsAI info is found')
    //             clearInterval(interval1)
    //             const interval2 = setInterval(() => {
    //                 console.log('emotionsAI determines emotional need as the user browses the app')
    //                 if (items.length > 1) {
    //                     console.log("The user emotion passed to AB Tasty SDK is -----> " + items[1].dotaki_need)
    //                     setItems(items)
    //                     clearInterval(interval2)
    //                 }
    //             }, 1000);
    //         }, 1000);
    //     }
    // }, []);


    const fs = useFlagship();
    const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
    return (
        <>

	<div class="grid lg:grid-cols-2 md:grid-cols-2 gap-8 w-full max-w-screen-lg">
		<div class="lg:col-span-2">
			<div class="bg-white rounded">
            <div class="flex items-center py-4 border-b">
						<div class="text-[18px] font-bold">Trip Assist</div>
                        <div class="text-[10px] mx-6 text-[#f08327] rounded px-2 py-1 bg-[#fef2e7] border-2 font-medium border-[#f08327]">Recommended</div>
					</div>
             
                    <ul className="text-[12px] py-2">
  <li className="py-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-1" stroke-width="1.5" width="27px" height="27px" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_15_44)">
<rect width="20" height="20" fill="white"/>
<path d="M19.3074 7.63582C19.3074 7.63582 20.4246 5.92462 19.364 4.86396C18.3033 3.8033 16.5921 4.92053 16.5921 4.92053L13.0566 8.45606L5.45753 6.04247L3.57191 7.92809L9.75674 11.7559L7.87112 13.6415L4.40158 13.9432L3.69448 14.6503L7.34315 16.8848L9.60589 20.5617L10.313 19.8546L10.5864 16.3568L12.472 14.4712L16.2998 20.656L18.1854 18.7704L15.7719 11.1714L19.3074 7.63582Z" stroke="#000000" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_15_44">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
<script xmlns=""/></svg>Trip delay/Missed connection/Missed departure</li>
<li className="py-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-1" stroke-width="1.5" width="27px" height="27px" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_15_44)">
<rect width="20" height="20" fill="white"/>
<path d="M19.3074 7.63582C19.3074 7.63582 20.4246 5.92462 19.364 4.86396C18.3033 3.8033 16.5921 4.92053 16.5921 4.92053L13.0566 8.45606L5.45753 6.04247L3.57191 7.92809L9.75674 11.7559L7.87112 13.6415L4.40158 13.9432L3.69448 14.6503L7.34315 16.8848L9.60589 20.5617L10.313 19.8546L10.5864 16.3568L12.472 14.4712L16.2998 20.656L18.1854 18.7704L15.7719 11.1714L19.3074 7.63582Z" stroke="#000000" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_15_44">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
<script xmlns=""/></svg>Baggage loss & delay</li>
<li className="py-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-1" stroke-width="1.5" width="27px" height="27px" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_15_44)">
<rect width="20" height="20" fill="white"/>
<path d="M19.3074 7.63582C19.3074 7.63582 20.4246 5.92462 19.364 4.86396C18.3033 3.8033 16.5921 4.92053 16.5921 4.92053L13.0566 8.45606L5.45753 6.04247L3.57191 7.92809L9.75674 11.7559L7.87112 13.6415L4.40158 13.9432L3.69448 14.6503L7.34315 16.8848L9.60589 20.5617L10.313 19.8546L10.5864 16.3568L12.472 14.4712L16.2998 20.656L18.1854 18.7704L15.7719 11.1714L19.3074 7.63582Z" stroke="#000000" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_15_44">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
<script xmlns=""/></svg>Travel assistance services</li>
<li className="py-1 flex items-center"><svg xmlns="http://www.w3.org/2000/svg" className="mr-1" stroke-width="1.5" width="27px" height="27px" viewBox="0 0 24 24" fill="none">
<g clip-path="url(#clip0_15_44)">
<rect width="20" height="20" fill="white"/>
<path d="M19.3074 7.63582C19.3074 7.63582 20.4246 5.92462 19.364 4.86396C18.3033 3.8033 16.5921 4.92053 16.5921 4.92053L13.0566 8.45606L5.45753 6.04247L3.57191 7.92809L9.75674 11.7559L7.87112 13.6415L4.40158 13.9432L3.69448 14.6503L7.34315 16.8848L9.60589 20.5617L10.313 19.8546L10.5864 16.3568L12.472 14.4712L16.2998 20.656L18.1854 18.7704L15.7719 11.1714L19.3074 7.63582Z" stroke="#000000" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_15_44">
<rect width="20" height="20" fill="white"/>
</clipPath>
</defs>
<script xmlns=""/></svg>Emergency Medical & Associated expenses</li>
</ul>
<div class="font-medium text-[11px] underline py-2">
                <a class="text-sky-500 dark:text-sky-400" href="www.w3resource.com">View Benefits</a>
				</div>
				<div class="flex items-center text-[12px] bg-[#dafeff] px-5 py-2 my-2">
						<input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100" type="radio"/>
						<label class="ml-4">Yes, Secure my trip for <span className='font-bold'>₦10,000</span> /traveller</label>
					</div>
				<div>
					<div class="flex items-center text-[12px] py-2 mx-5 my-2">
						<input class="appearance-none w-4 h-4 rounded-full border-2 border-white ring-2 ring-blue-600 ring-opacity-100 bg-blue-600" type="radio"/>
						<label class="ml-4">No, I'll book without insurance</label>
					</div>
				
                   
				</div>
             <div className="pb-6">
                <div class="font-bold text-[11px] py-2">
                    Protection for trip cancellation, flight delay, baggage loss and more.
				</div>
                <div class="text-[9px] py-2">
                By adding insurance you confirm all passengers are between 0 to 80 years of age and agree <a class="text-sky-500 font-semibold dark:text-sky-400" href="www.w3resource.com">terms and conditions</a>
				</div>
            </div>
			</div>
		</div>
	</div>
        </>
    )
}
