import { useState } from "react";
type ResourceCardProps = {
  title: string;
  description: string;
  type: string;
  link: string;
  onOpen: () => void;
};
function getIcon(type: string) {
  switch (type) {
    case "YouTube":
      return "📺";
    case "Practice":
      return "💻";
    case "Roadmap":
      return "🛣️";
    case "Notes":
      return "📄";
    default:
      return "📚";
  }
}
export default function ResourceCard({
  title,
  description,
  type,
  link,
  onOpen,
}: ResourceCardProps) {
  const [favorite, setFavorite] = useState(false);
  return (
    <div className="glass border border-slate-700 rounded-2xl p-6 hover:border-blue-500 hover:shadow-elegant hover:-translate-y-2 hover:scale-105 transition-all duration-300">
      <div className="flex justify-between items-center">
  <h2 className="text-xl font-semibold">{title}</h2>

  <div className="flex items-center gap-2">
    <button
      onClick={() => setFavorite(!favorite)}
      className="text-xl"
    >
      {favorite ? "❤️" : "🤍"}
    </button>

    <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300">
      {getIcon(type)} {type}
    </span>
  </div>
</div>
        
      <p className="mt-3 text-sm text-muted-foreground">
        {description}
      </p>

      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onOpen}
        className="inline-block mt-5 px-4 py-2 rounded-lg bg-primary text-white hover:scale-105 hover:opacity-90 transition-all duration-300"
      >
        🚀 Open Resource
      </a>
    </div>
  );
}