import React from "react";
import "./Style.scss";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page); // Call the function passed as prop
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li key={i}>
          <a
            className={currentPage === i ? "active" : ""}
            onClick={() => handleClick(i)} // Change page on click
          >
            {i}
          </a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="pro-pagination-style text-center mt-55">
      <ul>
        {renderPageNumbers()}
        <li>
          <a
            className="next"
            onClick={() => handleClick(currentPage + 1)} // Next page
            style={{ pointerEvents: currentPage === totalPages ? "none" : "auto" }} // Disable if on last page
          >
            <i className="far fa-angle-double-right"></i>
          </a>
        </li>
      </ul>
    </div>
  );
}
