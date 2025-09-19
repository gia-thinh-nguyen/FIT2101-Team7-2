"use client";

import { useTheme } from "../../context/ThemeContext"; // your fixed path/alias
import { useParams } from "next/navigation";

type Grade = { assignment: string; marks: number };
type GradesData = Record<string, Grade[]>;

export default function GradesPage() {
  const { cardClass, textClass } = useTheme();
  const params = useParams<{ unitId: string }>();
  const unitId = params.unitId as string;

  const gradesData: GradesData = {
    ENG101: [
      { assignment: "Assignment 1", marks: 85 },
      { assignment: "Assignment 2", marks: 90 },
      { assignment: "Assignment 3", marks: 78 },
    ],
    ENG102: [
      { assignment: "Assignment 1", marks: 88 },
      { assignment: "Assignment 2", marks: 92 },
      { assignment: "Assignment 3", marks: 80 },
    ],
    ENG103: [
      { assignment: "Assignment 1", marks: 75 },
      { assignment: "Assignment 2", marks: 85 },
      { assignment: "Assignment 3", marks: 89 },
    ],
    ENG104: [
      { assignment: "Assignment 1", marks: 95 },
      { assignment: "Assignment 2", marks: 88 },
      { assignment: "Assignment 3", marks: 92 },
    ],
  };

  const grades = gradesData[unitId] ?? [];

  return (
    <div className={`space-y-4 p-4 rounded-lg ${cardClass}`}>
      <h2 className={`text-2xl font-bold ${textClass}`}>
        Grades for Unit {unitId}
      </h2>
      <div className="space-y-3">
        {grades.length ? (
          grades.map((g, i) => (
            <div key={i} className={`p-3 rounded-md shadow flex justify-between items-center ${cardClass}`}>
              <span className={textClass}>{g.assignment}</span>
              <span className={textClass}>{g.marks} Marks</span>
            </div>
          ))
        ) : (
          <p className={textClass}>No grades available for this unit.</p>
        )}
      </div>
    </div>
  );
}
