import React, { useState, useEffect } from "react";
import BlogItem from "./blogItem";
import Pagination from "../pagination";
import axios from "axios";

export default function Index() {
  const [allPost, setAllPost] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category_id: "", // This should be the filter key for category
    name: "",
    sort_by: "default",
  });
  console.log("🚀 ~ Index ~ filters:", filters)
  
  const [currentPage, setCurrentPage] = useState(1); 
  const [totalPages, setTotalPages] = useState(0); 
  const [totalPosts, setTotalPosts] = useState(0);

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchPosts();
    fetchCategoriesPost();
  }, [filters, currentPage]); // Re-run when filters or currentPage change

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await axios.get("/filter_post", {
        params: { ...filters, page: currentPage },
      });
      setAllPost(response.data.posts.data);
      setTotalPages(response.data.posts.last_page);
      setTotalPosts(response.data.posts.total); 
      setError(null); // Clear error if data is fetched successfully
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoriesPost = async () => {
    try {
      const response = await axios.get("/all_category_posts");
      setCategories(response.data.categoryPosts); // Set categories for the filter dropdown
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const handleCategorySelect = (categoryId) => {
    
    setFilters((prev) => ({ ...prev, category_id: categoryId }));
    setCurrentPage(1); // Reset to the first page when category changes
  };

  const handlePageChange = (page) => {
    setCurrentPage(page); // Update the current page
  };

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  return (
    <div className="blog-area pt-75 pb-75">
      <div className="container">
        <div className="shop-topbar-wrapper">
          <div className="totall-product">
            <p>
              Chúng tôi đã tìm thấy <span>{totalPosts}</span> sản phẩm có sẵn cho bạn
            </p>
          </div>
          <div className="sort-by-product-area d-flex">
            <div className="sort-by-product-wrap mr-4">
              <div className="sort-by">
                <span>
                  <i className="far fa-align-left"></i>Lọc theo danh mục:
                </span>
              </div>
              <div className="sort-by-dropdown-wrap">
                <select
                  name="category_id"
                  onChange={(e) => handleCategorySelect(e.target.value)}
                  value={filters.category_id} // Ensure the selected category is reflected
                >
                  <option value="">Tất cả danh mục</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name} {/* Assuming 'name' is the category name */}
                    </option>
                  ))}
                </select>
              </div>
            </div>
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
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className="row grid">
          {allPost.length > 0 ? (
            allPost.map((post) => <BlogItem key={post.id} post={post} />)
          ) : (
            <p>No posts found for the selected filter.</p>
          )}
        </div>

        {/* Pagination */}
        {totalPosts > 0 && totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}
