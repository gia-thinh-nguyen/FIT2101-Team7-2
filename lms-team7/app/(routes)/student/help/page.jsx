export default function HelpPage() {
  const teachers = [
    { name: "Dr. Smith", email: "smith@university.edu", room: "B201" },
    { name: "Prof. Lee", email: "lee@university.edu", room: "C305" },
    { name: "Dr. Patel", email: "patel@university.edu", room: "A101" },
    { name: "Prof. Nguyen", email: "nguyen@university.edu", room: "E409" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
      <div className="space-y-4">
        {teachers.map((t) => (
          <div key={t.email} className="p-4 bg-blue-50 rounded-lg shadow">
            <h3 className="font-semibold">{t.name}</h3>
            <p>Email: {t.email}</p>
            <p>Room: {t.room}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
