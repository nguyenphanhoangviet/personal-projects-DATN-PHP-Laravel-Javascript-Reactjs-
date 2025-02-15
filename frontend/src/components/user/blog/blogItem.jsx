import React from "react";

export default function BlogItem({ post }) {
  return (
    <div className="col-lg-4 col-md-6 col-12 col-sm-6 grid-item wow tmFadeInUp">
      <div className="blog-wrap-2 mb-30">
        <div className="blog-img-2">
          <a href={`blog-details/${post.slug}`}>
            <img src={post.image} alt={post.title} />
          </a>
          <div className="blog-tag-2">
            <a href={`blog-details/${post.slug}`}>Tin nóng</a>
          </div>
        </div>
        <div className="blog-content-2">
          <div className="blog-meta-2">
            <ul>
              <li>
                <i className="far fa-calendar"></i> Ngày 21 tháng 4, 2020
              </li>
              <li>
                <i className="far fa-eye"></i> 453 lượt xem
              </li>
            </ul>
          </div>
          <h3>
            <a href={`blog-details/${post.slug}`}>{post.title}</a>
          </h3>
          <div className="blog-btn">
            <a href={`blog-details/${post.slug}`}>
              Đọc thêm <i className="far fa-long-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
