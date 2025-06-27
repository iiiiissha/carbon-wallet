import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Checkout from "./pages/Checkout";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import "./index.css";

function App() {
  const [spent, setSpent] = useState(0);
  const [history, setHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [budget, setBudget] = useState(10000);

  const handlePurchase = (product) => {
    setSpent((prev) => prev + product.co2);
    setHistory((prev) => [...prev, product]);
    alert(`✅ Bought ${product.name}! Added ${product.co2}g CO₂e`);
  };

  return (
    <BrowserRouter>
      <Navbar  darkMode={darkMode}/>

      <div className={darkMode ? "app dark" : "app light"}>
        <Routes>
          <Route path="/" element={<Checkout onPurchase={handlePurchase} darkMode={darkMode}/>} />
          <Route
            path="/dashboard"
            element={
              <Dashboard spent={spent} history={history} budget={budget}  darkMode={darkMode} />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                budget={budget}
                setBudget={setBudget}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            }
          />
        </Routes>
      </div>
     
    </BrowserRouter>
  );
}

export default App;
