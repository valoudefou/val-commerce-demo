import Link from 'next/link'
import { HitType, useFlagship, useFsFlag } from "@flagship.io/react-sdk"
import { useEffect } from 'react'


export default function Confirmation() {
  const fs = useFlagship()

  // useEffect(() => {
  //   const storedHtml = localStorage.getItem('currentProduct')

  //   if (storedHtml) {

  //       const value = window.localStorage.getItem('currentProduct')
  //       setData(JSON.parse(value))
  //   }

  // console.log(props.transactionId)
  //   const { hit: fsHit } = useFlagship()
  //   fsHit.send({
  //       type: HitType.TRANSACTION, //or "TRANSACTION"
  //       transactionId: data.transactionId,
  //       affiliation: "Purchase",
  //       itemCount: data.quantity,
  //       paymentMethod: "Apple Pay",
  //       totalRevenue: data.productPrice
  //     })

  //     fsHit.send({
  //       type: HitType.ITEM, //or "ITEM"
  //         transactionId: data.transactionId,
  //         productName: data.productName,
  //         productSku: data.productId,
  //         itemPrice: data.productPrice,
  //         itemQuantity: data.quantity,
  //         itemCategory: data.productCategory
  //     }) 
  //   }, []);

//get flag 
const flagBackgroundColor = useFsFlag("flagBackgroundColor", "black")

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