import React, { useContext } from "react";
import Logo from "../Elements/Logo";
import { ThemeContext } from "../../context/themeContext";
import { DarkModeContext } from "../../context/darkModeContext";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

function AuthLayout(props) {
  const { children } = props;
  const { theme } = useContext(ThemeContext);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <>
      <main
        className={`min-h-screen bg-special-mainBg flex flex-col justify-center items-center p-6 ${
          theme.name
        } ${isDarkMode ? "dark" : ""}`}
      >
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>

          {children}

          <div className="flex justify-center mt-6">
            <button
              onClick={toggleDarkMode}
              className="flex items-center justify-center hover:opacity-70 transition"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <LightModeIcon sx={{ color: "#FDB022", fontSize: 22 }} />
              ) : (
                <DarkModeIcon sx={{ fontSize: 22 }} />
              )}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default AuthLayout;
