import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; 
import SidebarCategoriesList from "./SidebarCategoriesList";
import SidebarBrandList from "./SidebarBrandList";
import Pagination from "../pagination";
import Product from "./Product";
import Style from "./Style.scss"; 


export default function Index() {
  const [allProducts, setAllProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [sortOption, setSortOption] = useState("Mặc định");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  // Fetch all products if selectedCategory=null, otherwise fetch products and filter by selected category
  const fetchAllProducts = async () => {
    if(selectedCategory === null || selectedBrand === null) {
      try {
        const response = await axios.get('/all_products');
        setAllProducts(response.data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  };

  // Fetch all categories
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get('/all_categories');
      setAllCategories(response.data.categories || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  // Fetch all brands
  const fetchAllBrands = async () => {
    try {
      const response = await axios.get('/all_brands');
      setAllBrands(response.data.brands || []);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  useEffect(() => {
    fetchAllProducts();
    fetchAllCategories();
    fetchAllBrands();
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [selectedCategory, selectedBrand]);

  // Filter products by selected category
  // const filteredProducts = selectedCategory 
  //   ? allProducts.filter(product => {
  //     return product.category_id == selectedCategory
  //   })
  //   : allProducts;

  // Filter products by selected category and brand
  const filteredProducts = selectedCategory || selectedBrand
    ? allProducts.filter(product => {
      product = (product.category_id == selectedCategory || selectedCategory == null) && (product.brand_id == selectedBrand || selectedBrand == null)
      return product
    })
    : allProducts


  // Sort filtered products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "Giá: thấp đến cao":
        return a.price - b.price;
      case "Giá: cao đến thấp":
        return b.price - a.price;
      case "Mới nhất":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "Đánh giá trung bình":
        return b.rating - a.rating; 
      default:
        return 0;
    }
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Sort option change handler
  const handleSortChange = (option) => {
    setSortOption(option);
    setCurrentPage(1);
    setIsDropdownOpen(false);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const getCategoryId = (id) => {
    setSelectedCategory(id);
  }

  const getBrandId = (id) => {
    setSelectedBrand(id);
  }


  return (
    <div className="row flex-row-reverse">
      <div className="col-lg-9">
        <div className="shop-topbar-wrapper">
          <div className="totall-product">
            <p>
              Chúng tôi đã tìm thấy <span>{filteredProducts.length}</span> sản phẩm có sẵn cho bạn
            </p>
          </div>
          <div className="sort-by-product-area">
            <div className="sort-by-product-wrap" onClick={toggleDropdown}>
              <div className="sort-by">
                <span>
                  <i className="far fa-align-left"></i>Sắp xếp theo:
                </span>
              </div>
              <div className="sort-by-dropdown-wrap">
                <span>
                  {sortOption} <i className="far fa-angle-down"></i>
                </span>
              </div>
            </div>
            {isDropdownOpen && (
              <div className="sort-by-dropdown">
                <ul>
                  {["Mặc định", "Phổ biến", "Đánh giá trung bình", "Mới nhất", "Giá: thấp đến cao", "Giá: cao đến thấp"].map(option => (
                    <li key={option}>
                      <a 
                        href="#" 
                        onClick={(e) => { e.preventDefault(); handleSortChange(option); }}
                        className={sortOption === option ? "active" : ""}
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="shop-bottom-area">
          <div className="row">
            {currentProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))}
          </div>
          <Pagination 
            productsPerPage={productsPerPage} 
            totalProducts={filteredProducts.length} 
            paginate={paginate} 
            currentPage={currentPage}
          />        
        </div>
      </div>
      <div className="col-lg-3">
        <div className="sidebar-wrapper sidebar-wrapper-mr1">
        <div className="sidebar-widget sidebar-widget-wrap sidebar-widget-padding-1 mb-20">
      <h4 className="sidebar-widget-title">Danh Mục</h4>
      <div className="sidebar-categories">
        <ul>
          <li>
            <Link
              to="/shop" 
              className={selectedCategory === null ? "active" : ""}
              onClick={() => getCategoryId(null)}
            >
              Tất cả sản phẩm
            </Link>
          </li>
          {allCategories.map((category) => (
            <li key={category.id}>
              <Link
                to="#" 
                onClick={() => getCategoryId(category.id)} 
                className={selectedCategory === category.id ? "active" : ""}
              >
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
    <div className="sidebar-widget sidebar-widget-wrap sidebar-widget-padding-1 mb-20">
        <h4 className="sidebar-widget-title">Brands </h4>
        <div className="sidebar-brand-list">
          <ul>
          <li>
            <Link
              to="/shop" 
              className={selectedBrand === null ? "active" : ""}
              onClick={() => getBrandId(null)} 
            >
              Tất cả thương hiệu
            </Link>
          </li>
          {allBrands.map((brand) => (
            <li key={brand.id}>
              <Link
                to="#" 
                onClick={() => getBrandId(brand.id)} 
                className={selectedBrand === brand.id ? "active" : ""}
              >
                {brand.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
      </div>
        </div>
      </div>
    </div>
  );
}
