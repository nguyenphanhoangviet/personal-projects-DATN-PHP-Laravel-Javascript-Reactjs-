import { Link } from "react-router-dom";

export default function CategoriesArena1({ category }) {
  // Nhận category từ props
  return (
    <div className="product-plr-1">
      <div className="categories-wrap">
        <div className="categories-img categories-img-zoom">
          <Link to={`shop/${category.slug}`}>
            {" "}
            {/* Sử dụng slug cho link */}
            <img
              src={category.image}
              alt={category.name}
              className="img-fluid"
              style={{ width: "160px" }}
            />{" "}
            {/* Sử dụng hình ảnh từ category */}
          </Link>
        </div>
        <div className="categories-content text-center">
          <h3>
            <Link to={`shop/${category.slug}`}>{category.name}</Link>{" "}
            {/* Hiển thị tên danh mục */}
          </h3>
        </div>
      </div>
    </div>
  );
}
