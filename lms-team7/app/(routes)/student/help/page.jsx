"use client";
import { useTheme } from "../context/ThemeContext";

export default function HelpPage() {
  const { cardClass, buttonClass, textClass } = useTheme();

  const teachers = [
    { name: "Dr. Smith", email: "smith@university.edu", room: "B201" },
    { name: "Prof. Lee", email: "lee@university.edu", room: "C305" },
    { name: "Dr. Patel", email: "patel@university.edu", room: "A101" },
    { name: "Prof. Nguyen", email: "nguyen@university.edu", room: "E409" },
  ];

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${textClass}`}>Help & Support</h2>

      {teachers.map((t) => (
        <div
          key={t.email}
          className={`p-4 rounded-lg shadow flex justify-between items-center ${cardClass}`}
        >
          <div>
            <h3 className={`font-semibold ${textClass}`}>{t.name}</h3>
            <p className={textClass}>Email: {t.email}</p>
            <p className={textClass}>Room: {t.room}</p>
          </div>
          <a
            href={`mailto:${t.email}`}
            className={`px-3 py-1 rounded ${buttonClass}`}
            aria-label={`Contact ${t.name}`}
          >
            Contact
          </a>
        </div>
      ))}
    </div>
  );
}
