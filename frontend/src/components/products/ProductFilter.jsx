import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductFilter = () => {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [sub_category, setSubcategory] = useState('');
    const [sort, setSort] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    useEffect(() => {
        fetchProducts();
    }, [category, brand, sort, minPrice, maxPrice]);

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`/sort_filter_shop`, {
                params: {
                    category_id: category,
                    brand_id: brand,
                    sub_category_id: sub_category,
                    sort_by: sort,
                    start_price: minPrice,
                    end_price: maxPrice
                }
            });
            setProducts(response.data.products.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    return (
        <div>
            <h1>Filter and Sort Products</h1>
            <form>
                <label>Category:
                    <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
                </label>
                <label>Brand:
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
               
                <label>Sort by:
                    <select value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Default</option>
                        <option value="ASC">Price Ascending</option>
                        <option value="DESC">Price Descending</option>
                        <option value="Sort_A_Z">Name A-Z</option>
                        <option value="Sort_Z_A">Name Z-A</option>
                    </select>
                </label>
                <label>Min Price:
                    <input type="number" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
                </label>
                <label>Max Price:
                    <input type="number" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
                </label>
            </form>

            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>{product.name} - ${product.price}</li>
                ))}
            </ul>
        </div>
    );
};

export default ProductFilter;
