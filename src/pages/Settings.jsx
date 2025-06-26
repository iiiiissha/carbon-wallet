// src/pages/Settings.jsx
import React, { useState } from "react";
import "../styles/Settings.css";

const Settings = ({ budget, setBudget, darkMode, setDarkMode }) => {
  const [nudgesEnabled, setNudgesEnabled] = useState(true);
  const [unit, setUnit] = useState("g");
  const [goal, setGoal] = useState(5000);
  const [language, setLanguage] = useState("en");
  const [emailReminder, setEmailReminder] = useState(false);

  const handleSave = () => {
    alert("✅ Preferences saved successfully!");
  };

  const resetAll = () => {
    setBudget(20000);
    setDarkMode(false);
    setNudgesEnabled(true);
    setUnit("g");
    setGoal(5000);
    setLanguage("en");
    setEmailReminder(false);
    alert("🔄 All settings have been reset.");
  };

  const convertBudget = () => {
    return unit === "kg" ? (budget / 1000).toFixed(2) : budget;
  };

  const handleBudgetChange = (e) => {
    const value = unit === "kg" ? Number(e.target.value) * 1000 : Number(e.target.value);
    setBudget(value);
  };

  return (
    <div className={`settings-wrapper ${darkMode ? "dark" : "light"}`}>
      <div className="settings-card">
        <h2>⚙️ Settings</h2>

        <div className="setting-item">
          <label>Weekly Carbon Budget ({unit} CO₂e)</label>
          <input type="number" value={convertBudget()} onChange={handleBudgetChange} />
        </div>

        <div className="setting-item">
          <label>Preferred Unit</label>
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="g">grams (g)</option>
            <option value="kg">kilograms (kg)</option>
          </select>
        </div>

        <div className="setting-item">
          <label>Target CO₂ Savings Goal (g)</label>
          <input type="number" value={goal} onChange={(e) => setGoal(Number(e.target.value))} />
        </div>

        <div className="setting-item toggle">
          <label>Enable Carbon Nudges</label>
          <input
            type="checkbox"
            checked={nudgesEnabled}
            onChange={() => setNudgesEnabled(!nudgesEnabled)}
          />
        </div>

        <div className="setting-item toggle">
          <label>Enable Dark Mode</label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
          />
        </div>

        <div className="setting-item">
          <label>Language Preference</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>

        <div className="setting-item toggle">
          <label>Email Reminders</label>
          <input
            type="checkbox"
            checked={emailReminder}
            onChange={() => setEmailReminder(!emailReminder)}
          />
        </div>

        <div className="settings-actions">
          <button onClick={handleSave} className="save">💾 Save</button>
          <button onClick={resetAll} className="reset">🔄 Reset</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;