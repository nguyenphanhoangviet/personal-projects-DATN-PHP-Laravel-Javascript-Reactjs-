import React from "react";

export default function PriceFilter() {
  return (
    <div className="sidebar-widget sidebar-widget-wrap sidebar-widget-padding-2 mb-20">
      <h4 className="sidebar-widget-title">Lọc theo giá </h4>
      <div className="price-filter">
        <div id="slider-range"></div>
        <div className="price-slider-amount">
          <div className="label-input">
            <input
              type="text"
              id="amount"
              name="price"
              placeholder="Add Your Price"
            />
          </div>
          <button type="button">Lọc</button>
        </div>
      </div>
    </div>
  );
}
