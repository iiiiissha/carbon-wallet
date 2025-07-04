// src/services/openai.js

export async function getCarbonAdvice(query) {
  await new Promise((res) => setTimeout(res, 1000)); // simulate delay

  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("reduce")) {
    return "You can reduce your carbon footprint by using public transport, eating less meat, and switching to renewable energy sources.";
  } else if (lowerQuery.includes("transport")) {
    return "Using bicycles, walking, or public transit helps reduce emissions.";
  } else if (lowerQuery.includes("food")) {
    return "Plant-based diets have a lower carbon impact than meat-based diets.";
  } else if (lowerQuery.includes("energy")) {
    return "Use LED lights, solar panels, and energy-efficient appliances to cut carbon use.";
  } else {
    // Random fallback responses
    const fallback = [
      "Avoid single-use plastics and carry your own bottles.",
      "Shop local to reduce your carbon foodprint.",
      "Recycle properly and compost organic waste.",
      "Turn off devices when not in use to save power.",
    ];
    return fallback[Math.floor(Math.random() * fallback.length)];
  }
}





// const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// // Throttle config
// let lastCallTime = 0;
// const MIN_INTERVAL = 1500; // 1.5 seconds

// export async function getCarbonAdvice(query) {
//   const now = Date.now();
//   if (now - lastCallTime < MIN_INTERVAL) {
//     throw new Error("⏳ Too many requests. Please wait a moment.");
//   }

//   lastCallTime = now;
//   await new Promise((r) => setTimeout(r, 2000)); // ⏳ wait 2s


//   const response = await fetch("https://api.openai.com/v1/chat/completions", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${OPENAI_API_KEY}`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [{ role: "user", content: query }],
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("⚠️ Failed to fetch response from OpenAI");
//   }

//   const data = await response.json();
//   return data.choices[0].message.content;
// }



