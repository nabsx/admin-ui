import React, { useContext, useState } from "react";
import Logo from "../Elements/Logo";
import Input from "../Elements/Input";
import NotificationsIcon from "@mui/icons-material/Notifications";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Icon from "../Elements/Icon";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../../context/themeContext";
import { AuthContext } from "../../context/authContext";
import { DarkModeContext } from "../../context/darkModeContext";
import { logoutService } from "../../services/authService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function MainLayout(props) {
  const { children } = props;
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const themes = [
    { name: "theme-green", bgcolor: "bg-[#299D91]", color: "#299D91" },
    { name: "theme-blue", bgcolor: "bg-[#1E90FF]", color: "#1E90FF" },
    { name: "theme-purple", bgcolor: "bg-[#6A5ACD]", color: "#6A5ACD" },
    { name: "theme-pink", bgcolor: "bg-[#DB7093]", color: "#DB7093" },
    { name: "theme-brown", bgcolor: "bg-[#8B4513]", color: "#8B4513" },
  ];

  const { theme, setTheme } = useContext(ThemeContext);
  const { isDarkMode, toggleDarkMode } = useContext(DarkModeContext);

  const menu = [
    { id: 1, name: "Overview", icon: <Icon.Overview />, link: "/" },
    { id: 2, name: "Balances", icon: <Icon.Balance />, link: "/balance" },
    {
      id: 3,
      name: "Transaction",
      icon: <Icon.Transaction />,
      link: "/transaction",
    },
    { id: 4, name: "Bills", icon: <Icon.Bill />, link: "/bill" },
    { id: 5, name: "Expenses", icon: <Icon.Expense />, link: "/expense" },
    { id: 6, name: "Goals", icon: <Icon.Goal />, link: "/goal" },
    { id: 7, name: "Settings", icon: <Icon.Setting />, link: "/setting" },
  ];

  const { user, logout } = useContext(AuthContext);
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logoutService();
      logout();
    } catch (err) {
      console.error(err);
      if (err.status === 401) {
        logout();
      }
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <div className={`flex min-h-screen ${theme.name}`}>
        <aside className="bg-defaultBlack w-28 sm:w-64 text-special-bg2 flex flex-col justify-between px-4 sm:px-6 py-8">
          <div>
            <div className="mb-8 sm:mb-12">
              <Logo variant="secondary" />
            </div>
            <nav className="space-y-2">
              {menu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className={({ isActive }) =>
                    `flex px-3 py-3 rounded-md hover:text-white hover:font-bold hover:scale-105 transition ${
                      isActive ? "text-white font-bold" : "hover:bg-special-bg3"
                    }`
                  }
                  children={({ isActive }) => (
                    <div
                      style={{
                        backgroundColor: isActive ? theme.color : "transparent",
                        display: "flex",
                        padding: "10px 12px",
                        borderRadius: "6px",
                        width: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div className="mx-auto sm:mx-0 flex-shrink-0">{item.icon}</div>
                      <div className="ms-3 hidden sm:block text-white font-bold text-sm">
                        {item.name}
                      </div>
                    </div>
                  )}
                />
              ))}
            </nav>
          </div>

          <div className="flex flex-col items-start gap-6 mt-8">
            {/* Theme selector */}
            <div className="w-full">
              <div className="text-xs sm:text-sm text-gray-400 mb-3 px-3">Themes</div>
              <div className="flex flex-row gap-2 items-center px-3">
                {themes.map((t) => (
                  <div
                    key={t.name}
                    className={`${t.bgcolor} w-6 h-6 rounded-md cursor-pointer hover:scale-125 transition shadow-sm`}
                    onClick={() => setTheme(t)}
                    title={t.name}
                  ></div>
                ))}
              </div>
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="flex items-center gap-3 px-3 py-3 rounded-md text-gray-400 hover:text-white hover:bg-special-bg3 transition w-full text-sm"
              aria-label="Toggle dark mode"
            >
              <div className="flex-shrink-0">
                {isDarkMode ? (
                  <LightModeIcon sx={{ color: "#FDB022", fontSize: 20 }} />
                ) : (
                  <DarkModeIcon sx={{ fontSize: 20 }} />
                )}
              </div>
              <span className="hidden sm:inline">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </div>
          <div className="flex flex-col gap-4">
            <div onClick={handleLogout} className="cursor-pointer w-full">
              <div
                className="flex items-center justify-center sm:justify-start text-white px-3 sm:px-4 py-3 rounded-md hover:opacity-90 transition"
                style={{ backgroundColor: theme.color }}
              >
                <div className="flex-shrink-0">
                  <Icon.Logout />
                </div>
                <div className="ms-3 hidden sm:block font-medium">Logout</div>
              </div>
            </div>
            <div className="border border-b border-special-bg opacity-40"></div>
            <div className="flex items-center justify-between gap-2 px-3 py-2">
              <div className="text-xs text-gray-500">Avatar</div>
              <div className="hidden sm:flex flex-col text-xs">
                <div className="font-semibold text-gray-300">{user.name}</div>
                <div className="text-gray-500 hover:text-gray-300 cursor-pointer">View Profile</div>
              </div>
              <div className="hidden sm:block">
                <Icon.Detail size={14} />
              </div>
            </div>
          </div>
        </aside>
        <div className=" bg-special-mainBg flex-1 flex flex-col">
          <div className="border border-b border-gray-05 px-6 py-7 flex justify-between items-center">
            <div className="flex items-center">
              <div className="font-bold text-2xl me-6">{user.name}</div>
              <div className="text-gray-03 flex">
                <Icon.ChevronRight size={20} />
                <span>May 19, 2023</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="me-4">
                <NotificationsIcon
                  style={{ color: theme.color }}
                  className="scale-110"
                />
              </div>
              <Input backgroundColor="bg-white" border="border-white" />
            </div>
          </div>
          <main className="flex-1 px-6 py-4">{children}</main>
        </div>
      </div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoggingOut}
      >
        <div className="flex flex-col items-center gap-4">
          <CircularProgress color="inherit" />
          <div className="text-lg font-semibold">Logging Out</div>
        </div>
      </Backdrop>
    </>
  );
}

export default MainLayout;
