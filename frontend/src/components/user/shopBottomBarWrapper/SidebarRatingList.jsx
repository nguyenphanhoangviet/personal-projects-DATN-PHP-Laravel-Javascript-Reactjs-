import React from "react";

export default function SidebarRatingList() {
  return (
    <div className="sidebar-widget sidebar-widget-wrap sidebar-widget-padding-3 mb-20">
          <h4 className="sidebar-widget-title">By rating </h4>
          <div className="sidebar-rating-list">
            <ul>
              <li>
                <a href="#">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i> <span> (7)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="gray far fa-star"></i> <span> (2)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i> <span> (2)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-star"></i>
                  <i className="fas fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i> <span> (1)</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fas fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i>
                  <i className="gray far fa-star"></i> <span> (1)</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
  );
}
