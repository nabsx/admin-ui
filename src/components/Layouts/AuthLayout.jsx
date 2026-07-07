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
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              <LightModeIcon sx={{ color: "#FDB022" }} />
            ) : (
              <DarkModeIcon sx={{ color: "#1A1A1A" }} />
            )}
          </button>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-8">
            <Logo />
          </div>

          {children}
        </div>
      </main>
    </>
  );
}

export default AuthLayout;
