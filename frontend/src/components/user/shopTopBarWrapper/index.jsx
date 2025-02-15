import React, { useState, useEffect } from "react";
import axios from "axios";
import Product from "./Product";
import Pagination from "../pagination";
import SidebarBrandList from "../shopBottomBarWrapper/SidebarBrandList";
import SidebarCategoriesList from "../shopBottomBarWrapper/SidebarCategoriesList";
import PriceFilter from "../shopBottomBarWrapper/PriceFilter";
import SlidebarProductContent from "../shopBottomBarWrapper/SlidebarProductContent";

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand_id: "",
    category_id: "",
    price: "",
    sort_by: "default",
  });
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const [totalProducts, setTotalProducts] = useState(0); 
  useEffect(() => {
    fetchProducts();
  }, [filters, currentPage]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/filter", {
        params: { ...filters, page: currentPage },
      });
      setProducts(response.data.products.data);
      setTotalPages(response.data.pagination.last_page);
      setTotalProducts(response.data.pagination.total); // Update total products count
      setError(null); // Clear error on success
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleCategorySelect = (categoryId) => {
    setFilters((prev) => ({ ...prev, category_id: categoryId }));
    setCurrentPage(1);
  };

  const handleBrandSelect = (brandId) => {
    setFilters((prev) => ({ ...prev, brand_id: brandId }));
    setCurrentPage(1); // Reset to the first page when the brand filter changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <>
      <div className="col-lg-9">
        <div className="shop-topbar-wrapper">
          <div className="totall-product">
            <p>
              Chúng tôi đã tìm thấy <span>{totalProducts}</span> sản phẩm có sẵn
              cho bạn
            </p>
          </div>
          <div className="sort-by-product-area">
            <div className="sort-by-product-wrap">
              <div className="sort-by">
                <span>
                  <i className="far fa-align-left"></i>Sắp xếp theo:
                </span>
              </div>
              <div className="sort-by-dropdown-wrap">
                <select name="sort_by" onChange={handleFilterChange} value={filters.sort_by}>
                  <option value="default">Mặc định</option>
                  <option value="Sort_A_Z">Sắp xếp A-Z</option>
                  <option value="Sort_Z_A">Sắp xếp Z-A</option>
                  <option value="newest">Mới nhất</option>
                  <option value="ASC">Giá: thấp đến cao</option>
                  <option value="DESC">Giá: cao đến thấp</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="shop-bottom-area">
          {loading && <p>Loading products...</p>}
          {error && <p className="error-message">{error}</p>}
          {!loading && !products.length && (
            <p>No products found for your filters.</p>
          )}
          <div className="row">
            {products.map((product, index) => (
              <Product key={index} product={product} />
            ))}
          </div>
          {totalProducts > 0 && totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
      <div className="col-lg-3">
        <div className="sidebar-wrapper sidebar-wrapper-mr1">
          <SidebarCategoriesList onCategorySelect={handleCategorySelect} />
          <SidebarBrandList onBrandSelect={handleBrandSelect} />{" "}
          {/* Pass handleBrandSelect here */}
          {/* <PriceFilter /> */}
          {/* Uncomment if needed */}
          {/* <SidebarRatingList /> */}
          {/* <SidebarColorList /> */}
          {/* <SlidebarProductContent /> */}
        </div>
      </div>
    </>
  );
}
