import React from "react";
import BrandListItem from "./BrandListItem";


export default function BrandList({ brands }) {
  return (
    <div className="row my-4">
      {brands.map(brand => (
        <BrandListItem product={brand} key={brand.id} />
      ))}
    </div>
  );
}
