import React, { useState } from "react";
import { getCarbonAdvice } from "../services/openai";

const AIAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const res = await getCarbonAdvice(query);
    setResponse(res);
  };

  return (
    <div className="ai-box" style={{ padding: "1rem", border: "1px solid #ccc", marginTop: "1rem" }}>
      <h2>🧠 Sustainability Assistant</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g. How can I lower my carbon footprint?"
        style={{ width: "100%", padding: "0.5rem", marginBottom: "0.5rem" }}
      />
      <button onClick={handleAsk}>Ask AI</button>
      {response && (
        <div style={{ marginTop: "1rem", backgroundColor: "#f0f0f0", padding: "1rem" }}>
          <strong>Response:</strong> {response}
        </div>
      )}
    </div>
  );
};

export default AIAssistant;
