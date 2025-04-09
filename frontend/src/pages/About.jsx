import React from 'react';
import Layout from '../components/Layout';

const About = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Quick Shop</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted partner for fast, affordable, and high-quality online shopping.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Our Story */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2 inline-block">
            Our Story
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            Founded in 2025, Quick Shop emerged from a vision to redefine online shopping. We believe that convenience, quality, and affordability should go hand in hand. From cutting-edge gadgets to everyday essentials, our curated selection is designed to meet your needs with efficiency and excellence. At Quick Shop, we’re more than a store—we’re a solution for modern living.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-6 border-b-2 border-blue-600 pb-2 inline-block">
            Our Mission
          </h2>
          <p className="text-gray-700 leading-relaxed max-w-3xl">
            We strive to provide an exceptional shopping experience by offering a diverse range of premium products at competitive prices. Our commitment to rapid delivery and outstanding customer support ensures that every interaction with Quick Shop is seamless and satisfying. Your time and trust are our top priorities.
          </p>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-gray-900 mb-8 text-center">Why Choose Quick Shop?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Efficiency First</h3>
              <p className="text-gray-600">
                Experience a streamlined shopping process with swift delivery tailored to your schedule.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Value</h3>
              <p className="text-gray-600">
                Access premium products at prices that respect your budget, every time.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Trusted Quality</h3>
              <p className="text-gray-600">
                Every item is carefully selected to deliver reliability and satisfaction you can count on.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center bg-blue-50 py-12 rounded-lg">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
            Start Your Shopping Journey
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join a growing community of satisfied customers who rely on Quick Shop for smarter, faster online shopping.
          </p>
          <a
            href="/products"
            className="inline-block bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Explore Products
          </a>
        </section>
      </div>
    </Layout>
  );
};

export default About;