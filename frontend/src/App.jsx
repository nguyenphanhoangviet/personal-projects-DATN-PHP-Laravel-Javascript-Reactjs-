import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./components/Home";
import Header from "./components/layouts/Header";
import { Provider } from "react-redux";
import store from "./redux/store";
import Cart from "./components/cart/cart";
import PaymentSuccess from "./components/payments/PaymentSuccess";

import Your_Profile from "./components/users/Your_profile";
import Login from "./components/users/Login";
import Register from "./components/users/Register";
import ForgotPassword from "./components/users/ForgotPassword";
import ResetPassword from "./components/users/ResetPassword";
import Dashboard from "./components/admin/Dashboard";
import ProductFilter from "./components/products/ProductFilter";

axios.defaults.baseURL = "http://localhost:8000/api";
axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`; // JWT setup

export default function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/product_shop" element={<ProductFilter />} />
            <Route
              path="/payment-success/:orderId"
              element={<PaymentSuccess />}
            />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/password/reset/:token/:email"
              element={<ResetPassword />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/your_profile" element={<Your_Profile />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  );
}
