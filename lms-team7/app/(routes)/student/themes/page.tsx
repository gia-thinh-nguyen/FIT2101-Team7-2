"use client";

import { useTheme } from "../context/ThemeContext";

export default function ThemesPage() {
  const { theme, setTheme } = useTheme();

  // Define all valid themes
  const themeOptions: { key: typeof theme; label: string }[] = [
    { key: "blue", label: "Blue" },
    { key: "green", label: "Green" },
    { key: "pink", label: "Pink" },
    { key: "purple", label: "Purple" },
    { key: "orange", label: "Orange" },
    { key: "grey", label: "Grey" },
    { key: "yellow", label: "Yellow" },
  ];

  // Centralised theme styles for preview box
  const themeStyles = {
    blue: "bg-blue-50 text-blue-900",
    green: "bg-green-50 text-green-900",
    pink: "bg-pink-50 text-pink-900",
    purple: "bg-purple-50 text-purple-900",
    orange: "bg-orange-50 text-orange-900",
    grey: "bg-gray-50 text-gray-900",
    yellow: "bg-yellow-50 text-yellow-900",
  }[theme];

  return (
    <div className={`space-y-6 p-6 rounded-lg ${themeStyles}`}>
      <h2 className="text-2xl font-bold">Theme Settings</h2>
      <p>Select a theme for your dashboard:</p>

      {/* Dropdown for selecting theme */}
      <div className="mt-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value as typeof theme)}
          className="p-2 rounded border bg-white text-black"
        >
          {themeOptions.map((t) => (
            <option key={t.key} value={t.key} className="text-black">
              {t.label}
            </option>
          ))}
        </select>
      </div>

      {/* Preview of current theme */}
      <div className={`mt-6 p-6 rounded-lg shadow bg-white`}>
        <p className="text-black font-semibold">
          Current theme: {themeOptions.find((t) => t.key === theme)?.label}
        </p>
      </div>
    </div>
  );
}
