import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddProducts = () => {
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    price_cost: "",
    price: "",
    description: "",
    category_id: [],
    brand_id: "",
    favorite: 0,
    view: 0,
    sku: "",
    product_type_id: "",
    uses: "",
    user_manual: "",
    ingredient: "",
    barcode: "",
    track_qty: false,
    qty: 0,
    status: false,
  });

  const generateSlug = (text) => {
    // Convert to lowercase
    text = text.toLowerCase();

    // Replace accented characters with non-accented equivalents (similar to your PHP function)
    text = text
      .replace(/á|à|ả|ã|ạ|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, "a")
      .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, "e")
      .replace(/i|í|ì|ỉ|ĩ|ị/g, "i")
      .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, "o")
      .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, "u")
      .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, "y")
      .replace(/đ/g, "d");

    // Remove special characters
    text = text.replace(
      /[\'\"\`\~\!\@\#\$\%\^\&\*\(\)\+\=\[\]\{\}\|\\\;\:\,\.\/\?\>\<\-\_]/g,
      ""
    );

    // Replace spaces with dashes
    text = text.replace(/\s+/g, "-");

    // Replace multiple dashes with a single dash
    text = text.replace(/-+/g, "-");

    // Trim dashes from the beginning and end
    return text.trim("-");
  };

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [productTypes, setProductTypes] = useState([]);

  const [mainImage, setMainImage] = useState(null); // Main product image
  const [relatedImages, setRelatedImages] = useState([]); // Related product images
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Fetch categories
        const categoryRes = await axios.get(
          "http://localhost:8000/api/categories/index",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCategories(categoryRes.data);

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
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  // Handle changes for category selection
  const handleCategoryChange = (event) => {
    const options = event.target.options;
    const selectedCategories = [];

    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedCategories.push(parseInt(options[i].value));
      }
    }

    setProduct((prevProduct) => ({
      ...prevProduct,
      category_id: selectedCategories,
    }));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === "checkbox" ? checked : value,
      ...(name === "name" && { slug: generateSlug(value) }), // Automatically update slug when the name changes
    });
  };

  // Handle main image change
  const handleMainImageChange = (e) => {
    setMainImage(e.target.files[0]);
  };

  // Handle related images change
  const handleRelatedImagesChange = (e) => {
    setRelatedImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    // Kiểm tra dữ liệu trước khi gửi
    if (!product.name || !product.slug || !product.price) {
      setError("Vui lòng điền tất cả các trường bắt buộc!");
      return;
    }

    // Use FormData to handle both text and file data
    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("slug", product.slug);
    formData.append("price_cost", product.price_cost);
    formData.append("price", product.price);
    formData.append("description", product.description);
    // Gửi category_id như một mảng
    product.category_id.forEach((id) => {
      formData.append("category_id[]", id); // Gửi từng ID
    });

    formData.append("brand_id", product.brand_id);
    formData.append("favorite", product.favorite);
    formData.append("view", product.view);
    formData.append("sku", product.sku);
    formData.append("product_type_id", product.product_type_id);
    formData.append("uses", product.uses);
    formData.append("user_manual", product.user_manual);
    formData.append("ingredient", product.ingredient);
    formData.append("barcode", product.barcode);
    formData.append("track_qty", product.track_qty ? 1 : 0);
    formData.append("qty", product.qty);
    formData.append("status", product.status ? 1 : 0);

    // Add main image if selected
    if (mainImage) {
      formData.append("image", mainImage);
    }

    // Add related images if selected
    if (relatedImages.length > 0) {
      for (let i = 0; i < relatedImages.length; i++) {
        formData.append(`product_images[${i}]`, relatedImages[i]);
      }
    }

    try {
      await axios.post("http://localhost:8000/api/products/store", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in request headers
          "Content-Type": "multipart/form-data", // Ensure correct content type for file upload
        },
      });
      alert("Sản phẩm được thêm thành công!");
      navigate("/products"); // Redirect to product list after successful add
    } catch (error) {
      setError("Đã có lỗi xảy ra khi thêm sản phẩm!");
      console.error(
        "Lỗi thêm:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="container-xxl flex-grow-1 container-p-y">
      <div className="card">
        <h5 className="card-header">Thêm sản phẩm</h5>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={product.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Slug</label>
              <input
                type="text"
                className="form-control"
                name="slug"
                value={product.slug}
                readOnly // Make slug readonly as it will be auto-generated
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Giá gốc</label>
              <input
                type="number"
                className="form-control"
                name="price_cost"
                value={product.price_cost}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Giá</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={product.price}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mô tả</label>
              <textarea
                className="form-control"
                name="description"
                value={product.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Main Image */}
            <div className="mb-3">
              <label className="form-label">Ảnh chính</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleMainImageChange}
              />
            </div>

            {/* Related Images */}
            <div className="mb-3">
              <label className="form-label">Ảnh liên quan</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                multiple
                onChange={handleRelatedImagesChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Thành phần</label>
              <input
                type="text"
                className="form-control"
                name="ingredient"
                value={product.ingredient}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Sử dụng</label>
              <input
                type="text"
                className="form-control"
                name="uses"
                value={product.uses}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Hướng dẫn sử dụng</label>
              <input
                type="text"
                className="form-control"
                name="user_manual"
                value={product.user_manual}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category Dropdown */}
            <div className="mb-3">
              <label className="form-label">Danh mục</label>
              <select
                name="category_id"
                value={product.category_id}
                onChange={handleCategoryChange}
                className="form-control"
                multiple
                required
              >
                <option value="">Chọn một danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Brand Dropdown */}
            <div className="mb-3">
              <label className="form-label">Thương hiệu</label>
              <select
                name="brand_id"
                value={product.brand_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Chọn một thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Product Type Dropdown */}
            <div className="mb-3">
              <label className="form-label">Dạng sản phẩm</label>
              <select
                name="product_type_id"
                value={product.product_type_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Chọn một dạng sản phẩm</option>
                {productTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Số lượng trong kho</label>
              <input
                type="number"
                className="form-control"
                name="qty"
                value={product.qty}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mã vạch sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="barcode"
                value={product.barcode}
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Mã SKU</label>
              <input
                type="text"
                className="form-control"
                name="sku"
                value={product.sku}
                onChange={handleChange}
              />
            </div>

            {/* <div className="mb-3">
              <label className="form-label">Dạng sản phẩm</label>
              <input
                type="text"
                className="form-control"
                name="product_type_id"
                value={product.product_type_id}
                onChange={handleChange}
              />
            </div> */}

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="track_qty"
                checked={product.track_qty}
                onChange={handleChange}
              />
              <label className="form-check-label">
                Theo dỗi số lượng tồn kho
              </label>
            </div>

            <div className="mb-3">
              <label className="form-label">Yêu thích</label>
              <input
                type="number"
                className="form-control"
                name="favorite"
                value={product.favorite}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lượt xem</label>
              <input
                type="number"
                className="form-control"
                name="view"
                value={product.view}
                onChange={handleChange}
                required
              />
            </div>

            {/* <div className="mb-3">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={product.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value={1}>Active</option>
                <option value={0}>Inactive</option>
              </select>
            </div> */}

            <div className="mb-3 form-check">
              <input
                type="checkbox"
                className="form-check-input"
                name="status"
                checked={product.status}
                onChange={handleChange}
              />
              <label className="form-check-label">Kích hoạt</label>
            </div>

            <button type="submit" className="btn btn-primary">
              Thêm sản phẩm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
