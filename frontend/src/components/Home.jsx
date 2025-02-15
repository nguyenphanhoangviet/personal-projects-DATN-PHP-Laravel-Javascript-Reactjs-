import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductList from "./products/ProductList";
import BrandList from "./brands/Brandlist";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchNewProductsAndBrands = async () => {
      try {
        const newProductsResponse = await axios.get("/new_products");
        setProducts(newProductsResponse.data.new_products);

        const allBrandsResponse = await axios.get("/all_brands");
        setBrands(allBrandsResponse.data.brands);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchNewProductsAndBrands();
  }, []);

  return (
    <div>
      
      <ProductList products={products} />
      <BrandList brands={brands} />
    </div>
  );
}
