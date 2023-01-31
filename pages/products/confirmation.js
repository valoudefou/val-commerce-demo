import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import React, { useEffect } from 'react'

export default function Confirmation() {
  const fs = useFlagship();
  
  //get flag 
  const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black");
  useEffect(() => {
    const orderId = 'PW' + Math.floor(100000000 + Math.random() * 900000000)
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'ecommerce': {
        'purchase': {
          'actionField': {
            'id': orderId, // Transaction ID. Required for purchases and refunds.
            'affiliation': 'Purchase',
            'revenue': 54, // Total transaction value (incl. tax and shipping)
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
      <h1 style={{ color: flagBackgroundColor.getValue(), padding: '30px', fontSize: '15px' }}>
        <Link href="/">Back home</Link>
      </h1>
      <h2 style={{ fontSize: 'xxx-large', textAlign: 'center', padding: '80px', lineHeight: '4rem' }}>Your order is confirmed!</h2>
    </>
  );
}