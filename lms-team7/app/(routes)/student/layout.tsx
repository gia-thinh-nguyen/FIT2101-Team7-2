"use client";
import { useState } from "react";
import Link from "next/link";
import { Home, BookOpen, HelpCircle, Palette, UserPlus, Menu } from "lucide-react";
import { ThemeProvider } from "./ThemeContext";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className={`${collapsed ? "w-20" : "w-64"} bg-blue-50 border-r p-4 transition-all`}>
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="mb-6 p-2 rounded-lg bg-blue-200 hover:bg-blue-300"
          >
            <Menu size={20} />
          </button>

          <nav className="space-y-4">
            <Link href="/student" className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-lg">
              <Home size={20} /> {!collapsed && "Home"}
            </Link>

            <Link href="/student/units" className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-lg">
              <BookOpen size={20} /> {!collapsed && "Units"}
            </Link>

            <Link href="/student/enrol" className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-lg">
              <UserPlus size={20} /> {!collapsed && "Enrol"}
            </Link>

            <Link href="/student/help" className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-lg">
              <HelpCircle size={20} /> {!collapsed && "Help"}
            </Link>

            <Link href="/student/themes" className="flex items-center gap-2 p-2 hover:bg-blue-100 rounded-lg">
              <Palette size={20} /> {!collapsed && "Themes"}
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </ThemeProvider>
  );
}
