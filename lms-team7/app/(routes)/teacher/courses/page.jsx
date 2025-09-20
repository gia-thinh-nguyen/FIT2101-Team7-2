"use client";
import React, { useState } from "react";

// Dummy data for demonstration
const dummyTeachers = [
  { id: 1, name: "Aadi Kapoor" },
  { id: 2, name: "Ankit Kakanoor" },
  { id: 3, name: "Tim Nguyen" },
  { id: 4, name: "Saketh Vinukonda" },
  { id: 5, name: "Kinglsey Wong" },
  { id: 6, name: "Maheshan Peiris" },
];

const initialStudents = [
  { id: 1, name: "Student One" },
  { id: 2, name: "Student Two" },
  { id: 3, name: "Student Three" },
];

const dummyCourses = [
  {
    id: "CS101",
    title: "Intro to Computer Science",
    credits: 3,
    status: "active",
    director: dummyTeachers[0],
    lessons: ["Lesson 1", "Lesson 2"],
    students: [initialStudents[0], initialStudents[1]],
    grades: { 1: "A", 2: "B" },
  },
  {
    id: "MATH201",
    title: "Calculus I",
    credits: 4,
    status: "inactive",
    director: dummyTeachers[1],
    lessons: ["Limits", "Derivatives"],
    students: [initialStudents[2]],
    grades: { 3: "A-" },
  },
];

