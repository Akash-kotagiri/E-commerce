import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';
import { useAuth } from './AuthContext';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const { isAuthenticated } = useAuth();
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchCartData = async () => {
        try {
            const token = localStorage.getItem('token');
            if(!token) throw new Error('No token found');
            const response = await axios.get(`${backendUrl}/api/cart`,{
                headers: { Authorization: `Bearer ${token}` },
            });
            const cartData = response.data.cartData || {};
            const enrichedCart = await enrichCartWithProductDetails(cartData);
            setCart(enrichedCart);
        } catch (error) {
            setCart({});
        }
    };

    useEffect(() => {
        if(isAuthenticated) {
            fetchCartData();
        } else {
            setCart({});
        }
    }, [isAuthenticated]);

    const enrichCartWithProductDetails = async (cartData) => {
        const productIds = Object.keys(cartData);
        if (productIds.length === 0) return {};
        try {
            const response = await axios.get("https://dummyjson.com/products", {
                params: { limit: 0, select: 'id,title,price,thumbnail' },
            });
            const products = response.data.products;
            const enriched = {};
            productIds.forEach((id) => {
                const product = products.find((p) => p.id.toString() === id.toString());
                enriched[id] = {
                    quantity: cartData[id],
                    price: product ? product.price : 0,
                    title: product ? product.title : 'Unknown Product',
                    thumbnail: product ? product.thumbnail : 'http://via.placeholder.com/64',
                };
            });
            return enriched;
        } catch (error) {
            const fallback = {};
            productIds.forEach((id) => {
                fallback[id] = {
                    quantity: cartData[id],
                    price: 0,
                    title: 'Unknown Product',
                    thumbnail: 'http://via.placeholder.com/64',
                };
            });
            return fallback;
        }
    };

    const addToCart = async (product, quantity) => {
        if(!isAuthenticated) {
            toast.error('Please log in to add items to your cart');
            return;
        }
        try {
            const token = localStorage.getItem('token');
            const payload = { productId: product.id, quantity: quantity || 1 };
            const response = await axios.post(`${backendUrl}/api/cart/add`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                await fetchCartData();
                toast.success('Item added to cart!');
            }
        } catch (error) {
            toast.error('Failed to add item to cart');
        }
    };

    const removeFromCart = async (productId) => {
        if(!isAuthenticated) return;

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/cart/remove`,{ productId }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if(response.data.success){
                await fetchCartData();
                toast.success('Item removed from cart!');
            }
        } catch (error) {
            toast.error('Failed to remove item from cart');
        }
    };

    const updateQuantity = async (productId, quantity) => {
        if (!isAuthenticated) return;
        
        try {
            const token = localStorage.getItem('token');
            const response = await axios.post(`${backendUrl}/api/cart/update`,{ productId, quantity }, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if(response.data.success) {
                const enrichedCart = await enrichCartWithProductDetails(response.data.cartData);
                setCart(enrichedCart);
            }
        } catch (error) {
            toast.error('Failed to udpate cart');
        }
    };

    const getCartItemCount = () => {
        return Object.values(cart).reduce((total, item) => total + (item.quantity || 0), 0);
    };

    const getCartTotal = () => {
        return Object.values(cart).reduce(
            (total, item) => total + (item.price || 0) * (item.quantity || 0),
            0
        );
    };

    return (
        <CartContext.Provider
            value={{
                cart, addToCart, removeFromCart, updateQuantity, getCartItemCount,
                getCartTotal,fetchCartData
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);