import Dropdown from "../../../components/admin/Dropdown";

// Dummy data
const dummyAdmin = { name: "Admin John Doe" };
const dummyTeachers = ["Alice Smith", "Bob Johnson", "Chris Evans", "Dana White", "Eve Adams"];
const dummyStudents = ["Charlie Brown", "Daisy Miller", "Ethan Lee", "Fiona Green", "George King", "Hannah Scott"];
const dummyCourses = ["Math 101", "History 201", "Science 301", "Art 401"];

export default async function AdminPage() {

  return (
    <div className="flex min-h-screen">
      {/* Sidebar is assumed to be fixed at w-64, so add margin-left */}
      <div className="flex-1 flex justify-center items-start" style={{ marginLeft: '16rem' }}>
        <div className="p-8 max-w-2xl w-full mt-16">
          <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
          <div className="mb-4">
            <span className="font-semibold">Welcome, </span>
            <span className="text-blue-700 font-semibold">{dummyAdmin.name}</span>
          </div>
          <div className="space-y-4">
            <Dropdown label="Teachers" count={dummyTeachers.length} items={dummyTeachers} />
            <Dropdown label="Students" count={dummyStudents.length} items={dummyStudents} />
            <Dropdown label="Courses" count={dummyCourses.length} items={dummyCourses} />
          </div>
        </div>
      </div>
    </div>
  );
}