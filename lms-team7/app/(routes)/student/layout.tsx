"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, BookOpen, HelpCircle, Palette, UserPlus, Menu } from "lucide-react";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LayoutContent>{children}</LayoutContent>
    </ThemeProvider>
  );
}

function LayoutContent({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const { cardClass, buttonClass, textClass } = useTheme();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-20" : "w-64"
        } ${cardClass} border-r p-4 transition-all`}
      >
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`${buttonClass} mb-6 p-2 rounded-lg transition flex items-center justify-center`}
        >
          <Menu size={20} />
        </button>

        <nav className="space-y-2">
          <SidebarLink href="/student" icon={<Home size={20} className="text-black"/>} label="Home" collapsed={collapsed} />
          <SidebarLink href="/student/units" icon={<BookOpen size={20} className="text-black"/>} label="Units" collapsed={collapsed} />
          <SidebarLink href="/student/enrol" icon={<UserPlus size={20} className="text-black"/>} label="Enrol" collapsed={collapsed} />
          <SidebarLink href="/student/help" icon={<HelpCircle size={20} className="text-black"/>} label="Help" collapsed={collapsed} />
          <SidebarLink href="/student/themes" icon={<Palette size={20} className="text-black"/>} label="Themes" collapsed={collapsed} />
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top header */}
        <header className={`w-full border-b p-4 flex justify-between items-center shadow-sm ${cardClass}`}>
          <h1 className={`text-xl font-semibold ${textClass}`}>Student Portal</h1>
          {/* Profile placeholder */}
        </header>

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}

function SidebarLink({
  href,
  icon,
  label,
  collapsed,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}) {
  const pathname = usePathname();
  const { cardClass, textClass } = useTheme();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 p-2 rounded-lg transition ${
        isActive
          ? `shadow-sm font-semibold ${cardClass}`
          : `hover:${cardClass}`
      }`}
    >
      {icon} {!collapsed && <span className={textClass}>{label}</span>}
    </Link>
  );
}
