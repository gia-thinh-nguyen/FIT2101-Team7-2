"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "../../context/ThemeContext"; // [unitId] -> assignments -> student => up 2 levels

type Assignment = {
  id: string;
  title: string;
  dueAt: string;
  weight: number;
  status: "Open" | "Closed";
  description?: string;
};

export default function AssignmentsClient({
  unitId,
  assignments,
}: {
  unitId: string;
  assignments: Assignment[];
}) {
  const { cardClass, textClass, buttonClass } = useTheme();
  const router = useRouter();

  return (
    <div className={`space-y-4 p-4 rounded-lg ${cardClass}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${textClass}`}>Assignments — {unitId}</h2>
        <div className="flex gap-2">
          <button
            className={`px-3 py-2 rounded ${buttonClass}`}
            onClick={() => router.push(`/student/units`)}
          >
            Back to Units
          </button>
          <button
            className={`px-3 py-2 rounded ${buttonClass}`}
            onClick={() => router.push(`/student/grades/${unitId}`)}
          >
            View Grades
          </button>
        </div>
      </div>

      {assignments.length ? (
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className={`p-3 rounded-md shadow ${cardClass}`}>
              <div className="flex items-center justify-between">
                <div className={`font-semibold ${textClass}`}>{a.title}</div>
                <div className={textClass}>{a.weight}%</div>
              </div>
              <div className={`text-sm ${textClass}`}>Due: {a.dueAt} • {a.status}</div>
              {a.description && <div className={textClass}>{a.description}</div>}
            </div>
          ))}
        </div>
      ) : (
        <p className={textClass}>No assignments found for this unit yet.</p>
      )}
    </div>
  );
}
