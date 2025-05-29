import Image from 'next/image';
import { useRouter } from 'next/router';
import { useFsFlag, useFlagship } from '@flagship.io/react-sdk';
import { useState, useContext, useEffect, useRef } from 'react';
import Navbar from '../../components/Navbar';
import ProductRecs from '../../components/ProductRecs';
import Footer from '../../components/Footer';
import { useAtom } from 'jotai';
import { pagePath } from '/pages/_app';
import { AppContext } from '/pages/_app';

export default function Product({ product }) {
  const [data, setData] = useState('');
  const sendData = useRef(0);
  const { updateContext } = useFlagship();
  const [path] = useAtom(pagePath);
  const [isShown, setIsShown] = useContext(AppContext);
  const possibleLabel = ["4 in stock", "3 in stock", "5 in stock", "Popular", "2 in stock"];
  const router = useRouter();

  useEffect(() => {
    updateContext({ route: path });
  }, [path, updateContext]);

  useEffect(() => {
    if (sendData.current === 0) {
      sendData.current++;
      window.DATA = window.DATA || {};
      window.DATA.viewingProduct = {
        id: product.id.toString(),
        title: product.title,
        price: product.price,
        category: product.category,
        image: product.thumbnail,
      };

      window.dataLayer = window.dataLayer || [];
      if (window.ABTasty) window.ABTastyReload();

      window.dataLayer.push({
        event: 'view_item',
        info: possibleLabel[Math.floor(Math.random() * possibleLabel.length)],
        ecommerce: {
          currency: 'EUR',
          value: product.price,
          items: [
            {
              item_id: product.id,
              item_name: product.title,
              item_category: product.category,
              price: product.price,
              quantity: 1,
            },
          ],
        },
      });
    }
  }, [product]);

  function pushCart() {
    const transactionId = '#' + Math.floor(10000 + Math.random() * 90000);
    const today = new Date();
    const productData = {
      productId: product.id,
      productCategory: product.category,
      productTitle: product.title,
      productPrice: product.price,
      productImage: product.thumbnail,
      productQuantity: 1,
      transactionId,
      date: today,
      info: 'Popular',
    };

    localStorage.setItem('currentProduct', JSON.stringify(productData));
    window.dataLayer = window.dataLayer || [];

    window.dataLayer.push({
      event: 'add_to_cart',
      ecommerce: {
        currency: 'EUR',
        value: productData.productPrice,
        items: [
          {
            item_id: productData.productId,
            item_name: productData.productTitle,
            item_category: productData.productCategory,
            price: productData.productPrice,
            quantity: productData.productQuantity,
          },
        ],
      },
    });

    const x = window.scrollX;
    const y = window.scrollY;
    window.scroll(x, y - 1);
  }

  const handleClick = () => {
    const storedHtml = localStorage.getItem('currentProduct');
    if (!storedHtml) {
      alert('Please Add To Cart');
    } else {
      window.location.href = '/products/confirmation';
    }
  };

  useEffect(() => {
    const storedHtml = localStorage.getItem('currentProduct');
    if (storedHtml) setData(JSON.parse(storedHtml));
  }, []);

  const paymentFeature1ClickVal = useFsFlag('paymentFeature1Click');
  const paymentFeature1Click = paymentFeature1ClickVal.getValue(false);

  if (router.isFallback) {
    return <div className='flex justify-center h-screen items-center text-4xl font-thin invisible'>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col justify-between">
      <Navbar />
      <div className="mx-auto max-w-1xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="relative mx-auto items-center flex flex-col lg:flex-row">
          <div id="ab-product" className="relative w-full">
            <div className="group relative overflow-hidden">
              <Image
                alt={product.title}
                className="rounded-lg object-scale-down self-center px-8 transition-transform duration-500 group-hover:scale-105"
                src={product.thumbnail}
                width={560}
                height={640}
              />
            </div>
          </div>
          <div className="flex flex-col lg:p-20 md:p-10">
            <h1 className="mt-1 text-2xl font-medium text-gray-900 sm:text-2xl sm:tracking-tight lg:text-3xl">{product.title}</h1>
            {typeof product?.price === 'number' ? (
                <h1 className="mt-3 text-2xl font-semibold text-slate-500">
                    {product.price.toFixed(2)} €
                </h1>
            ) : null}
            <div className="flex items-center pt-3">
              {Array.from({ length: 5 }).map((_, index) => (
                <svg
                  key={index}
                  className="w-6 h-6 text-yellow-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>

            <button onClick={pushCart} className="mt-5 bg-white border-2 hover:bg-gray-50 border-gray-300 text-slate-600 text-semibold text-sm rounded-full font-medium w-full">
              <div className="add-to-cart px-4 py-4 flex items-center justify-center text-sm font-base" onClick={() => setIsShown(!isShown)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="w-6 h-6 py-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                Add To Cart
              </div>
            </button>

            {paymentFeature1Click && (
              <button onClick={handleClick} className="justify-center mt-4 tracking-wide items-center w-full flex text-xl font-medium bg-black text-white py-4 px-14 rounded-full hover:bg-neutral-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF" viewBox="0 0 24 24" width="25px" height="25px">
                  <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z" />
                </svg>
                Pay
              </button>
            )}

            <div className="mt-10 mb-5 border-t border-gray-200 pt-10 font-bold text-base">Description</div>
            <p className="max-w-xxl font-light text-base tracking-normal">{product.description}</p>
          </div>
        </div>
      </div>
      <ProductRecs />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  try {
    console.log('🚀 Fetching products for static paths...');
    
    const res = await fetch('https://live-server1.vercel.app/products', {
      // Add timeout and retry logic
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-StaticPaths'
      }
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('📦 API Response received');

    // ✅ ROBUST: Handle all possible cases
    const products = data?.products;

    // Check if products exists and is an array
    if (!products) {
      console.warn('⚠️ No products property found');
      return { paths: [], fallback: 'blocking' };
    }

    if (!Array.isArray(products)) {
      console.error('❌ Products is not an array:', typeof products);
      return { paths: [], fallback: 'blocking' };
    }

    if (products.length === 0) {
      console.warn('⚠️ Products array is empty');
      return { paths: [], fallback: 'blocking' };
    }

    // Filter valid products with IDs
    const validProducts = products.filter(product => 
      product && 
      product.id !== null && 
      product.id !== undefined &&
      String(product.id).trim() !== ''
    );

    console.log(`✅ Found ${validProducts.length} valid products out of ${products.length}`);

    const paths = validProducts.map(product => ({
      params: { id: String(product.id) }
    }));

    console.log(`🎯 Generated ${paths.length} static paths`);

    return {
      paths,
      fallback: false, // or 'blocking' if you want runtime generation
    };

  } catch (error) {
    console.error('💥 getStaticPaths failed:', error.message);
    
    // ✅ CRITICAL: Don't crash the build - return empty paths
    return {
      paths: [],
      fallback: 'blocking', // Allow pages to be generated at runtime
    };
  }
}

export async function getStaticProps({ params }) {
  try {
    const res = await fetch(`https://live-server1.vercel.app/products/${params.id}`);

    if (!res.ok) {
      return { notFound: true };
    }

    const product = await res.json();

    return {
      props: { product },
      revalidate: 3600, // ✅ Regenerate every hour (ISR)
    };
  } catch (error) {
    console.error('getStaticProps error:', error);
    return { notFound: true };
  }
}
