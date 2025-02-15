import React from "react";


const BrandLogoArea = ({ brands }) => {
  // Kiểm tra nếu brands không phải là mảng hoặc là mảng rỗng
  if (!brands || brands.length === 0) {
    return <div>Loading...</div>; // Hoặc một thông báo khác
  }

  return (
    <div className="row align-items-center wow tmFadeInUp">
      {brands.map((brand) => (

        <div className="col-lg-2 col-md-4 col-6 col-sm-4" key={brand.id}>
          <div className="single-brand-logo mb-30">
            <a href={`shop.html?brand=${brand.slug}`}>
              <img src={brand.image} alt={brand.name} />
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BrandLogoArea;
