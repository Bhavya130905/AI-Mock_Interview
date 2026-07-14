import { Card, CardContent } from "@/components/ui/card";

const subjects = [
  {
    id: "dsa",
    title: "Data Structures & Algorithms",
    subtitle: "Top 100 Interview Questions",
    icon: "🧠",
  },
  {
    id: "oops",
    title: "Object Oriented Programming",
    subtitle: "Core OOP Concepts",
    icon: "⚙️",
  },
  {
    id: "os",
    title: "Operating Systems",
    subtitle: "Process • Threads • Memory",
    icon: "💻",
  },
  {
    id: "dbms",
    title: "Database Management System",
    subtitle: "SQL • Transactions • Normalization",
    icon: "🗄️",
  },
  {
    id: "cn",
    title: "Computer Networks",
    subtitle: "TCP/IP • HTTP • Routing",
    icon: "🌐",
  },
];

export default function SubjectSelector() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Select Interview Subject
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {subjects.map((subject) => (
          <Card
            key={subject.id}
            className="cursor-pointer transition-all duration-300 border-white/10 bg-white/5 hover:border-violet-500 hover:shadow-xl hover:shadow-violet-500/20"
          >
            <CardContent className="p-5">
              <div className="text-3xl">
                {subject.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {subject.title}
              </h3>

              <p className="text-sm text-gray-400 mt-2">
                {subject.subtitle}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}