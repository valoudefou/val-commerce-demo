import { useState, useEffect } from 'react'; // Import useState and useEffect hooks
import Navbar from '../../components/Navbar';
import ProductCard from '../../components/ProductCard';
import Footer from '../../components/Footer';
import Link from 'next/link';

export default function CategoryPage({ products, categories, category }) {
    const [selectedCategory, setSelectedCategory] = useState(''); // Define the selectedCategory state

    // Set the selected category on page load
    useEffect(() => {
        setSelectedCategory(category); // Set the selected category when the component mounts
    }, [category]);

    // Filter products based on the selected category, or show all if no category is selected
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
                            <Link href={`/categories/${categoryItem}`} key={categoryItem}>
                                <p
                                    className={`px-4 py-2 text-sm font-medium rounded-3xl border transition ${
                                        selectedCategory === categoryItem
                                            ? 'bg-black text-white border-black'
                                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                                    }`}
                                    onClick={() => setSelectedCategory(categoryItem)} // Set selected category when clicked
                                >
                                    {categoryItem}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {displayedProducts.map((product) => (
                        <ProductCard product={product} key={product.id} />
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
}

export async function getStaticPaths() {
    // Fetch all products to extract unique categories
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();
    const categories = Array.from(new Set(data.products.map((product) => product.category)));

    // Add a path for each category
    const paths = categories.map((category) => ({
        params: { category },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
    const { category } = params;

    // Fetch all products
    const res = await fetch('https://dummyjson.com/products?limit=0');
    const data = await res.json();

    // If category is selected, filter products based on the category
    const filteredProducts = category
        ? data.products.filter((product) => product.category === category)
        : data.products;

    const categories = Array.from(new Set(data.products.map((product) => product.category)));

    return {
        props: {
            category,
            products: filteredProducts,
            categories,  // Pass categories to the page component
        },
    };
}
