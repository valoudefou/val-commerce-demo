import Image from 'next/image'
import Link from 'next/link'
import useSWR from 'swr'

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ProductCard() {
      //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/staticdata', fetcher);
    //Handle the error state
    if (error) return <div>Failed to load</div>;
    //Handle the loading state
    if (!data) return <div>Loading...</div>;
    //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
console.log(JSON.parse(data))
return (
<Link href="/products/pretty-woman-ring-mini-model" className="group">
<div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
<Image
alt=""
src="/product.png"
fill
/>
</div>
<div className="mt-4 flex items-center justify-between text-base font-normal text-gray-900">
<h3>Pretty Woman ring Mini model 18k white gold and diamonds</h3>
<p className='font-base font-bold'>1,650.00€</p>
</div>
</Link>
)
}
