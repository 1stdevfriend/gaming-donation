import React from "react";

import "./style.css";

const ProductCard = ({ productImage, productName, onClick }) => {
  return (
    <div onClick={onClick} className="product-card">
      <img src={productImage} alt={productName} className="" />
      <div className="product-name">{productName}</div>
      <div className="go-corner" href="#">
        <div className="go-arrow">→</div>
      </div>
      <div className="go-corner-ex"></div>
    </div>
  );
};

export default ProductCard;
