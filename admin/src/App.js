import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./components/error/NotFound";
import SideBar from "./components/sideBar";
import Nav from "./components/nav";
import Dashboard from "./components/dashboard";
import Brands from "./components/brands/index.jsx";
import AddBrands from "./components/brands/add.jsx";
import EditBrands from "./components/brands/edit.jsx";
import Categories from "./components/categories/index.jsx";
import AddCategories from "./components/categories/add.jsx";
import EditCategories from "./components/categories/edit.jsx";
import ProductTypes from "./components/productTypes/index.jsx";
import AddProductTypes from "./components/productTypes/add.jsx";
import EditProductTypes from "./components/productTypes/edit.jsx";
import Products from "./components/products/index.jsx";
import AddProducts from "./components/products/add.jsx";
import EditProducts from "./components/products/edit.jsx";
import Roles from "./components/roles/index.jsx";
import AddRoles from "./components/roles/add.jsx";
import EditRoles from "./components/roles/edit.jsx";
import Banners from "./components/banners/index.jsx";
import AddBanners from "./components/banners/add.jsx";
import EditBanners from "./components/banners/edit.jsx";
import CategoriesPosts from "./components/categoriesPost/index.jsx";
import AddCategoryPost from "./components/categoriesPost/add.jsx";
import EditCategoryPost from "./components/categoriesPost/edit.jsx";
import Posts from "./components/posts/index.jsx";
import AddPosts from "./components/posts/add.jsx";
import EditPosts from "./components/posts/edit.jsx";
import Warehouses from "./components/warehouses/index.jsx";
import AddWarehouse from "./components/warehouses/add.jsx";
import EditWarehouse from "./components/warehouses/edit.jsx";
import ViewWarehouse from "./components/warehouses/view.jsx";
import AddProductsWarehouse from "./components/warehouses/add_products_warehouse.jsx";
import AdminLogin from "./components/login/AdminLogin";
import Users from "./components/users/index.jsx";
import Coupons from "./components/coupons/index.jsx";
import AddCoupon from "./components/coupons/add.jsx";
import EditCoupon from "./components/coupons/edit.jsx";
import Comments from "./components/comments/index.jsx";
import Orders from "./components/orders/index.jsx";
import ViewOrder from "./components/orders/view.jsx";

axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem(
  "token"
)}`; // JWT setup

// Main layout wrapper component
const MainLayout = ({ children }) => (
  <div className="layout-wrapper layout-content-navbar">
    <div className="layout-container">
      <SideBar />
      <div className="layout-page">
        <Nav />
        {children}
      </div>
    </div>
    <div className="layout-overlay layout-menu-toggle"></div>
  </div>
);

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/brands"
          element={
            <MainLayout>
              <Brands />
            </MainLayout>
          }
        />
        <Route
          path="/add-brands"
          element={
            <MainLayout>
              <AddBrands />
            </MainLayout>
          }
        />
        <Route
          path="/edit-brands/:id"
          element={
            <MainLayout>
              <EditBrands />
            </MainLayout>
          }
        />

        <Route
          path="/categories"
          element={
            <MainLayout>
              <Categories />
            </MainLayout>
          }
        />
        <Route
          path="/add-categories"
          element={
            <MainLayout>
              <AddCategories />
            </MainLayout>
          }
        />
        <Route
          path="/edit-categories/:id"
          element={
            <MainLayout>
              <EditCategories />
            </MainLayout>
          }
        />

        <Route
          path="/product-types"
          element={
            <MainLayout>
              <ProductTypes />
            </MainLayout>
          }
        />
        <Route
          path="/add-product-types"
          element={
            <MainLayout>
              <AddProductTypes />
            </MainLayout>
          }
        />
        <Route
          path="/edit-product-types/:id"
          element={
            <MainLayout>
              <EditProductTypes />
            </MainLayout>
          }
        />
        <Route
          path="/products"
          element={
            <MainLayout>
              <Products />
            </MainLayout>
          }
        />
        <Route
          path="/add-products"
          element={
            <MainLayout>
              <AddProducts />
            </MainLayout>
          }
        />
        <Route
          path="/edit-products/:id"
          element={
            <MainLayout>
              <EditProducts />
            </MainLayout>
          }
        />
        <Route
          path="/roles"
          element={
            <MainLayout>
              <Roles />
            </MainLayout>
          }
        />
        <Route
          path="/add-roles"
          element={
            <MainLayout>
              <AddRoles />
            </MainLayout>
          }
        />
        <Route
          path="/edit-roles/:id"
          element={
            <MainLayout>
              <EditRoles />
            </MainLayout>
          }
        />
        <Route
          path="/users"
          element={
            <MainLayout>
              <Users />
            </MainLayout>
          }
        />
        <Route
          path="/banners"
          element={
            <MainLayout>
              <Banners />
            </MainLayout>
          }
        />
        <Route
          path="/add-banners"
          element={
            <MainLayout>
              <AddBanners />
            </MainLayout>
          }
        />
        <Route
          path="/edit-banners/:id"
          element={
            <MainLayout>
              <EditBanners />
            </MainLayout>
          }
        />

        <Route
          path="/category_posts"
          element={
            <MainLayout>
              <CategoriesPosts />
            </MainLayout>
          }
        />
        <Route
          path="/add-category_posts"
          element={
            <MainLayout>
              <AddCategoryPost />
            </MainLayout>
          }
        />
        <Route
          path="/edit-category_posts/:id"
          element={
            <MainLayout>
              <EditCategoryPost />
            </MainLayout>
          }
        />

        <Route
          path="/posts"
          element={
            <MainLayout>
              <Posts />
            </MainLayout>
          }
        />
        <Route
          path="/add-post"
          element={
            <MainLayout>
              <AddPosts />
            </MainLayout>
          }
        />
        <Route
          path="/edit-post/:id"
          element={
            <MainLayout>
              <EditPosts />
            </MainLayout>
          }
        />

        <Route
          path="/warehouses"
          element={
            <MainLayout>
              <Warehouses />
            </MainLayout>
          }
        />
        <Route
          path="/add-warehouse"
          element={
            <MainLayout>
              <AddWarehouse />
            </MainLayout>
          }
        />
        <Route
          path="/edit-warehouse/:id"
          element={
            <MainLayout>
              <EditWarehouse />
            </MainLayout>
          }
        />
        <Route
          path="/view-warehouse/:id"
          element={
            <MainLayout>
              <ViewWarehouse />
            </MainLayout>
          }
        />
        <Route
          path="/add-products-warehouse/:warehouseId"
          element={
            <MainLayout>
              <AddProductsWarehouse />
            </MainLayout>
          }
        />

        <Route
          path="/coupons"
          element={
            <MainLayout>
              <Coupons />
            </MainLayout>
          }
        />
        <Route
          path="/add-coupon"
          element={
            <MainLayout>
              <AddCoupon />
            </MainLayout>
          }
        />
        <Route
          path="/edit-coupon/:id"
          element={
            <MainLayout>
              <EditCoupon />
            </MainLayout>
          }
        />

        <Route
          path="/comments"
          element={
            <MainLayout>
              <Comments />
            </MainLayout>
          }
        />

        <Route
          path="/orders"
          element={
            <MainLayout>
              <Orders />
            </MainLayout>
          }
        />

        <Route
          path="/view-order/:order_code"
          element={
            <MainLayout>
              <ViewOrder />
            </MainLayout>
          }
        />

        <Route path="*" element={<NotFound />} /> {/* Trang 404 */}
      </Routes>
    </>
  );
}

export default App;
