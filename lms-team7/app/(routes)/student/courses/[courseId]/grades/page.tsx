"use client";

import { useState } from "react";
import Link from "next/link";

interface Grade {
  assignmentName: string;
  dueDate: string;
  grade: string;
  maxScore: string;
  feedback: string;
}

export default function GradesPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;

  // Dummy data for now (replace with API call later)
  const [grades] = useState<Grade[]>([
    {
      assignmentName: "Assignment 1",
      dueDate: "2023-10-01",
      grade: "85",
      feedback: "Good work!",
      maxScore: "100",
    },
    {
      assignmentName: "Midterm Exam",
      dueDate: "2023-10-15",
      grade: "92",
      feedback: "Excellent performance",
      maxScore: "100",
    },
  ]);

  if (!courseId) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-600">Course Not Found</h1>
        <p className="mt-2">No courseId was provided in the URL.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Grades for Course: {courseId}
      </h1>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Assignment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Grade
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Feedback
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {grades.length > 0 ? (
              grades.map((grade, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.assignmentName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.dueDate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.grade}/{grade.maxScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {grade.feedback}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="px-6 py-4 text-center text-gray-500"
                >
                  No grades available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Navigation */}
      <div className="mt-8 flex space-x-4">
        <Link
          href={`/student/courses/${courseId}/assignments`}
          className="text-blue-600 hover:underline"
        >
          View Assignments
        </Link>
        <Link
          href={`/student/courses/${courseId}/grades`}
          className="text-blue-600 hover:underline"
        >
          Refresh Grades
        </Link>
      </div>
    </div>
  );
}
