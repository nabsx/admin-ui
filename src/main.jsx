import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CounterContextProvider } from "./context/counterContext.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";
import { DarkModeContextProvider } from "./context/darkModeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CounterContextProvider>
      <Parent />
    </CounterContextProvider> */}
    <AuthContextProvider>
      <DarkModeContextProvider>
        <ThemeContextProvider>
          <App />
        </ThemeContextProvider>
      </DarkModeContextProvider>
    </AuthContextProvider>
    {/* <Form /> */}
  </React.StrictMode>
);
