import { useEffect, useState } from "react"
import Link from 'next/link'

export default function Confirmation() {
  const [data, setData] = useState('')


  const handleRemoveItem = () => {
    const itemName = 'currentProduct' // Replace with the key of the item you want to remove
    localStorage.removeItem(itemName)
    pushGaData()
}

const pushGaData = () => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'purchase',
    ecommerce: {
      purchase: {
        actionField: {
          'event': 'purchase',
          'id': data.transactionId,
          'revenue': data.productPrice,
          'affiliation': 'purchase',
          'shipping': 'online',
          'currencyCode': 'EUR',
        },
        products: [{
          'sku': data.productId,
          'name': data.productTitle,
          'category': data.productCategory,
          'price': data.productPrice,
          'quantity': data.productQuantity
        }]
      }
    }
  });
};


useEffect(() => {
  const storedHtml = localStorage.getItem('currentProduct')

  if (storedHtml) {


      const value = window.localStorage.getItem('currentProduct')
      setData(JSON.parse(value))


  }
}, []);





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


return (
<>
<div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">



  <div className="flex items-center">
  <Link href='/'>
  <div onClick={handleRemoveItem} className="svg-container">    
    <svg className="ft-green-tick" xmlns="http://www.w3.org/2000/svg" height="75" width="75" viewBox="0 0 48 48" aria-hidden="true">
        <circle className="circle" fill="#5bb543" cx="24" cy="24" r="22"/>
        <path className="tick" fill="none" stroke="#FFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="M14 27l5.917 4.917L34 17"/>
    </svg>
</div>
</Link>
<div className="flex flex-col pl-4 pt-3">
    <h1 className="text-2xl dark:text-white lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Your order {data.transactionId} is confirmed!</h1>
    <p className="text-base dark:text-gray-300 font-medium p-1 leading-6 text-gray-600">21st Mart 2024 at 10:34 PM</p>
    </div>
  </div>
  <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
    <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
      <div className="flex flex-col justify-start items-start dark:bg-gray-800 bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
        <p className="text-xl md:text-1xl dark:text-white font-semibold leading-6 xl:leading-5 text-gray-800">Order details</p>
        <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
          <div className="w-full md:w-40">
            <img className="w-full hidden md:block" src={data.productImage} alt="dress" />
            <img className="w-full md:hidden" src={data.productImage} alt="dress" />
          </div>
          <div className="md:flex-row flex-col flex justify-between items-start w-full space-y-4 md:space-y-0">
            <div className="w-full flex flex-col justify-start items-start space-y-8">
              <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">{data.productTitle}</h3>
              <div className="flex justify-start items-start flex-col space-y-2">
                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Category: </span> {data.productCategory}</p>
                <p className="text-sm dark:text-white leading-none text-gray-800"><span className="dark:text-gray-400 text-gray-300">Quantity: </span> {data.productQuantity}</p>
              </div>
            </div>
            <div className="flex justify-between space-x-8 items-start w-full">
              <p className="text-base dark:text-white xl:text-lg leading-6"></p>
              <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">{data.productPrice} €</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
        <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Summary</h3>
          <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
            <div className="flex justify-between w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Subtotal</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">{data.productPrice} €</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="text-base dark:text-white leading-4 text-gray-800">Shipping</p>
              <p className="text-base dark:text-gray-300 leading-4 text-gray-600">8.00 €</p>
            </div>
          </div>
          <div className="flex justify-between items-center w-full">
            <p className="text-base dark:text-white font-semibold leading-4 text-gray-800">Total</p>
            <p className="text-base dark:text-gray-300 font-semibold leading-4 text-gray-600">{Math.round(data.productPrice + 8)} €</p>
          </div>
        </div>
        <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full bg-gray-50 dark:bg-gray-800 space-y-6">
          <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Shipping</h3>
          <div className="flex justify-between items-start w-full">
            <div className="flex justify-center items-center space-x-4">
              <div className="w-8 h-8">
                <img className="w-full h-full" alt="logo" src="https://i.ibb.co/L8KSdNQ/image-3.png" />
              </div>
              <div className="flex flex-col justify-start items-center">
                <p className="text-lg leading-6 dark:text-white font-semibold text-gray-800">DPD Delivery<br /><span className="font-normal">Delivery with 24 Hours</span></p>
              </div>
            </div>
            <p className="text-lg font-semibold leading-6 dark:text-white text-gray-800">8.00 €</p>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-gray-50 dark:bg-gray-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col">
      <h3 className="text-xl dark:text-white font-semibold leading-5 text-gray-800">Customer</h3>
      <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
        <div className="flex flex-col justify-start items-start flex-shrink-0">
          <div className="flex justify-center w-full md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
            <img src="https://i.ibb.co/5TSg7f6/Rectangle-18.png" alt="avatar" />
            <div className="flex justify-start items-start flex-col space-y-2">
              <p className="text-base dark:text-white font-semibold leading-4 text-left text-gray-800">Mike Bee</p>
              <p className="text-sm dark:text-gray-300 leading-5 text-gray-600">10 Previous Orders</p>
            </div>
          </div>

          <div className="flex justify-center text-gray-800 dark:text-white md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 7L12 13L21 7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="cursor-pointer text-sm leading-5 ">mike@bee.com</p>
          </div>
        </div>
        <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
          <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row items-center md:items-start">
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4 xl:mt-8">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Shipping Address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">AB Tasty, New York 408 Broadway, NY 10013</p>
            </div>
            <div className="flex justify-center md:justify-start items-center md:items-start flex-col space-y-4">
              <p className="text-base dark:text-white font-semibold leading-4 text-center md:text-left text-gray-800">Billing Address</p>
              <p className="w-48 lg:w-full dark:text-gray-300 xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">AB Tasty, New York 408 Broadway, NY 10013</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</>
);
}