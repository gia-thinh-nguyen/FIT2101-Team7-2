"use client";

import { useState } from "react";
import Link from "next/link";

interface Assignment {
  title: string;
  dueDate: string;
  status: "Submitted" | "Pending" | "Overdue";
  description: string;
}

export default function AssignmentsPage({
  params,
}: {
  params: { courseId: string };
}) {
  const { courseId } = params;

  // Dummy assignments for now (later replace with fetch call)
  const [assignments] = useState<Assignment[]>([
    {
      title: "Assignment 1",
      dueDate: "2023-10-01",
      status: "Submitted",
      description: "Complete chapters 1-3 exercises",
    },
    {
      title: "Midterm Exam",
      dueDate: "2023-10-15",
      status: "Pending",
      description: "Online midterm examination",
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
        Assignments for Course: {courseId}
      </h1>

      {/* Assignments List */}
      <div className="grid gap-6">
        {assignments.length > 0 ? (
          assignments.map((assignment, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-semibold">{assignment.title}</h2>
                  <p className="text-gray-600 mt-1">
                    {assignment.description}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    assignment.status === "Submitted"
                      ? "bg-green-100 text-green-800"
                      : assignment.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {assignment.status}
                </span>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">
                  Due Date: {assignment.dueDate}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No assignments available.</p>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex space-x-4">
        <Link
          href={`/student/courses/${courseId}/grades`}
          className="text-blue-600 hover:underline"
        >
          View Grades
        </Link>
        <Link
          href={`/student/courses/${courseId}/assignments`}
          className="text-blue-600 hover:underline"
        >
          Refresh Assignments
        </Link>
      </div>
    </div>
  );
}
