import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const Collections = () => {
    const [products, setProducts] = useState([]);
    const { addToCart } = useCart();
    
    useEffect(() => {
        axios.get('https://dummyjson.com/products?limit=8&skip=4')
        .then(response => {
            setProducts(response.data.products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });
    },[]);

    const handleAddToCart = (product) => {
        if(product) { 
            addToCart(product, 1);
        }
    }

    const renderRatingStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if(i <= Math.round(rating)) {
                stars.push(<span key={i} className="text-yellow-500">★</span>);
            }else {
                stars.push(<span key={i} className="text-gray-300">★</span>);
            }
        }
        return stars;
    }

    return (
        <div className="p-4 min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-8">Product Collections</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map(product => (
                    <div 
                    key={product.id}
                    className="border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                        <Link to={`products/${product.id}`} className="flex flex-col flex-grow">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="w-full h-48 object-cover"
                            />
                          <div className="p-4 flex flex-col flex-grow">
                            <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                            <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
                            <p className="text-lg font-bold text-blue-600 mb-2">${product.price}</p>
                          </div>
                          <div className="flex items-center mb-4">
                            <div className="flex">
                                {renderRatingStars(product.rating)}
                            </div>
                            <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                          </div>
                        </Link>
                        <div className="p-4">
                            <button
                              onClick={() => handleAddToCart(product)}
                              className="cursor-pointer w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Collections;