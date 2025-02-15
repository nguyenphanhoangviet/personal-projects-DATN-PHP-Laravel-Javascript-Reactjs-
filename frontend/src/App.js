import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux'; 
import store from './redux/store';

import axios from "axios"; // Nhập axios
import Header from "./components/user/header";
import { SearchPopup, MobileHeaderMenu } from "./components/user/common";
import Breadcrumb from "./components/user/breadcrumb";
import Footer from "./components/user/footer";
import NotFound from "./components/user/error/NotFound";
import Home from "./pages/user/home";
import About from "./pages/user/about";
import Shop from "./pages/user/shop";
import Blog from "./pages/user/blog";
import Contact from "./pages/user/contact";
import Cart from "./pages/user/cart";
import LoginAndRegister from "./pages/user/loginAndRegister";
import ProductDetail from "./pages/user/productDetail";
import BoxChat from "./components/user/boxChat";
import LuckyWheel from "./components/user/luckyWheel";

import { useEffect } from "react";
import PaymentSuccess from "./components/user/payments/PaymentSuccess";

import UserProfile from "./pages/user/UserProfile";

import './assets/css/vendor/bootstrap.min.css';
import './assets/css/vendor/font-cerebrisans.css';
import './assets/css/vendor/fontawesome-all.min.css';
import './assets/css/vendor/font-medizin.css';
import './assets/css/plugins/slick.css'; 
import './assets/css/plugins/animate.css';
import './assets/css/plugins/magnific-popup.css';
import './assets/css/plugins/select2.min.css';
import './assets/css/plugins/jquery-ui.css';
import './assets/css/style.css';
import './assets/css/button.css';
import './assets/css/index.css';
import Wishlist from "./components/user/wishlist";


const backendUrl = process.env.REACT_APP_BACKEND_URL;



// Thiết lập baseURL cho axios
axios.defaults.baseURL = "http://127.0.0.1:8000/api";

// Thiết lập headers mặc định
axios.defaults.headers.common["Authorization"] = "Bearer YOUR_TOKEN_HERE"; 
axios.defaults.headers.common["Content-Type"] = "application/json"; 

const MainLayout = ({ children }) => (
  <div className="main-wrapper">
    {/* <Header /> */}
    <Breadcrumb />
    {children}
    <Footer />
    <SearchPopup />
    <BoxChat />
    <LuckyWheel />
  </div>
);

function App() {
  
  return (
    <Provider store={store}> {/* Bọc ứng dụng trong Provider */}
       <Header />
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/about"
          element={
            <MainLayout>
              <About />
            </MainLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <MainLayout>
              <Shop />
            </MainLayout>
          }
        />
        <Route
          path="/blog"
          element={
            <MainLayout>
              <Blog />
            </MainLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />
        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <Wishlist />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/login-register"
          element={
            <MainLayout>
              <LoginAndRegister />
            </MainLayout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <MainLayout>
              <UserProfile />
            </MainLayout>
          }
        />
        <Route
          path="/product-detail/:slug/:id"
          element={

            <MainLayout>
              <ProductDetail />
            </MainLayout>
          }
        />
        <Route path="/payment/success" element={
           <MainLayout>
           <PaymentSuccess />
         </MainLayout>
        } />
        <Route path="*" element={<NotFound />} /> {/* Trang 404 */}
      </Routes>
      <div className="mobile">
        <MobileHeaderMenu />
      </div>
    </Provider>
  );
}

export default App;
