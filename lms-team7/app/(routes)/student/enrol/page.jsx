export default function EnrolPage() {
  const courses = ["ENG201", "ENG202", "ENG203", "ENG204"];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Course Enrolment</h2>
      <p>Select new courses to enrol in:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {courses.map((course) => (
          <div
            key={course}
            className="p-4 bg-blue-50 rounded-lg shadow flex justify-between items-center"
          >
            <span>{course}</span>
            <button className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Enrol
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
