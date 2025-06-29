import React, { useEffect, useState } from "react";
import "../styles/Checkout.css";
import ProductCard from "../components/ProductCard";

const Checkout = ({ onPurchase, darkMode }) => {
  const [grouped, setGrouped] = useState({});
  const [error, setError] = useState(null);
  const API_KEY = "TBB81VRS0D69Q5VQJAXJC39J8M";

  const getEstimateBody = (product) => {
    const category = product.category.toLowerCase();

    // Custom activity_id mapping per category
    if (category.includes("smartphones") || category.includes("laptops")) {
      return {
        activity_id: "consumer_goods-type_specific_electronic_device",
        parameters: {
          money: product.price,
          money_unit: "usd"
        }
      };
    } else if (category.includes("fragrances") || category.includes("skincare")) {
      return {
        activity_id: "consumer_goods-type_general",
        parameters: {
          money: product.price,
          money_unit: "usd"
        }
      };
    } else if (category.includes("groceries") || category.includes("food")) {
      return {
        activity_id: "food-supply-chain_food-type_fresh_fruit",
        parameters: {
          amount: 1,
          unit: "kg"
        }
      };
    } else {
      return {
        activity_id: "consumer_goods-type_general",
        parameters: {
          money: product.price,
          money_unit: "usd"
        }
      };
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products?limit=20");
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();

        const prods = await Promise.all(
          data.products.map(async (p) => {
            const estimateBody = getEstimateBody(p);

            try {
              const cfRes = await fetch("https://api.climatiq.io/estimate", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${API_KEY}`,
                },
                body: JSON.stringify({
                  emission_factor: { activity_id: estimateBody.activity_id },
                  parameters: estimateBody.parameters,
                }),
              });

              if (!cfRes.ok) {
                console.warn(`No CO2 data for ${p.title}`);
                return { ...p, co2: null };
              }

              const cfData = await cfRes.json();
              return { ...p, co2: cfData.co2e || 0 };
            } catch (error) {
              console.error(`Error fetching CO2 for ${p.title}:`, error);
              return { ...p, co2: null };
            }
          })
        );

        // Group by category
        const groups = {};
        prods.forEach((p) => {
          if (!groups[p.category]) groups[p.category] = [];
          groups[p.category].push(p);
        });

        setGrouped(groups);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  if (error) return <div className="error">❌ Error: {error}</div>;

  return (
    <div className={`checkout-container ${darkMode ? "dark" : "light"}`}>
      <h2>🛒 Products with CO₂e Estimates</h2>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category} className="category-group">
          <h3 className="category-title">{category}</h3>
          <div className="product-list">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} onBuy={onPurchase} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Checkout;
