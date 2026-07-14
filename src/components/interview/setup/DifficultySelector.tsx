import { Card, CardContent } from "@/components/ui/card";

const difficulties = [
  {
    id: "easy",
    title: "Easy",
    color: "border-green-500",
    questions: "Basic Interview Questions",
    duration: "10-15 mins",
    emoji: "🟢",
  },
  {
    id: "medium",
    title: "Medium",
    color: "border-yellow-500",
    questions: "Most Asked Interview Questions",
    duration: "20-25 mins",
    emoji: "🟡",
  },
  {
    id: "hard",
    title: "Hard",
    color: "border-red-500",
    questions: "Advanced Company Level Questions",
    duration: "30-40 mins",
    emoji: "🔴",
  },
];

export default function DifficultySelector() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Select Difficulty
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {difficulties.map((level) => (
          <Card
            key={level.id}
            className={`cursor-pointer transition-all duration-300 bg-white/5 hover:scale-105 hover:shadow-xl ${level.color}`}
          >
            <CardContent className="p-5">
              <div className="text-3xl">
                {level.emoji}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {level.title}
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {level.questions}
              </p>

              <p className="mt-3 text-xs text-violet-300">
                {level.duration}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}