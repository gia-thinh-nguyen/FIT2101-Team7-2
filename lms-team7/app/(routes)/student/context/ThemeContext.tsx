"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// Allowed themes
type Theme = "blue" | "green" | "pink" | "purple" | "orange" | "grey" | "yellow";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  cardClass: string;
  buttonClass: string;
  textClass: string;
}

// Create context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Provider
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("blue");

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("student-theme") as Theme | null;
    if (savedTheme) setThemeState(savedTheme);
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("student-theme", newTheme);
  };

  // Theme classes
  const cardClasses: Record<Theme, string> = {
    blue: "bg-blue-50",
    green: "bg-green-50",
    pink: "bg-pink-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
    grey: "bg-gray-50",
    yellow: "bg-yellow-200",
  };

  const buttonClasses: Record<Theme, string> = {
    blue: "bg-blue-500 text-white hover:bg-blue-600",
    green: "bg-green-500 text-white hover:bg-green-600",
    pink: "bg-pink-500 text-white hover:bg-pink-600",
    purple: "bg-purple-500 text-white hover:bg-purple-600",
    orange: "bg-orange-500 text-white hover:bg-orange-600",
    grey: "bg-gray-500 text-white hover:bg-gray-600",
    yellow: "bg-yellow-700 text-white hover:bg-yellow-800",
  };

  const textClasses: Record<Theme, string> = {
    blue: "text-blue-900",
    green: "text-green-900",
    pink: "text-pink-900",
    purple: "text-purple-900",
    orange: "text-orange-900",
    grey: "text-gray-900",
    yellow: "text-yellow-900",
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        cardClass: cardClasses[theme],
        buttonClass: buttonClasses[theme],
        textClass: textClasses[theme],
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook
export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
}
