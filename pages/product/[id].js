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
import { pushToDataLayer } from '../../utils/analytics';

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

      if (window.ABTasty) window.ABTastyReload();

      pushToDataLayer({
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

    pushToDataLayer({
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
    return <div className='flex justify-center h-screen items-center text-4xl font-thin'>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <Navbar />
      
      {/* NEW TEMPLATE INDICATOR */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <span className="text-sm font-bold uppercase tracking-wide">✨ Enhanced New Product Template</span>
        </div>
      </div>
      
      {/* Hero Section - Enhanced Design */}
      <div className="bg-white shadow-xl">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-12 gap-y-16 lg:grid-cols-2">
            
            {/* Product Image Section - Enhanced */}
            <div className="lg:self-end">
              <div className="relative">
                {/* Background decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-200 to-blue-200 rounded-3xl opacity-30"></div>
                
                <div className="relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-2xl">
                  <Image
                    alt={product.title}
                    className="h-full w-full object-cover object-center transition-all duration-700 hover:scale-110"
                    src={product.thumbnail}
                    width={700}
                    height={700}
                    loading="lazy"
                  />
                  
                  {/* Floating badge */}
                  <div className="absolute top-4 left-4 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-2 text-sm font-bold text-white shadow-lg">
                    NEW DESIGN
                  </div>
                </div>
              </div>
            </div>

            {/* Product Info Section - Enhanced */}
            <div className="lg:self-start">
              <div className="space-y-8">
                
                {/* Product Title & Price - Enhanced */}
                <div className="space-y-6">
                  <h1 className="text-5xl font-black tracking-tight bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent sm:text-6xl">
                    {product.title}
                  </h1>
                  
                  {typeof product?.price === 'number' && (
                    <div className="flex items-baseline space-x-3">
                      <span className="text-4xl font-black text-gray-900">
                        €{product.price.toFixed(2)}
                      </span>
                      <span className="text-xl text-gray-500 line-through">
                        €{(product.price * 1.2).toFixed(2)}
                      </span>
                      <span className="rounded-full bg-gradient-to-r from-red-500 to-pink-500 px-4 py-2 text-sm font-bold text-white shadow-lg">
                        Save 20%
                      </span>
                    </div>
                  )}
                </div>

                {/* Enhanced Rating */}
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <svg
                        key={index}
                        className="h-6 w-6 text-yellow-400 drop-shadow-sm"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-base font-medium text-gray-700">(4.8) • 127 reviews</span>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-4">
                  <button 
                    onClick={pushCart}
                    className="w-full rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-5 text-lg font-bold text-white shadow-xl transition-all duration-300 hover:from-purple-700 hover:to-blue-700 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300"
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6m0 0h15M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
                      </svg>
                      <span>Add to Cart - Enhanced</span>
                    </div>
                  </button>

                  {paymentFeature1Click && (
                    <button 
                      onClick={handleClick}
                      className="w-full rounded-2xl border-2 border-gray-300 bg-white px-8 py-5 text-lg font-bold text-gray-900 shadow-lg transition-all duration-300 hover:border-purple-300 hover:bg-purple-50 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-200"
                    >
                      <div className="flex items-center justify-center space-x-3">
                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M 16.125 1 C 14.972 1.067 13.648328 1.7093438 12.861328 2.5273438 C 12.150328 3.2713438 11.589359 4.3763125 11.818359 5.4453125 C 13.071359 5.4783125 14.329031 4.8193281 15.082031 3.9863281 C 15.785031 3.2073281 16.318 2.12 16.125 1 z M 16.193359 5.4433594 C 14.384359 5.4433594 13.628 6.5546875 12.375 6.5546875 C 11.086 6.5546875 9.9076562 5.5136719 8.3476562 5.5136719 C 6.2256562 5.5146719 3 7.4803281 3 12.111328 C 3 16.324328 6.8176563 21 8.9726562 21 C 10.281656 21.013 10.599 20.176969 12.375 20.167969 C 14.153 20.154969 14.536656 21.011 15.847656 21 C 17.323656 20.989 18.476359 19.367031 19.318359 18.082031 C 19.922359 17.162031 20.170672 16.692344 20.638672 15.652344 C 17.165672 14.772344 16.474672 9.1716719 20.638672 8.0136719 C 19.852672 6.6726719 17.558359 5.4433594 16.193359 5.4433594 z" />
                        </svg>
                        <span>Buy with Apple Pay</span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Enhanced Features Grid */}
                <div className="grid grid-cols-2 gap-6 pt-8">
                  {[
                    { icon: "🚚", text: "Free shipping" },
                    { icon: "↩️", text: "30-day returns" },
                    { icon: "🛡️", text: "2-year warranty" },
                    { icon: "🔒", text: "Secure payment" }
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-4 shadow-sm">
                      <span className="text-2xl">{feature.icon}</span>
                      <span className="font-medium text-gray-700">{feature.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Product Description */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">Product Details</h2>
            <div className="prose prose-xl text-gray-700 text-center mb-12">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>
            
            {/* Enhanced Tabs */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex justify-center space-x-12">
                  <button className="border-b-4 border-purple-600 py-4 px-2 text-lg font-bold text-purple-600">
                    Specifications
                  </button>
                  <button className="border-b-4 border-transparent py-4 px-2 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
                    Reviews
                  </button>
                  <button className="border-b-4 border-transparent py-4 px-2 text-lg font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors">
                    Shipping
                  </button>
                </nav>
              </div>
              <div className="py-8">
                <dl className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                  {[
                    { label: "Material", value: "Premium quality materials" },
                    { label: "Dimensions", value: "Standard size" },
                    { label: "Weight", value: "Lightweight design" },
                    { label: "Origin", value: "Ethically sourced" }
                  ].map((spec, index) => (
                    <div key={index} className="rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 p-6">
                      <dt className="text-sm font-bold text-purple-600 uppercase tracking-wide">{spec.label}</dt>
                      <dd className="mt-2 text-lg font-medium text-gray-900">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductRecs />
      <Footer />
    </div>
  );
}

// ✅ FIXED: Improved error handling and fallback strategy
export async function getStaticPaths() {
  try {
    console.log('🚀 Fetching products for static paths...');
    
    const res = await fetch('https://live-server1.vercel.app/products', {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'NextJS-StaticPaths'
      },
      // ✅ ADDED: Timeout to prevent hanging builds
      signal: AbortSignal.timeout(15000) // 15 second timeout
    });

    if (!res.ok) {
      console.error(`❌ API Error: ${res.status} ${res.statusText}`);
      throw new Error(`Failed to fetch products: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    console.log('📦 API Response received');

    const products = data?.products;

    if (!products || !Array.isArray(products) || products.length === 0) {
      console.warn('⚠ No valid products found, using fallback strategy');
      return { 
        paths: [], 
        fallback: 'blocking' // ✅ CHANGED: Allow runtime generation
      };
    }

    // Filter valid products with IDs
    const validProducts = products.filter(product => 
      product && 
      product.id !== null && 
      product.id !== undefined &&
      String(product.id).trim() !== ''
    );

    console.log(`✅ Found ${validProducts.length} valid products out of ${products.length}`);

    // ✅ IMPROVED: Only pre-generate popular products to reduce build time
    const priorityPaths = validProducts.slice(0, 50).map(product => ({
      params: { id: String(product.id) }
    }));

    console.log(`🎯 Generated ${priorityPaths.length} static paths`);

    return {
      paths: priorityPaths,
      fallback: 'blocking', // ✅ FIXED: Changed from false to blocking
    };

  } catch (error) {
    console.error('💥 getStaticPaths failed:', error.message);
    
    // ✅ CRITICAL: Don't crash the build - return empty paths with fallback
    return {
      paths: [],
      fallback: 'blocking', // ✅ Allow all pages to be generated at runtime
    };
  }
}

// ✅ FIXED: Added retry logic and better error handling
export async function getStaticProps({ params }) {
  const maxRetries = 3;
  let lastError;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`🔍 Attempt ${attempt} for product ${params.id}`);
      
      const res = await fetch(`https://live-server1.vercel.app/products/${params.id}`, {
        headers: {
          'Content-Type': 'application/json',
          'User-Agent': 'NextJS-GetStaticProps'
        },
        // ✅ ADDED: Timeout to prevent hanging requests
        signal: AbortSignal.timeout(10000) // 10 second timeout
      });

      if (!res.ok) {
        if (res.status === 404) {
          console.log(`❌ Product ${params.id} not found (404)`);
          return { notFound: true };
        }
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const product = await res.json();

      // ✅ ADDED: Validate product data
      if (!product || !product.id) {
        console.log(`❌ Invalid product data for ${params.id}`);
        return { notFound: true };
      }

      console.log(`✅ Successfully fetched product ${params.id}`);

      return {
        props: { product },
        revalidate: 3600, // ✅ Regenerate every hour (ISR)
      };

    } catch (error) {
      console.error(`❌ Attempt ${attempt} failed for product ${params.id}:`, error.message);
      lastError = error;
      
      // ✅ ADDED: Wait before retry (exponential backoff)
      if (attempt < maxRetries) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
  }

  console.error(`💥 All attempts failed for product ${params.id}:`, lastError.message);
  return { notFound: true };
}
