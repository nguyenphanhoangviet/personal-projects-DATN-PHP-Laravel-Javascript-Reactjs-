import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const ViewWarehouse = () => {
  const [warehouse, setWarehouse] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get warehouse ID from route params

  useEffect(() => {
    const fetchWarehouse = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8000/api/warehouses/show/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setWarehouse(response.data);
      } catch (error) {
        setError("Error fetching warehouse data");
        console.error("Error: ", error);
      }
    };
    fetchWarehouse();
  }, [id]);

  const removeProduct = async (productId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:8000/api/warehouse_products/destroy/warehouse/${id}/product/${productId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setWarehouse((prevWarehouse) => ({
        ...prevWarehouse,
        products: prevWarehouse.products.filter(
          (product) => product.id !== productId
        ),
      }));
    } catch (error) {
      setError("Error removing product");
      console.error("Error: ", error);
    }
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!warehouse) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="card">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h5 className="card-header">Danh sách kho hàng</h5>
          <Link to={`/add-products-warehouse/${id}`}>
            <button type="button" className="btn rounded-pill btn-primary m-6">
              Thêm kho hàng
            </button>
          </Link>
        </div>
      </div>
      <h1>Warehouse Details</h1>
      <h2>Location: {warehouse.location}</h2>
      <p>Status: {warehouse.status ? "Active" : "Inactive"}</p>
      <h2>Products:</h2>
      {warehouse.products && warehouse.products.length > 0 ? (
        <ul>
          {warehouse.products.map((product) => (
            <li key={product.id}>
              <p>Product Name: {product.name}</p>
              <p>Quantity: {product.pivot.quantity}</p>
              <button
                onClick={() => removeProduct(product.id)}
                className="btn btn-danger"
              >
                Xóa sản phẩm
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products in this warehouse</p>
      )}
    </div>
  );
};

export default ViewWarehouse;
