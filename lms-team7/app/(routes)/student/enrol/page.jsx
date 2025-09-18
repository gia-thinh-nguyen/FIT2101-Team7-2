"use client";
import { useTheme } from "../context/ThemeContext";

export default function EnrolPage() {
  const { cardClass, buttonClass, textClass } = useTheme();
  const courses = ["ENG201", "ENG202", "ENG203", "ENG204"];

  return (
    <div className="space-y-4">
      <h2 className={`text-2xl font-bold ${textClass}`}>Course Enrolment</h2>
      <p className={textClass}>Select new courses to enrol:</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course}
            className={`p-4 rounded-lg shadow flex justify-between items-center ${cardClass}`}
          >
            <span className={textClass}>{course}</span>
            <button
              className={`px-3 py-1 rounded ${buttonClass}`}
              aria-label={`Enrol in ${course}`}
            >
              Enrol
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
