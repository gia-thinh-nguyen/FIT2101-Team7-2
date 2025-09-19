"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "../../../../context/ThemeContext"; 
// path: from week -> [unitId] -> week -> units -> student -> context

type Lesson = { title: string; description: string };

export default function LessonsClient({
  unitId,
  week,
  lessons,
}: {
  unitId: string;
  week: number;
  lessons: Lesson[];
}) {
  const { cardClass, textClass, buttonClass } = useTheme();
  const router = useRouter();

  return (
    <div className={`space-y-4 p-4 rounded-lg ${cardClass}`}>
      <div className="flex items-center justify-between">
        <h2 className={`text-2xl font-bold ${textClass}`}>
          {unitId} — Week {week} Lessons
        </h2>
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

      {lessons.length ? (
        <div className="space-y-3">
          {lessons.map((l, i) => (
            <div
              key={i}
              className={`p-3 rounded-md shadow ${cardClass}`}
            >
              <div className={`font-semibold ${textClass}`}>{l.title}</div>
              <div className={textClass}>{l.description}</div>
            </div>
          ))}
        </div>
      ) : (
        <p className={textClass}>No lessons found for this week yet.</p>
      )}
    </div>
  );
}
