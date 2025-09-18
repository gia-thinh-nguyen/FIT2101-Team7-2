"use client";

import UnitPieChart from "@/components/UnitPieChart";
import { useTheme } from "./context/ThemeContext";

// -------------------- TYPES --------------------
interface Assessment {
  id: string;
  title: string;
  type: "assignment" | "exam";
  status: "Not Started" | "In Progress" | "Completed";
  weight: number;
}

interface Unit {
  id: string;
  name: string;
  coordinator: string;
  credits: number;
  assessments: Assessment[];
  weeks: number;
}

interface Student {
  name: string;
  totalCredits: number;
  requiredCredits: number;
  units: Unit[];
}

// -------------------- COMPONENT --------------------
export default function Page() {
  const { cardClass, buttonClass, textClass } = useTheme();

  const student: Student = {
    name: "Saketh Vinukonda",
    totalCredits: 0,
    requiredCredits: 24,
    units: [
      {
        id: "ENG101",
        name: "Engineering Mathematics",
        coordinator: "Dr. Smith",
        credits: 6,
        weeks: 12,
        assessments: [
          { id: "A1", title: "Assignment 1", type: "assignment", status: "Completed", weight: 25 },
          { id: "A2", title: "Assignment 2", type: "assignment", status: "Completed", weight: 25 },
          { id: "EX", title: "Final Exam", type: "exam", status: "Completed", weight: 50 },
        ],
      },
      {
        id: "ENG102",
        name: "Mechanics",
        coordinator: "Prof. Lee",
        credits: 6,
        weeks: 12,
        assessments: [
          { id: "A1", title: "Assignment 1", type: "assignment", status: "Completed", weight: 25 },
          { id: "A2", title: "Assignment 2", type: "assignment", status: "In Progress", weight: 25 },
          { id: "EX", title: "Final Exam", type: "exam", status: "In Progress", weight: 50 },
        ],
      },
      {
        id: "ENG103",
        name: "Electrical Systems",
        coordinator: "Dr. Patel",
        credits: 6,
        weeks: 12,
        assessments: [
          { id: "A1", title: "Assignment 1", type: "assignment", status: "Completed", weight: 25 },
          { id: "A2", title: "Assignment 2", type: "assignment", status: "Not Started", weight: 25 },
          { id: "EX", title: "Final Exam", type: "exam", status: "Not Started", weight: 50 },
        ],
      },
      {
        id: "ENG104",
        name: "Materials Engineering",
        coordinator: "Prof. Nguyen",
        credits: 6,
        weeks: 12,
        assessments: [
          { id: "A1", title: "Assignment 1", type: "assignment", status: "Not Started", weight: 25 },
          { id: "A2", title: "Assignment 2", type: "assignment", status: "Not Started", weight: 25 },
          { id: "EX", title: "Final Exam", type: "exam", status: "Not Started", weight: 50 },
        ],
      },
    ],
  };

  // -------------------- FUNCTIONS --------------------
  const calculateCredits = (unit: Unit) =>
    unit.assessments.every(a => a.status === "Completed") ? unit.credits : 0;

  student.totalCredits = student.units.reduce(
    (sum, unit) => sum + calculateCredits(unit),
    0
  );

  const pieData = student.units.map(unit => ({
    name: unit.name,
    value: unit.assessments
      .filter(a => a.status === "Completed")
      .reduce((sum, a) => sum + a.weight, 0),
  }));

  // -------------------- RENDER --------------------
  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className={`flex items-center justify-between mb-8 p-4 shadow-lg rounded-xl ${cardClass}`}>
        <h1 className={`text-2xl font-bold ${textClass}`}>
          Welcome, {student.name}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Units Section */}
        <div className="lg:col-span-2 space-y-6">
          {student.units.map(unit => (
            <div key={unit.id} className={`p-6 rounded-xl shadow hover:shadow-lg transition ${cardClass}`}>
              <h2 className={`text-xl font-bold mb-1 ${textClass}`}>{unit.name}</h2>
              <p className={`text-sm mb-2 ${textClass}`}>
                Code: {unit.id} | Coordinator: {unit.coordinator} | Weeks: {unit.weeks}
              </p>
              <p className={`font-semibold mb-3 ${textClass}`}>
                Credits Earned: {calculateCredits(unit)} / {unit.credits}
              </p>

              {/* Assessments */}
              <div className="h-48 overflow-y-auto space-y-2">
                {unit.assessments.map(a => (
                  <div
                    key={a.id}
                    className={`flex justify-between items-center p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer ${cardClass}`}
                  >
                    <div>
                      <h3 className={`font-semibold ${textClass}`}>{a.title}</h3>
                      <p className={`text-sm ${textClass}`}>
                        {a.type === "assignment" ? `${a.weight}%` : `${a.weight}% (Exam)`}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      a.status === "Completed" ? "bg-green-100 text-green-800" :
                      a.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-gray-100 text-gray-600"
                    }`}>{a.status}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Progress Tracker + Pie Chart */}
        <div className="flex flex-col gap-6">
          <div className={`p-6 shadow-lg rounded-xl ${cardClass}`}>
            <h2 className={`text-xl font-bold mb-4 ${textClass}`}>Progress Tracker</h2>
            <div className="space-y-4">
              {[
                { title: "Total Credits", value: student.totalCredits, description: `You have earned ${student.totalCredits} out of ${student.requiredCredits} required credits.` },
                { title: "Units Enrolled", value: student.units.length, description: `You are currently enrolled in ${student.units.length} units this semester.` },
                { title: "Assessments Completed", value: student.units.flatMap(u => u.assessments).filter(a => a.status === "Completed").length, description: "Number of assignments and exams you have completed so far." },
                { title: "Assessments In Progress", value: student.units.flatMap(u => u.assessments).filter(a => a.status === "In Progress").length, description: "Number of assignments or exams currently in progress." },
              ].map((item, idx) => (
                <div key={idx} className={`p-4 rounded-lg shadow ${cardClass}`}>
                  <h3 className={`font-semibold ${textClass}`}>{item.title}</h3>
                  <p className={`text-2xl font-bold ${textClass}`}>{item.value}</p>
                  <p className={`text-sm ${textClass}`}>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`p-6 shadow-lg rounded-xl ${cardClass}`}>
            <h2 className={`text-xl font-bold mb-4 ${textClass}`}>Unit Completion</h2>
            <UnitPieChart data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}
