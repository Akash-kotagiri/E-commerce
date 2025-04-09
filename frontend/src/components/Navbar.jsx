import React, { useState } from "react";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { Search, Person, Cart, X, List } from 'react-bootstrap-icons';

const Navbar = () => {
  const NAV_LINKS = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { getCartItemCount } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const toggleSearch = () => {
    if (isSearchOpen && searchQuery.trim()) {
      handleSearchSubmit();
    } else {
      setIsSearchOpen((prev) => !prev);
      if (isSearchOpen) setSearchQuery("");
    }
  };

  const handleProfileClick = () => navigate(isAuthenticated ? '/profile' : '/login');

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 max-w-7xl mx-auto">
          <div className="flex-shrink-0">
            <Link to="/">
              <h1 className="text-2xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 animate-gradient hover:brightness-110 transition-all duration-300">
                QuickShop
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation (Center) */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-600 transition-colors duration-200 ${
                      isActive ? 'font-semibold text-blue-600' : ''
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right Section (Icons) */}
          <div className="flex items-center space-x-6">
            {/* Search */}
            <div className="relative">
              <Search
                className="w-5 h-5 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                onClick={toggleSearch}
              />
              {isSearchOpen && (
                <div className="absolute top-12 w-64 sm:w-72 sm:left-1/2 sm:-translate-x-1/2 md:left-1/2 md:-translate-x-1/2 lg:left-1/2 lg:-translate-x-1/2 bg-white rounded-lg shadow-xl border border-gray-200 p-2 transition-all duration-200 ease-in-out z-50 right-0 sm:right-auto">
                <div className="flex items-center bg-gray-50 rounded-md px-2 py-1">
                  <Search className="w-4 h-4 text-gray-500 mr-2 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent text-sm text-gray-700 placeholder-gray-500 focus:outline-none"
                    autoFocus
                  />
                  <X
                    className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700 ml-2 flex-shrink-0"
                    onClick={toggleSearch}
                  />
                </div>
              </div>
              )}
            </div>

            {/* User Profile */}
            <Person className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600 transition-colors"
                    onClick={handleProfileClick} />

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Cart className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                {getCartItemCount()}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-600 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <List className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-in slide-in-from-right-2">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2 text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-md ${
                    isActive ? 'font-semibold text-blue-600 bg-gray-50' : ''
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default React.memo(Navbar);