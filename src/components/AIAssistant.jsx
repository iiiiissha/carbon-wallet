import React, { useState } from "react";
import { getCarbonAdvice } from "../services/openai";
import "../styles/aiAssistant.css";


const AIAssistant = ({ darkMode }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(false);

  const handleAsk = async () => {
    if (!query.trim() || cooldown) return;

    setLoading(true);
    setError("");
    setResponse("");
    setCooldown(true);

    try {
      const res = await getCarbonAdvice(query);
      setResponse(res);
      setQuery(""); // ✅ Clear the input after asking
    } catch (err) {
      console.error("API error:", err);
      setError(err.message || "⚠️ Failed to fetch response.");
    }

    setLoading(false);
    setTimeout(() => setCooldown(false), 3000); // ✅ 3-second cooldown
  };

  return (
    <div className={`ai-box ${darkMode ? "dark-box" : "light-box"}`}>
      <h2>🧠 Sustainability Assistant</h2>

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAsk()}
        placeholder="e.g. How can I lower my carbon footprint?"
        disabled={loading}
      />

      <button onClick={handleAsk} disabled={loading || !query.trim() || cooldown}>
        {loading ? "Asking..." : "Ask AI"}
      </button>

      {error && <div className="error">{error}</div>}

      {response && (
        <div className="response">
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;


