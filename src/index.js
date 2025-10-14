import React from "react";
import ReactDOM from "react-dom/client";   // ✅ corrected
// import App from "./App"; // keep pointing to App.js

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
import "@fontsource/montserrat"; // Default weight 400
import "@fontsource/montserrat/600.css"; // Optional: Semi-bold
import "@fontsource/montserrat/700.css"; // Optional: Bold
