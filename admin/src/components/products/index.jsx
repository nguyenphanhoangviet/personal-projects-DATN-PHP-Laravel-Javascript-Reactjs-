import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "datatables.net-dt/css/dataTables.dataTables.css";
import $ from "jquery";
import "datatables.net";

const Products = () => {
  // const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        // Fetch categories
        // const categoryRes = await axios.get(
        //   "http://localhost:8000/api/categories/index",
        //   {
        //     headers: { Authorization: `Bearer ${token}` },
        //   }
        // );
        // setCategories(categoryRes.data.data);

        // Fetch brands
        const brandRes = await axios.get(
          "http://localhost:8000/api/brands/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBrands(brandRes.data.data);

        // Fetch product types
        const productTypeRes = await axios.get(
          "http://localhost:8000/api/product_types/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProductTypes(productTypeRes.data.data);
        const response = await axios.get(
          "http://localhost:8000/api/products/index",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts(response.data.data); // Assuming the response structure
      } catch (error) {
        setError("Đã có lỗi xảy ra khi lấy danh sách sản phẩm!");
        console.error(
          "Lỗi khi lấy dữ liệu:",
          error.response ? error.response.data : error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (!loading && products.length > 0) {
      // Kiểm tra nếu DataTable đã được khởi tạo trước đó
      if ($.fn.DataTable.isDataTable("#myTable")) {
        $("#myTable").DataTable().clear().destroy(); // Phá hủy DataTable trước khi khởi tạo lại
      }

      // Khởi tạo lại DataTable
      $("#myTable").DataTable({
        paging: true,
        searching: true,
      });
    }
  }, [loading, products]);

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xóa sản phẩm này không?"
    );
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:8000/api/products/destroy/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      setError("Đã có lỗi xảy ra khi xóa sản phẩm!");
      console.error(
        "Lỗi khi xóa:",
        error.response ? error.response.data : error.message
      );
    }
  };

  if (loading) {
    return <div>Đang tải danh sách sản phẩm...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-header">Danh sách sản phẩm</h5>
          <Link to="/add-products">
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm sản phẩm
            </button>
          </Link>
        </div>

        <div className="table-responsive text-nowrap">
          <table id="myTable" className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Slug</th>
                <th>Giá gốc</th>
                <th>Giá</th>
                <th>Thương hiệu</th>
                <th>Dạnh mục</th>
                <th>Dạng sản phẩm</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>
                    {product.image ? (
                      // Nếu có ảnh, kiểm tra loại URL
                      product.image.includes("http") ? (
                        <img
                          src={product.image} // Trường hợp URL đầy đủ
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src={`http://localhost:8000/assets/uploads/product/${product.image}`} // Trường hợp đường dẫn tương đối
                          alt={product.name}
                          style={{
                            width: "50px",
                            height: "50px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      )
                    ) : (
                      // Nếu không có ảnh
                      <p>Image not found</p>
                    )}

                    {/* Hiển thị tên thương hiệu */}
                    {product.name}
                  </td>
                  <td>{product.slug}</td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(product.price_cost)}
                  </td>
                  <td>
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                      maximumFractionDigits: 0,
                    }).format(product.price)}
                  </td>
                  <td>
                    {brands.find((brand) => brand.id === product.brand_id)
                      ?.name || "Chưa phân loại"}
                  </td>
                  <td>
                    {product.category_product.length > 0
                      ? product.category_product
                          .map((category) => category.name)
                          .join(", ")
                      : "Chưa phân loại"}
                  </td>
                  <td>
                    {productTypes.find(
                      (product_type) =>
                        product_type.id === product.product_type_id
                    )?.name || "Chưa phân loại"}
                  </td>

                  <td>
                    <span
                      className={`badge ${
                        product.status
                          ? "bg-label-primary"
                          : "bg-label-secondary"
                      }`}
                    >
                      {product.status ? "Hoạt động" : "Ngưng hoạt động"}
                    </span>
                  </td>
                  <td>
                    <div>
                      <Link
                        className="btn btn-sm btn-outline-primary me-2"
                        to={`/edit-products/${product.id}`}
                      >
                        <i
                          className="bx bx-edit-alt me-1"
                          style={{ color: "blue" }}
                        ></i>
                        Sửa
                      </Link>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <i
                          className="bx bx-trash me-1"
                          style={{ color: "red" }}
                        ></i>
                        Xóa
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products;
