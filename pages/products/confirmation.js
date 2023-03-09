import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { useEffect } from 'react'

export default function Confirmation() {
const fs = useFlagship();
//get flag 
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
useEffect(() => {
const orderId = 'PW' + Math.floor(100000000 + Math.random() * 900000000)
window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
'ecommerce': {
'purchase': {
'actionField': {
'id': orderId, // Transaction ID. Required for purchases and refunds.
'affiliation': 'Purchase',
'revenue': Math.floor(100 + Math.random() * 900), // Total transaction value (incl. tax and shipping)
'currency': 'GBP',
'tax': 3,
'shipping': 5.99,
'coupon': 'SUMMER_SALE'
},
'products': [{ // List of productFieldObjects.
'name': 'Triblend Android T-Shirt', // Name or ID is required.
'id': orderId,
'price': 15,
'brand': 'Google',
'category': 'Apparel',
'variant': 'Gray',
'quantity': 1,
'coupon': '' // Optional fields may be omitted or set to empty string.
},
{
'name': 'Donut Friday Scented T-Shirt',
'id': orderId,
'price': 33,
'brand': 'Google',
'category': 'Apparel',
'variant': 'Black',
'quantity': 1
}]
}
}
});
console.log('Transaction executed');
}, []); // Pass an empty dependency array to run only once on mount
return (
<>
<Link href="/">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" color={flagBackgroundColor.getValue()} strokeWidth="0.8" stroke="currentColor" className="absolute left-7 top-7 h-12 w-12">
<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
</svg>
</Link>
<h2 className='flex justify-center h-screen items-center sm:text-5xl text-3xl font-thin'>Your order is confirmed!</h2>
</>
);
}