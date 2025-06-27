import React from "react";
import "../styles/Checkout.css";
import products from "../data/products";
import ProductCard from "../components/ProductCard";

const Checkout = ({ onPurchase, darkMode }) => {
  return (
    <div className={`checkout-container ${darkMode ? "dark" : "light"}`}>
      <h2 className="checkout-title">🛒 Select Products to Buy</h2>
      <div className="product-list">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuy={onPurchase}
          />
        ))}
      </div>
    </div>
  );
};


export default Checkout;
