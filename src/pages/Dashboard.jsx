import React from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ spent, history }) => {
  const carbonBudget = 10000; // Set your total CO2 budget here (grams)
  const percentage = Math.min((spent / carbonBudget) * 100, 100).toFixed(1);

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">📊 Your Carbon Summary</h2>

      <div className="carbon-box">
        <p><strong>Total Carbon Spent:</strong> {spent}g CO₂e</p>
        <p><strong>Carbon Budget:</strong> {carbonBudget}g</p>

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
