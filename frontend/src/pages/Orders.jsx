import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { cart, getCartTotal, fetchCartData } = useCart();
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    phone: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(cart).length === 0) {
      toast.error('Cart is empty!');
      return;
    }

    const orderData = {
      items: Object.entries(cart).map(([id, item]) => ({
        productId: id,
        quantity: item.quantity,
        price: item.price,
        title: item.title,
      })),
      total: getCartTotal(),
      address,
      paymentMethod: 'cash',
      status: 'Pending',
    };

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found');

      const orderResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/orders/create`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const clearResponse = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/clear`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchCartData();

      toast.success('Order placed! Thanks for shopping');
      setOrderPlaced(orderResponse.data.order);
    } catch (error) {
      console.error('Order placement error:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
  };

  const BackToHomeButton = () => (
    <button
      onClick={() => navigate('/')}
      className="cursor-pointer w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 font-medium"
    >
      Back to Home
    </button>
  );

  if (orderPlaced) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Order Confirmation</h1>
        <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
          <p className="text-green-600 font-semibold text-center">Order placed successfully!</p>
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Shipping Address</h3>
            <p>{orderPlaced.address.name}</p>
            <p>{orderPlaced.address.street}, {orderPlaced.address.city}, {orderPlaced.address.state} {orderPlaced.address.zip}</p>
            <p>Phone: {orderPlaced.address.phone}</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Order Details</h3>
            {orderPlaced.items.map(item => (
              <p key={item.productId}>{item.title} - Qty: {item.quantity} - <span className='text-blue-500'>${item.price.toFixed(2)}</span></p>
            ))}
            <p className="font-bold">Total: <span className='text-blue-500'>${orderPlaced.total.toFixed(2)}</span></p>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Status</h3>
            <p>Cash on Delivery</p>
            <p>Order Status: {orderPlaced.status}</p>
            <p>Estimated Delivery: {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString()}</p>
          </div>
          <BackToHomeButton />
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="name" placeholder="Full Name" value={address.name} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input type="text" name="street" placeholder="Street Address" value={address.street} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input type="text" name="city" placeholder="City" value={address.city} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input type="text" name="state" placeholder="State" value={address.state} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input type="text" name="zip" placeholder="ZIP Code" value={address.zip} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />
            <input type="text" name="phone" placeholder="Phone Number" value={address.phone} onChange={handleInputChange} className="w-full p-2 border rounded-lg" required />

            <p className="text-gray-600">Payment: Cash on Delivery</p>
            <button type="submit" className="cursor-pointer w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300 font-medium">
              Place Order
            </button>
          </form>
        </div>

        <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          {Object.keys(cart).length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {Object.entries(cart).map(([id, item]) => (
                <div key={id} className="flex items-center gap-4 border-b pb-4">
                  <img src={item.thumbnail} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-gray-600">Qty: {item.quantity}</p>
                    <p className="text-gray-600">${item.price} x {item.quantity} = <span className='text-blue-500'>${(item.price * item.quantity).toFixed(2)}</span></p>
                  </div>
                </div>
              ))}
              <p className="text-xl font-bold mt-4">Total: <span className='text-blue-500'>${getCartTotal().toFixed(2)}</span></p>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <BackToHomeButton />
      </div>
    </div>
  );
};

export default Orders;