import React from "react";


export default function BrandListItem({ brand }) { 
 
    return (
    <div className="col-md-4 mb-2">
      <div className="card h-100">
        <img src={brand.image} alt={brand.name} className="card-img-top" />
       
      </div>
    </div>
  );
}
