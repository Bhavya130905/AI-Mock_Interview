import { Card, CardContent } from "@/components/ui/card";

const questionCounts = [
  {
    value: 10,
    title: "Quick Practice",
    duration: "~15 mins",
    icon: "⚡",
  },
  {
    value: 20,
    title: "Standard Interview",
    duration: "~30 mins",
    icon: "🎯",
  },
  {
    value: 30,
    title: "Complete Assessment",
    duration: "~45 mins",
    icon: "🚀",
  },
];

interface QuestionCountSelectorProps {
  selected: number;
  onSelect: (value: number) => void;
}

export default function QuestionCountSelector({ selected, onSelect }: QuestionCountSelectorProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">
        Number of Questions
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {questionCounts.map((item) => (
          <Card
            key={item.value}
            onClick={() => onSelect(item.value)}
            className={`cursor-pointer transition-all duration-300 bg-white/5 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/20 ${
              selected === item.value ? "border-violet-500 ring-2 ring-violet-500/50 scale-105" : "hover:border-violet-500"
            }`}
          >
            <CardContent className="p-5 text-center">
              <div className="text-4xl">
                {item.icon}
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                {item.value} Questions
              </h3>

              <p className="mt-2 text-sm text-gray-400">
                {item.title}
              </p>

              <p className="mt-3 text-xs text-violet-300">
                {item.duration}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}