import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../components/Navbar";
import Collections from "../components/Collections";
import OurPolicy from "../components/OurPolicy";
import NewsletterSingup from "../components/NewsletterSingup";
import Footer from "../components/Footer";

const ProductItem = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    useEffect(() => {
        axios.get(`https://dummyjson.com/products/${id}`)
        .then((response) => setProduct(response.data))
        .catch((error) => console.error('Error fetching product details:', error));
    }, [id]);

    const handleAddToCart = () => {
        if (product) {
            addToCart(product, quantity);
        }
    };

    if(!product) {
        return <div>Loading...</div>
    }

    return (
        <>
         <Navbar />
         <div className="p-6">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
           <div className="md:flex">
            <div className="md:flex-shrink-0">
             <img src={product.thumbnail} alt={product.title}
                  className="w-full h-64 object-cover md:w-64" />
            </div>
            <div className="p-8">
             <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
             <p className="text-gray-600 text-sm mb-4">{product.description}</p>
             <p className="text-lg font-bold text-blue-600 mb-4">${product.price}</p>
             <div className="flex items-center mb-4">
                <span className="text-yellow-500 text-lg">★</span>
                <span className="ml-1 text-gray-700">{product.rating}</span>
             </div>
             <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input type="number" id="quantity" name="quantity" value={quantity}
                     onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                     className="mt-1 block w-20 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 sm:text-sm"
                     min="1" />
             </div>
             <button className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                     onClick={handleAddToCart}>
                Add to Cart
             </button>
            </div>
           </div>
          </div>
         </div>
         <Collections />
         <OurPolicy />
         <NewsletterSingup />
         <Footer />
        </>
    );
};

export default ProductItem;