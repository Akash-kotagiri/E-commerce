import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity > 5) {
      toast.error('Maximum quantity per product is 5');
      return;
    }
    updateQuantity(productId, newQuantity);
  };

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="flex justify-center mt-4 text-2xl font-bold mb-6">Your Cart</h1>
        {!cart || Object.keys(cart).length === 0 ? (
          <div className="flex items-center justify-center">
            <p>
              Your cart is empty. <Link to="/products" className="text-blue-500">Shop now</Link>
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {Object.entries(cart).map(([productId, item]) => (
                <div key={productId} className="flex items-center justify-between p-4 border rounded-lg">
                  <img
                    src={item.thumbnail || 'https://via.placeholder.com/64'}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="font-semibold">{item.title}</h2>
                    <p className="text-gray-600">${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(productId, parseInt(e.target.value, 10))}
                      className="w-16 p-2 border rounded"
                      min="1"
                    />
                    <button
                      onClick={() => removeFromCart(productId)}
                      className="cursor-pointer text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <h2 className="text-xl font-bold">Cart Total: <span className='text-blue-500'>${getCartTotal().toFixed(2)}</span></h2>
              <Link to="/orders">
                <button className="cursor-pointer mt-4 w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;