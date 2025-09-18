"use client";
import { useTheme } from "../ThemeContext";

export default function Page() {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Theme Settings</h2>
      <p>Select a theme for your dashboard:</p>

      <div className="flex gap-4 mt-4">
        <button onClick={() => setTheme("blue")} className="px-4 py-2 bg-blue-100 rounded">Blue</button>
        <button onClick={() => setTheme("dark")} className="px-4 py-2 bg-gray-800 text-white rounded">Dark</button>
        <button onClick={() => setTheme("green")} className="px-4 py-2 bg-green-100 text-green-900 rounded">Green</button>
      </div>

      <div className="mt-6 p-6 rounded-lg shadow bg-white">
        <p>Current theme: {theme}</p>
      </div>
    </div>
  );
}
