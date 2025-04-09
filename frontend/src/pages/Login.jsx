import React, { useState, useEffect } from 'react';
import validator from "validator";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useAuth } from '../context/AuthContext';
import { Lock, Person, Eye, EyeSlash } from 'react-bootstrap-icons';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const navigate = useNavigate();
  const { login, isAuthenticated, loading } = useAuth();

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate('/profile', { replace: true });
    }
  }, [isAuthenticated, loading, navigate]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!validator.isEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/users/register`, { name, email, password });
        if (response.data.success) {
          login(response.data.token, response.data.user);
          toast.success("Sign up successful!");
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/users/login`, { email, password });
        if (response.data.success) {
          login(response.data.token, response.data.user);
          toast.success("Login successful!");
          navigate('/');
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    if (!credentialResponse.credential) {
      toast.error('Google login failed. Please try again.');
      return;
    }

    try {
      const response = await axios.post(`${backendUrl}/api/users/google-login`, {
        token: credentialResponse.credential,
      });
      if (response.data.success) {
        login(response.data.token, response.data.user);
        toast.success("Google login successful!");
        navigate('/');
      } else {
        toast.error(response.data.message || 'Google login failed.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md transform transition-all hover:shadow-2xl duration-300">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 tracking-tight">
            {currentState === 'Login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <form onSubmit={onSubmitHandler}>
            {currentState === 'Sign Up' && (
              <div className="mb-6 relative group">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Name
                </label>
                <div className="relative">
                  <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500" />
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                    required
                  />
                </div>
              </div>
            )}
            <div className="mb-6 relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Person className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="mb-8 relative group">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-purple-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 [appearance:none]" // Added appearance:none
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none bg-transparent p-0 border-0" // Enhanced specificity
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-all duration-300 mb-6 shadow-md hover:shadow-lg"
            >
              {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
            </button>

            <div className="relative flex items-center justify-center mb-6">
              <hr className="w-full border-gray-300" />
              <span className="absolute bg-gray-50 px-3 text-gray-600 text-sm">or</span>
            </div>

            <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
              <div className="w-full mb-6">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={() => toast.error("Google Login failed. Try again.")}
                  text={currentState === 'Login' ? 'continue_with' : 'signup_with'}
                />
              </div>
            </GoogleOAuthProvider>

            <div className="text-center text-sm text-gray-600">
              {currentState === 'Login' ? (
                <p>
                  Don't have an account?{' '}
                  <span
                    onClick={() => setCurrentState('Sign Up')}
                    className="text-purple-600 font-medium cursor-pointer hover:underline"
                  >
                    Sign Up
                  </span>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <span
                    onClick={() => setCurrentState('Login')}
                    className="text-purple-600 font-medium cursor-pointer hover:underline"
                  >
                    Login Here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;