// app/(routes)/student/units/[unitId]/week/[week]/page.tsx

type Lesson = { title: string; description: string };

// simple mock data - swap to DB later
const lessonsData: Record<string, Record<number, Lesson[]>> = {
  ENG101: {
    1: [
      { title: "Limits & Continuity", description: "Intro to limits, epsilon-delta idea." },
      { title: "Tutorial 1", description: "Limit manipulation exercises." },
    ],
    2: [
      { title: "Derivatives I", description: "Definition & basic rules." },
      { title: "Tutorial 2", description: "Product/Quotient rule drills." },
    ],
  },
  ENG102: { 1: [{ title: "Statics Basics", description: "Free-body diagrams." }] },
  ENG103: { 1: [{ title: "Circuits 101", description: "Ohm’s law, KCL/KVL." }] },
  ENG104: { 1: [{ title: "Crystal Structures", description: "Lattices & packing." }] },
};

import LessonsClient from "./LessonsClient";


export default function WeekPage({
  params,
}: {
  params: { unitId: string; week: string };
}) {
  const unitId = params.unitId;
  const weekNum = Number(params.week);

  const lessons = lessonsData[unitId]?.[weekNum] ?? [];
  return <LessonsClient unitId={unitId} week={weekNum} lessons={lessons} />;
}