export default function CoursesDashboard() {
  const [courses, setCourses] = useState(dummyCourses);
  const [students, setStudents] = useState(initialStudents);
  const [showCreate, setShowCreate] = useState(false);
  const [showCreateStudent, setShowCreateStudent] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editIdx, setEditIdx] = useState(null);
  const [editCourse, setEditCourse] = useState({
    title: "",
    id: "",
    credits: "",
    status: "active",
    director: dummyTeachers[0].id,
    lessons: [],
  });
  const [newCourse, setNewCourse] = useState({
    title: "",
    id: "",
    credits: "",
    status: "active",
    director: dummyTeachers[0].id,
    lessons: [],
    students: [],
  });
  const [newStudent, setNewStudent] = useState({
    name: "",
  });

  // Handlers for creating a course
  const handleCreateCourse = () => {
    setCourses([
      ...courses,
      {
        ...newCourse,
        director: dummyTeachers.find(t => t.id === Number(newCourse.director)),
        lessons: [],
        students: [],
        grades: {},
      },
    ]);
    setShowCreate(false);
    setNewCourse({
      title: "",
      id: "",
      credits: "",
      status: "active",
      director: dummyTeachers[0].id,
      lessons: [],
      students: [],
    });
  };

  // Handler for creating a student
  const handleCreateStudent = () => {
    if (newStudent.name.trim() === "") return;
    const newId = students.length ? Math.max(...students.map(s => s.id)) + 1 : 1;
    setStudents([...students, { id: newId, name: newStudent.name }]);
    setShowCreateStudent(false);
    setNewStudent({ name: "" });
  };

  // Handler for assigning/reassigning director
  const handleDirectorChange = (courseIdx, teacherId) => {
    const updated = [...courses];
    updated[courseIdx].director = dummyTeachers.find(t => t.id === Number(teacherId));
    setCourses(updated);
  };

  // Handler for deleting
  const handleDeleteCourse = (courseIdx) => {
    setCourses(courses.filter((_, idx) => idx !== courseIdx));
  };

  // Handler for enrolling/dropping students
  const handleEnrollStudent = (courseIdx, studentId) => {
    const updated = [...courses];
    const student = students.find(s => s.id === Number(studentId));
    if (!updated[courseIdx].students.some(s => s.id === student.id)) {
      updated[courseIdx].students.push(student);
    }
    setCourses(updated);
  };
  const handleDropStudent = (courseIdx, studentId) => {
    const updated = [...courses];
    updated[courseIdx].students = updated[courseIdx].students.filter(s => s.id !== studentId);
    setCourses(updated);
  };

  // Handler for editing a course
  const handleEditCourse = (idx) => {
    const course = courses[idx];
    setEditCourse({
      title: course.title,
      id: course.id,
      credits: course.credits,
      status: course.status,
      director: course.director.id,
      lessons: course.lessons.join(", "),
    });
    setEditIdx(idx);
    setShowEdit(true);
  };

  const handleSaveEditCourse = () => {
    const updated = [...courses];
    updated[editIdx] = {
      ...updated[editIdx],
      title: editCourse.title,
      id: editCourse.id,
      credits: editCourse.credits,
      status: editCourse.status,
      director: dummyTeachers.find(t => t.id === Number(editCourse.director)),
      lessons: editCourse.lessons.split(",").map(l => l.trim()).filter(l => l),
    };
    setCourses(updated);
    setShowEdit(false);
    setEditIdx(null);
    setEditCourse({
      title: "",
      id: "",
      credits: "",
      status: "active",
      director: dummyTeachers[0].id,
      lessons: [],
    });
  };

  return (
    <div className="p-8" style={{ marginLeft: '4rem' }}>
      <h1 className="text-2xl font-bold text-green-700 mb-6">Course Management</h1>
      <div className="flex gap-4 mb-6">
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCreate(true)}
        >
          Create New Course
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => setShowCreateStudent(true)}
        >
          Create New Student
        </button>
      </div>

      {/* Create Course Modal */}
      {showCreate && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Course</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Course Title"
              value={newCourse.title}
              onChange={e => setNewCourse({ ...newCourse, title: e.target.value })}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Course ID"
              value={newCourse.id}
              onChange={e => setNewCourse({ ...newCourse, id: e.target.value })}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Total Credits"
              type="number"
              value={newCourse.credits}
              onChange={e => setNewCourse({ ...newCourse, credits: e.target.value })}
            />
            <select
              className="border p-2 mb-2 w-full"
              value={newCourse.status}
              onChange={e => setNewCourse({ ...newCourse, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={newCourse.director}
              onChange={e => setNewCourse({ ...newCourse, director: e.target.value })}
            >
              {dummyTeachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleCreateCourse}>Create</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowCreate(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Course Modal */}
      {showEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Edit Course</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Course Title"
              value={editCourse.title}
              onChange={e => setEditCourse({ ...editCourse, title: e.target.value })}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Course ID"
              value={editCourse.id}
              onChange={e => setEditCourse({ ...editCourse, id: e.target.value })}
            />
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Total Credits"
              type="number"
              value={editCourse.credits}
              onChange={e => setEditCourse({ ...editCourse, credits: e.target.value })}
            />
            <select
              className="border p-2 mb-2 w-full"
              value={editCourse.status}
              onChange={e => setEditCourse({ ...editCourse, status: e.target.value })}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              className="border p-2 mb-2 w-full"
              value={editCourse.director}
              onChange={e => setEditCourse({ ...editCourse, director: e.target.value })}
            >
              {dummyTeachers.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Lessons (comma separated)"
              value={editCourse.lessons}
              onChange={e => setEditCourse({ ...editCourse, lessons: e.target.value })}
            />
            <div className="flex gap-2 mt-4">
              <button className="bg-green-600 text-white px-4 py-2 rounded" onClick={handleSaveEditCourse}>Save</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowEdit(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Student Modal */}
      {showCreateStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-lg font-bold mb-4">Create Student</h2>
            <input
              className="border p-2 mb-2 w-full"
              placeholder="Student Name"
              value={newStudent.name}
              onChange={e => setNewStudent({ ...newStudent, name: e.target.value })}
            />
            <div className="flex gap-2 mt-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCreateStudent}>Create</button>
              <button className="bg-gray-300 px-4 py-2 rounded" onClick={() => setShowCreateStudent(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courses.map((course, idx) => (
          <div key={course.id} className="bg-white shadow-lg rounded-lg p-6 mb-4">
            <div className="flex justify-between items-center mb-2">
              <div>
                <h2 className="text-xl font-bold text-green-700">{course.title}</h2>
                <div className="text-gray-600">ID: {course.id}</div>
                <div className="text-gray-600">Status: {course.status}</div>
                <div className="text-gray-600">Credits: {course.credits}</div>
                <div className="text-gray-600">Director: 
                  <select
                    className="ml-2 border p-1"
                    value={course.director.id}
                    onChange={e => handleDirectorChange(idx, e.target.value)}
                  >
                    {dummyTeachers.map(t => (
                      <option key={t.id} value={t.id}>{t.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="bg-yellow-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleEditCourse(idx)}>Edit</button>
                <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleDeleteCourse(idx)}>Delete</button>
              </div>
            </div>
            <div className="mb-2">
              <strong>Lessons:</strong> {course.lessons.join(", ") || "None"}
            </div>
            <div className="mb-2">
              <strong>Students Enrolled:</strong> {course.students.length}
              <div className="flex gap-2 mt-1 flex-wrap">
                {course.students.map(s => (
                  <span key={s.id} className="bg-gray-200 px-2 py-1 rounded text-xs flex items-center">
                    {s.name}
                    <button className="ml-2 text-red-500" onClick={() => handleDropStudent(idx, s.id)}>✕</button>
                  </span>
                ))}
                <select
                  className="border p-1 text-xs"
                  onChange={e => handleEnrollStudent(idx, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Enroll Student</option>
                  {students.filter(s => !course.students.some(cs => cs.id === s.id)).map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-2">
              <strong>Grades:</strong>
              <ul>
                {Object.entries(course.grades).map(([sid, grade]) => {
                  const student = students.find(s => s.id === Number(sid));
                  return (
                    <li key={sid}>{student?.name}: {grade}</li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}