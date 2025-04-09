import React from "react";
import { useNavigate } from 'react-router-dom';

const Hero = () => {
    const navigate = useNavigate();

    const handleGrabYoursClick = () => {
        navigate('/products');
    };

    return (
        <div className="relative bg-gray-800 text-white py-38 mx-4 my-4 sm:px-6 lg:px-8 flex items-center justify-center rounded-lg overflow-hidden">
            <div className="text-center max-w-4xl relative z-10">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-wide mb-6">
                    <span className='text-orange-500'>SALE</span> On Everything
                </h1>
                <p className="text-xl sm:text-2xl text-gray-300 mb-8">
                    Massive discounts on all your favorite items-don't miss out!
                </p>
                <button 
                  onClick={handleGrabYoursClick}
                  className="cursor-pointer bg-orange-500 text-white py-4 px-12 rounded-lg font-semibold text-xl hover:bg-orange-600 trasition duration-300">
                    Grab Yours
                </button>
            </div>

            <div className='absolute inset-0 opacity-60'>
                <img 
                  src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
                  alt="Sale Items"
                  className='w-full h-full object-cover'
                />
            </div>
            <div className="absolute inset-0 bg-black opacity-40"></div>
        </div>
    );
};

export default Hero;