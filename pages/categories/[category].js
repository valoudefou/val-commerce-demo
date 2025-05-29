import { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CategoryPage({ products, categories, category }) {
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        setSelectedCategory(category || '');
    }, [category]);

    const displayedProducts = selectedCategory
        ? products.filter((product) => product.category === selectedCategory)
        : products;

    return (
        <>
            <Navbar />
            <div className="py-12 mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8 mb-24 min-h-screen">
                {/* Category Filter */}
                <div className="mb-8">
                    <div className="flex flex-wrap gap-3">
                        {categories.map((categoryItem) => (
                            <Link href={`/categories/${categoryItem}`} key={categoryItem} passHref>
                                <p
                                    className={`cursor-pointer px-4 py-2 text-sm font-medium rounded-3xl border transition ${
                                        selectedCategory === categoryItem
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedCategory(categoryItem)}
                                >
                                    {categoryItem}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {displayedProducts.length > 0 ? (
                        displayedProducts.map((product) => (
                            <ProductCard product={product} key={product.id} />
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    try {
        const res = await fetch('https://live-server1.vercel.app/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        // Ensure data.products is an array
        if (!data?.products || !Array.isArray(data.products)) {
            return { paths: [], fallback: false };
        }

        const categories = Array.from(
            new Set(data.products.map((product) => product.category).filter(Boolean))
        );

        const paths = categories.map((category) => ({
            params: { category },
        }));

        return { paths, fallback: false };
    } catch (error) {
        console.error('Error in getStaticPaths:', error);
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({ params }) {
    try {
        const category = params?.category || '';

        const res = await fetch('https://live-server1.vercel.app/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();

        if (!data?.products || !Array.isArray(data.products)) {
            return { notFound: true };
        }

        // Filter products by category safely
        const filteredProducts = category
            ? data.products.filter((product) => product.category === category)
            : data.products;

        // If no products for this category, return 404 to avoid build errors
        if (category && filteredProducts.length === 0) {
            return { notFound: true };
        }

        const categories = Array.from(
            new Set(data.products.map((product) => product.category).filter(Boolean))
        );

        return {
            props: {
                category,
                products: filteredProducts,
                categories,
            },
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return { notFound: true };
    }
}
