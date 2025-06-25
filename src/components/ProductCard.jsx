import React from "react";
import "../styles/ProductCard.css";

const ProductCard = ({ product, onBuy }) => {
  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <p>Carbon: {product.co2}g CO₂e</p>
      <button onClick={() => onBuy(product)}>Buy</button>
    </div>
  );
};

export default ProductCard;
