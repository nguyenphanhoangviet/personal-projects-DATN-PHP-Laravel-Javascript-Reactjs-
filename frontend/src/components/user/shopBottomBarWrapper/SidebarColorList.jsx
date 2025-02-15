import React from "react";

export default function SidebarColorList() {
  return (
    <div className="sidebar-widget sidebar-widget-wrap sidebar-widget-padding-4 mb-20">
      <h4 className="sidebar-widget-title">By colors </h4>
      <div className="sidebar-color-list tooltip-style-3">
        <ul>
          <li>
            <a aria-label="Black" className="black" href="#">
              black
            </a>
          </li>
          <li>
            <a aria-label="Blue" className="blue" href="#">
              blue
            </a>
          </li>
          <li>
            <a aria-label="Green" className="green" href="#">
              green
            </a>
          </li>
          <li>
            <a aria-label="Pink" className="pink" href="#">
              pink
            </a>
          </li>
          <li>
            <a aria-label="Powder blue" className="powder-blue" href="#">
              powder-blue
            </a>
          </li>
          <li>
            <a aria-label="Purple" className="purple" href="#">
              purple
            </a>
          </li>
          <li>
            <a aria-label="Red" className="red" href="#">
              red
            </a>
          </li>
          <li>
            <a aria-label="Transparent" className="transparent" href="#">
              transparent
            </a>
          </li>
          <li>
            <a aria-label="White" className="white" href="#">
              white
            </a>
          </li>
          <li>
            <a aria-label="Yellow" className="yellow" href="#">
              yellow
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
