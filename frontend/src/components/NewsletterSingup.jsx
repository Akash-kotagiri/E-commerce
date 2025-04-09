import React from "react";
import { toast } from 'react-toastify';

const NewsletterSingup = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Subscribed!');
        e.target.reset();
    };

    return (
        <div className="bg-gray-900 text-white py-12 mx-4 rounded-lg">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
                <p className='text-gray-400 mb-8'>
                    Get the latest updates, exclusive offers, and more!
                </p>
                <form onSubmit={handleSubmit} className="flex justify-center">
                    <input 
                      type="email"
                      placeholder="Enter your email"
                      className="p-3 rounded-lg bg-gray-800 text-white 
                                 placeholder-gray-400 focus:outline-none focus:ring-2
                                 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      className="cursor-pointer bg-blue-600 text-white py-3 px-6 rounded-r-lg
                                 hover:bg-blue-700 transition duration-300">
                        Subscribe
                    </button>
                </form>
            </div>
        </div>
    );
};

export default NewsletterSingup;