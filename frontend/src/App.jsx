import React from 'react'
import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import ProductItem from './pages/ProductItem';
import Products from './pages/Products';
import Searchpage from './pages/SearchPage';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* public Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/products' element={<Products />} />
        <Route path='/product/:id' element={<ProductItem />}/>
        <Route path='/search' element={<Searchpage />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/cart' element={<Cart />}/>

        {/* protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/orders' element={<Orders />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;