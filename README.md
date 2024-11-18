<img src="https://content.partnerpage.io/eyJidWNrZXQiOiJwYXJ0bmVycGFnZS5wcm9kIiwia2V5IjoibWVkaWEvY29udGFjdF9pbWFnZXMvMDUwNGZlYTYtOWIxNy00N2IyLTg1YjUtNmY5YTZjZWU5OTJiLzI1NjhmYjk4LTQwM2ItNGI2OC05NmJiLTE5YTg1MzU3ZjRlMS5wbmciLCJlZGl0cyI6eyJ0b0Zvcm1hdCI6IndlYnAiLCJyZXNpemUiOnsid2lkdGgiOjEyMDAsImhlaWdodCI6NjI3LCJmaXQiOiJjb250YWluIiwiYmFja2dyb3VuZCI6eyJyIjoyNTUsImciOjI1NSwiYiI6MjU1LCJhbHBoYSI6MH19fX0=" alt="AB Tasty logo" width="370"/>

## Instructions

AB Tasty React Next.js SPA App

Ask Customer Success or dedicated Solutions Consultant for AB Tasty UI access to flags, config and data

Access code using command ```npm clone https://github.com/valoudefou/trial.git``` from local folder

This AB Tasty demo environment provides real time technical insights around:
- SPA / React / NextJS compatibility ----> [Documentation](https://support.abtasty.com/hc/en-us/articles/14427828636572-How-the-AB-Tasty-tag-is-designed-to-handle-Single-Page-Apps-SPA)
- Bring Your Own ID (BYOID) ----> [Documentation](https://support.abtasty.com/hc/en-us/articles/14503207884700-Visitor-Identity-Management)
- Offline Data Import ----> [Documentation](https://developers.abtasty.com/docs/data/universal-data-connector)
- Search Recommendations ----> [Documentation](https://recos.docs.get-potions.com)
- BigQuery Intergation ----> [Documentation](https://support.abtasty.com/hc/en-us/articles/12227118781084-Big-Query-Daily-exports-from-AB-Tasty-to-Big-Query)
- Flag Exposure Data Warehouse Push ----> [Documentation](https://docs.developers.flagship.io/docs/react-js-reference#onvisitorexposed)
- Flag Polling Config Update NextJS ----> [Documentation](https://docs.developers.flagship.io/docs/react-js-reference#updatecontext-method)
- Flag QA mode ----> [Documentation](https://docs.developers.flagship.io/docs/qa-assistant)
- Server side rendering vs client side React ----> [Documentation](https://docs.developers.flagship.io/docs/nextjs-13)
- Headless CMS Content Handling
- Anti-Flicker Solution

## Features

| Flag | Details    | Key    | Type | Value    | Targeting    |
| :---:   | :---: | :---: | :---:   | :---: | :---: |
| Price Calculation | This is an A/B test to validate the best delivery cost for DPD and Evri, the flag is located in the checkout after the customer information.   | flagDeliveryFeeDpd, flagDeliveryFeeEvri   | NUMBER | 7.99 or ANY NUMBER   | All users or ANY   |
| Simple Text | This is a personalisation to gain control on the text located top left corner of the web/mobile application with default value "Product".    | flagIndustry    | TEXT | Trial or ANY TEXT    | All users or ANY    |
| Color | This is a flag to control the color of the trolley dot located top right corner that appears when an item is in the basket.    | flagBackgroundColor    | TEXT | #ff0000 or ANY COLOR    | All users or ANY    |
| Apple Pay | This is a flag to A/B test the Apple Pay payment method that located on the Product Page, Sliding Cart, Mini Cart and Checkout.   | paymentFeature1Click   | BOLEAN | TRUE or FALSE   | All users or ANY   |
| Sliding Cart | This is a release to validate the impact of a Sliding Cart vs Mini Cart, the feature is located clicking the trolley on the top right corner of the web/mobile appliation.    | flagCartFeature    | TEXT | MiniCart, SlidingCart    | All users or ANY   |

## Built With

- [AB Tasty](https://www.abtasty.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Next.js](https://nextjs.org/)
- [Vercel](https://vercel.com/)

## Deploy with Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnutlope%2Fnextjs-swell&env=NEXT_PUBLIC_SWELL_STORE_ID,NEXT_PUBLIC_SWELL_PUBLIC_KEY,REVALIDATE_SECRET&envDescription=API%20Keys%20from%20Swell%20needed%20to%20run%20this%20application.)
