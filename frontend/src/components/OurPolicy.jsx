import React from "react";
import { ArrowRepeat, CheckCircle, Headset } from 'react-bootstrap-icons';

const OurPolicy = () => {
    return (
        <div className="flex flex-col sm:flex-row justify-around gap-2 sm:gap-2 text-center py-16 text-xs sm:text-sm md:text-base text-gray-700">
            <div>
                <ArrowRepeat className="w-12 h-12 m-auto"/>
                <p className="mt-5 font-semibold">Easy Exchange Policy</p>
                <p className="text-gray-400">We offer hassle free exchange policy</p>
            </div>
            <div>
                <CheckCircle className="w-12 h-12 m-auto"/>
                <p className="mt-5 font-semibold">7 Days Return Policy</p>
                <p className="text-gray-400">We provide 7 days free return policy</p>
            </div>
            <div>
                <Headset className="w-12 h-12 m-auto"/>
                <p className="mt-5 font-semibold">Best customer support</p>
                <p className="text-gray-400">We provide 24/7 customer support</p>
            </div>
        </div>
    )   
};

export default OurPolicy;