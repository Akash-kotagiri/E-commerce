import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ClipLoader, SyncLoader } from 'react-spinners';
import Layout from '../components/Layout';

// Constants
const PRODUCTS_PER_LOAD = 12;
const MINIMUM_LOADING_TIME = 2000; // 2 seconds

const Products = () => {
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  // Memoized fetch function
  const fetchProducts = useCallback(async () => {
    const startTime = Date.now();
    try {
      const response = await fetch(
        `https://dummyjson.com/products?skip=${skip}&limit=${PRODUCTS_PER_LOAD}`
      );
      const data = await response.json();
      
      const elapsedTime = Date.now() - startTime;
      const delay = Math.max(0, MINIMUM_LOADING_TIME - elapsedTime);

      setTimeout(() => {
        setProducts((prev) => [...prev, ...data.products]);
        setLoading(false);
      }, delay);
    } catch (error) {
      console.error('Error fetching products:', error);
      setTimeout(() => setLoading(false), MINIMUM_LOADING_TIME - (Date.now() - startTime));
    }
  }, [skip]);

  // Fetch products on skip change
  useEffect(() => {
    setLoading(true);
    fetchProducts();
  }, [fetchProducts]);

  // Event handlers
  const handleAddToCart = (product) => addToCart(product, 1);
  const handleLoadMore = () => setSkip((prev) => prev + PRODUCTS_PER_LOAD);

  // Render rating stars
  const renderRatingStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}
      >
        ★
      </span>
    ));
  };

  // Initial loading state
  if (loading && skip === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <ClipLoader color="black" size={40} />
        <p className="mt-4 text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <Layout>
      <header className="bg-blue-600 text-white py-6 text-center shadow-md">
        <h2 className="text-2xl font-bold">Discover Our Products Today!</h2>
        <p className="text-sm">Save big with our ongoing sale—up to 50% off!</p>
      </header>

      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              <Link to={`/product/${product.id}`} className="flex flex-col flex-grow">
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl font-bold text-blue-600">${product.price}</span>
                    <div className="flex items-center">
                      {renderRatingStars(product.rating)}
                      <span className="ml-1 text-xs text-gray-500">({product.rating})</span>
                    </div>
                  </div>
                </div>
              </Link>
              <div className="px-4 pb-4">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            disabled={loading}
            className="cursor-pointer bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <>
                <SyncLoader color="#ffffff" size={10} margin={4} />
                <span className="ml-2">Loading...</span>
              </>
            ) : (
              'Load More'
            )}
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default Products;