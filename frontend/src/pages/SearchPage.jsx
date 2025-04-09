import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import OurPolicy from "../components/OurPolicy";
import NewsletterSingup from "../components/NewsletterSingup";

const Searchpage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`https://dummyjson.com/products/search?q=${query}`);
                const data = await response.json();
                setProducts(data.products);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching search results:', error);
                setLoading(false);
            }
        };

        if(query) {
            fetchProducts();
        }
    }, [query]);

    const handleAddToCart = (product) => {
        addToCart(product, 1);
    };

    if(loading) {
        return <div className="text-center mt-8">Loading search results...</div>
    }

    return (
        <>
         <Navbar />
         <div className="p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Search Results for "{query}"</h1>
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="flex flex-col flex-grow cursor-pointer"
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-4 flex-grow">{product.description}</p>
                    <p className="text-lg font-bold text-blue-800 mb-4">${product.price}</p>
                  </div>
                </div>
                <div className="p-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart(product); 
                    }}
                    className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products found for "{query}".</p>
        )}
        </div>
          <OurPolicy />
          <NewsletterSingup />
          <Footer />
        </>
    );
};

export default Searchpage;