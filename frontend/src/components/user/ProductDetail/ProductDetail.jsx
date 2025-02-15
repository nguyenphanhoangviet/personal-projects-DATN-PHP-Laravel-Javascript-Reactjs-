import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail_Left from "./ProductDetail_Left";
import ProductDetail_Right from "./ProductDetail_Right";
import axios from "axios";

export default function ProductDetail() {
  const { id , slug } = useParams(); // Lấy id từ URL
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`/product_detail/${slug}/${id}`);
        const data = response.data;
        setProduct(data.product);    
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    if (id && slug) {
      fetchProductDetail(); 
    }
  }, [id, slug]); 

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-details-wrap-top">
      <div className="row">
        <ProductDetail_Left product={product} />
        <ProductDetail_Right product={product} />
      </div>
    </div>
  );
}