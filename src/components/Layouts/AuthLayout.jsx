import React, { useContext } from "react";
import Logo from "../Elements/Logo";
import { ThemeContext } from "../../context/themeContext";

function AuthLayout(props) {
  const { children } = props;
  const { theme } = useContext(ThemeContext);

  return (
    <>
      {/* 1. Tambahkan flex-col, items-center, dan justify-center di tag <main> */}
      <main
        className={`min-h-screen bg-special-mainBg flex flex-col justify-center items-center p-6 ${theme.name}`}
      >
        {/* container start */}
        {/* 2. max-w-sm sudah bagus, kita biarkan saja agar ukurannya pas */}
        <div className="w-full max-w-sm">
          {/* Beri sedikit margin bottom (mb-8) di bawah logo agar tidak terlalu menempel dengan form */}
          <div className="mb-8">
            <Logo />
          </div>

          {children}
        </div>
        {/* container end */}
      </main>
    </>
  );
}

export default AuthLayout;
