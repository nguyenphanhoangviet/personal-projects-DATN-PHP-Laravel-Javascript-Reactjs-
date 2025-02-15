import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddProductsWarehouse = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({ product_id: "", quantity: 1 });
  const [error, setError] = useState(null);
  const { warehouseId } = useParams(); // Get warehouse ID from route params
  console.log("Warehouse ID:", warehouseId);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get('http://localhost:8000/api/products/index', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data.data);
      } catch (error) {
        setError("Error fetching products");
        console.error("Error: ", error);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      await axios.post(`http://localhost:8000/api/warehouse_products/store/warehouses/${warehouseId}/products`, selectedProduct, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Sản phẩm đã được thêm vào kho!");
      navigate(`/view-warehouse/${warehouseId}`); // Redirect to warehouse details after successful addition
    } catch (error) {
      setError("Lỗi khi thêm sản phẩm vào kho!");
      console.error("Error: ", error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Thêm sản phẩm vào nhà kho</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Chọn sản phẩm</label>
              <select
                name="product_id"
                className="form-control"
                value={selectedProduct.product_id}
                onChange={handleChange}
                required
              >
                <option value="">Chọn sản phẩm</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}-số lượng :{product.qty}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Số lượng</label>
              <input
                type="number"
                name="quantity"
                className="form-control"
                value={selectedProduct.quantity}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Thêm sản phẩm vào kho
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProductsWarehouse;
