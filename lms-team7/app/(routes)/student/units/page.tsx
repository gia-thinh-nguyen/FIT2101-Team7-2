"use client";
import { useState, MouseEvent } from "react";
import { useTheme } from "../context/ThemeContext";
import { useRouter } from "next/navigation";

export default function UnitsPage() {
  const [openUnit, setOpenUnit] = useState<string | null>(null);
  const { cardClass, buttonClass, textClass } = useTheme();
  const router = useRouter();

  const units = [
    { id: "ENG101", name: "Engineering Mathematics" },
    { id: "ENG102", name: "Mechanics" },
    { id: "ENG103", name: "Electrical Systems" },
    { id: "ENG104", name: "Materials Engineering" },
  ];

  return (
    <div className={`space-y-4 p-4 rounded-lg ${cardClass}`}>
      <h2 className={`text-2xl font-bold ${textClass}`}>Units</h2>

      {units.map((unit) => (
        <div key={unit.id} className={`rounded-lg shadow ${cardClass}`}>
          <button
            className={`w-full p-4 flex justify-between items-center font-semibold rounded-t-lg transition hover:opacity-80`}
            onClick={() => setOpenUnit(openUnit === unit.id ? null : unit.id)}
          >
            <span className={textClass}>
              {unit.name} ({unit.id})
            </span>
            <span className={textClass}>{openUnit === unit.id ? "−" : "+"}</span>
          </button>

          {openUnit === unit.id && (
            <div className="p-4 border-t space-y-3">
              {/* Action Buttons */}
              <div className="flex justify-end items-center gap-2">
                <button
                  className={`px-4 py-2 rounded ${buttonClass}`}
                  onClick={() => router.push(`/student/grades/${unit.id}`)}
                >
                  View Grades
                </button>
                <button
                  className={`px-4 py-2 rounded ${buttonClass}`}
                  onClick={() => router.push(`/student/assignments/${unit.id}`)}
                >
                  View Assignments
                </button>
              </div>

              {/* Weeks */}
              {[...Array(12).keys()].map((week) => {
                const weekPath = `/student/units/${unit.id}/week/${week + 1}`;
                return (
                  <div
                    key={week}
                    className={`p-3 rounded-md shadow flex justify-between items-center cursor-pointer ${cardClass}`}
                    onClick={() => router.push(weekPath)}
                  >
                    <span className={textClass}>Week {week + 1}</span>
                    <button
                      className={`px-3 py-1 rounded ${buttonClass}`}
                      onClick={(e: MouseEvent) => {
                        e.stopPropagation(); // prevent double navigation
                        router.push(weekPath);
                      }}
                    >
                      View Content
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
