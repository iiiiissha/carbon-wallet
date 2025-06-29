import React, { useEffect } from "react";
import "../styles/Dashboard.css";
import { useFirebase } from "../context/Firebase";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ spent, history, budget = 10000, darkMode }) => {

  const {user} = useFirebase();
  const navigate = useNavigate();

  useEffect(()=>{
    if(!user){
      alert("Login First");
      navigate('/auth');
    }
  },[user,navigate]);

  const percentage = Math.min((spent / budget) * 100, 100).toFixed(1);

  return (
    <div className={darkMode ? "dashboard-container dark" : "dashboard-container light"}>
      <h2 className="dashboard-title">📊 Your Carbon Summary</h2>

      <div className="carbon-box">
        <p><strong>Total Carbon Spent:</strong> {spent}g CO₂e</p>
        <p><strong>Carbon Budget:</strong> {budget}g</p>

        <div className="progress-bar-background">
          <div className="progress-bar-fill" style={{ width: `${percentage}%` }}>
            {percentage}%
          </div>
        </div>
      </div>

      <h3 className="history-title">🧾 Purchase History</h3>
      <ul className="history-list">
        {history.map((item, index) => (
          <li key={index}>{item.name} — {item.co2}g CO₂e</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
