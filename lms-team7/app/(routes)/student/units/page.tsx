"use client";
import { useState } from "react";

export default function UnitsPage() {
  const [openUnit, setOpenUnit] = useState<string | null>(null);

  const units = [
    { id: "ENG101", name: "Engineering Mathematics" },
    { id: "ENG102", name: "Mechanics" },
    { id: "ENG103", name: "Electrical Systems" },
    { id: "ENG104", name: "Materials Engineering" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Your Units</h2>
      <div className="space-y-4">
        {units.map((unit) => (
          <div key={unit.id} className="bg-blue-50 rounded-lg shadow">
            <button
              className="w-full p-4 flex justify-between items-center font-semibold hover:bg-blue-100 rounded-lg transition"
              onClick={() => setOpenUnit(openUnit === unit.id ? null : unit.id)}
            >
              {unit.name} ({unit.id})
              <span>{openUnit === unit.id ? "−" : "+"}</span>
            </button>

            {openUnit === unit.id && (
              <div className="p-4 border-t space-y-3">
                {[...Array(12).keys()].map((week) => (
                  <div key={week} className="p-3 bg-white rounded-md shadow">
                    <h3 className="font-semibold">Week {week + 1}</h3>
                    <p className="text-sm text-gray-600">
                      Content, assignments, and grades for Week {week + 1}.
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
