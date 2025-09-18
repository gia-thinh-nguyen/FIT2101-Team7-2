"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Theme = "blue" | "dark" | "green";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  useEffect(() => {
    const savedTheme = localStorage.getItem("student-theme") as Theme | null;
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("student-theme", newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        className={
          theme === "dark"
            ? "bg-gray-900 text-white min-h-screen"
            : theme === "green"
            ? "bg-green-50 text-green-900 min-h-screen"
            : "bg-white text-blue-900 min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
