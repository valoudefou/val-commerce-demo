import Link from 'next/link'
import { HitType, fsHit, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { useEffect } from 'react'

export default function Confirmation() {
    const { hit: fsHit } = useFlagship()
    fsHit.send({
        type: HitType.TRANSACTION, //or "TRANSACTION"
        transactionId: "#12346",
        affiliation: "Purchase",
        taxes: 19.99,
        currency: "USD",
        couponCode: "code",
        itemCount: 1,
        shippingMethod: "road",
        shippingCosts: 5,
        paymentMethod: "credit_card",
        totalRevenue: 2199.99
      })

      fsHit.send({
        type: HitType.ITEM, //or "ITEM"
          transactionId: "#12346",
          productName: "product",
          productSku: "sku123",
          itemPrice: 2199.99,
          itemQuantity: 1,
          itemCategory: "test"
      }) 
    
const fs = useFlagship();
//get flag 
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")
useEffect(() => {
const orderId = 'PW' + Math.floor(100000000 + Math.random() * 900000000)
const itemId1 = 'PA1' + Math.floor(100000000 + Math.random() * 900000000)
const itemId2 = 'PA2' + Math.floor(100000000 + Math.random() * 900000000)
window.dataLayer = window.dataLayer || [];
var currencies = ["AUD","CAD","CHF","CNY","CNY","DKK","EUR","GBP","HKD","ILS","JPY","KRW","MYR","NOK","NZD","SEK","SGD","USD"]; // include AED, TWD and SAR
var precision = 100; // 2 decimals
var revenue1 = Math.floor(Math.random() * (100 * precision - 1 * precision) + 1 * precision) / (1*precision);
var revenue2 = Math.floor(Math.random() * (100 * precision - 1 * precision) + 1 * precision) / (1*precision);
var currency = currencies[Math.floor(Math.random() * currencies.length)];
window.dataLayer.push({
'ecommerce': {
'purchase': {
'actionField': {
'id': orderId, // Transaction ID. Required for purchases and refunds.
'affiliation': 'Purchase',
'revenue': revenue1 + revenue2, // Total transaction value (incl. tax and shipping)
'currency': currency,
'coupon': 'SUMMER_SALE'
},
'products': [{ // List of productFieldObjects.
'name': 'Triblend Android T-Shirt', // Name or ID is required.
'id': itemId1,
'price': revenue1.toFixed(2),
'brand': 'Google',
'category': 'Apparel',
'variant': 'Gray',
'quantity': 1,
'coupon': '' // Optional fields may be omitted or set to empty string.
},
{
'name': 'Donut Friday Scented T-Shirt',
'id': itemId2,
'price': revenue2.toFixed(2),
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
<h2 id="order-details" className='sm:leading-tight flex justify-center h-screen items-center px-16 text-center sm:text-5xl text-3xl font-thin'>Your order is confirmed!</h2>
</>
);
}