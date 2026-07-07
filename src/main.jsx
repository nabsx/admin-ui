import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Parent from "./Parent.jsx";
import Form from "./Form.jsx";
import { CounterContextProvider } from "./context/counterContext.jsx";
import { ThemeContextProvider } from "./context/themeContext.jsx";
import { AuthContextProvider } from "./context/authContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <CounterContextProvider>
      <Parent />
    </CounterContextProvider> */}
    <AuthContextProvider>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
    {/* <Form /> */}
  </React.StrictMode>
);
