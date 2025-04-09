import React, { useState } from 'react';
import Layout from '../components/Layout';
import { toast } from 'react-toastify';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thanks for your feedback!');
    setFormData({ name: '', email: '', message: '' }); // reset form
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 mt-4 sm:px-6 lg:px-8">
        <div className="max-w-8xl mx-auto rounded-lg  p-6 flex flex-col md:flex-row">
          {/* Left Side - Image */}
          <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
              alt="Contact Us Illustration"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Right Side - Form and Contact Info */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact Us</h1>
            <p className="text-gray-700 mb-6">
              Have questions or feedback? We'd love to hear from you! Fill out the form below, and we'll get back to you as soon as possible.
            </p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Enter your message"
                  required
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="cursor-pointer w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Our Contact Information</h2>
              <div className="space-y-2 text-gray-700">
                <p><span className="font-semibold">Email:</span> support@quickshopecommerce.com</p>
                <p><span className="font-semibold">Phone:</span> +1 (123) 456-7890</p>
                <p><span className="font-semibold">Address:</span> 123 Main Street, City, Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;