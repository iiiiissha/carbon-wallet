import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";

function App() {
  const [spent, setSpent] = useState(0);
  const [history, setHistory] = useState([]);

  const handlePurchase = (product) => {
    setSpent((prev) => prev + product.co2);
    setHistory((prev) => [...prev, product]);
    alert(`✅ Bought ${product.name}! Added ${product.co2}g CO₂e`);
  };

  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Checkout onPurchase={handlePurchase} />} />
        <Route path="/dashboard" element={<div>Coming soon...</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

