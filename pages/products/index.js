import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import Navbar from '../../components/Navbar';

export default function Index({ products }) {
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = Array.from(new Set(products.products.map((product) => product.category)));
    const filteredProducts = selectedCategory
    ? products.products.filter((product) => product.category === selectedCategory)
    : products.products;

    return (
        <>
        <Navbar />
        <div className="py-24 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24">
            {/* Category Filter */}
            <div className="mb-8">
                <div className="flex flex-wrap gap-4">
                    <button
                        className={`px-4 py-2 text-sm font-medium rounded-3xl border transition ${
                            selectedCategory === ''
                            ? 'bg-black text-white border-black'
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                        }
                        `}
                        onClick={() => setSelectedCategory('')}
                        >
                        All Categories
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                                className={`px-4 py-2 text-sm font-medium rounded-3xl border transition ${
                                    selectedCategory === category
                                    ? 'bg-black text-white border-black'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                }
                                `}
                                onClick={() => setSelectedCategory(category)}
                            >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            {/* Product Grid */}
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {filteredProducts.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </div>
        </div>
        </>
    );
}

export async function getStaticProps() {
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();
    
    return {
        props: {
            products: data,
        },
    };
}