// app/(routes)/student/assignments/[unitId]/page.tsx

type Assignment = {
  id: string;
  title: string;
  dueAt: string;   // e.g. "2025-10-03 23:59"
  weight: number;  // percentage of unit grade
  status: "Open" | "Closed";
  description?: string;
};

// Mock data for now — swap with DB query later
const assignmentsData: Record<string, Assignment[]> = {
  ENG101: [
    { id: "A1", title: "Limits Problem Set", dueAt: "2025-10-03 23:59", weight: 15, status: "Open", description: "Limits & continuity." },
    { id: "A2", title: "Derivatives Mini-Project", dueAt: "2025-10-17 23:59", weight: 25, status: "Open" },
    { id: "A3", title: "Midterm", dueAt: "2025-11-07 09:00", weight: 30, status: "Closed" },
  ],
  ENG102: [
    { id: "A1", title: "Statics Worksheet", dueAt: "2025-10-05 23:59", weight: 20, status: "Open" },
  ],
  ENG103: [
    { id: "A1", title: "Circuits Lab 1", dueAt: "2025-10-10 23:59", weight: 15, status: "Open" },
  ],
  ENG104: [
    { id: "A1", title: "Crystal Structures Quiz", dueAt: "2025-10-08 12:00", weight: 10, status: "Open" },
  ],
};

import AssignmentsClient from "./AssignmentsClient";

export default function AssignmentsPage({ params }: { params: { unitId: string } }) {
  const unitId = params.unitId;
  const assignments = assignmentsData[unitId] ?? [];
  return <AssignmentsClient unitId={unitId} assignments={assignments} />;
}
