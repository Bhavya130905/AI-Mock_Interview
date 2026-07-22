import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import ResourceCard from "../components/learning/ResourceCard";
import { dsaResources } from "../data/dsa";
import { dbmsResources } from "../data/dbms";
import { osResources } from "../data/os";
import { cnResources } from "../data/cn";
import { oopResources } from "../data/oop";
import { aiResources } from "../data/ai";
export const Route = createFileRoute("/learning-resources")({
  component: LearningResources,
});

function LearningResources() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("DSA");
    const [opened, setOpened] = useState(0);

let resources = dsaResources;

if (category === "DBMS") resources = dbmsResources;
if (category === "OS") resources = osResources;
if (category === "CN") resources = cnResources;
if (category === "OOP") resources = oopResources;
if (category === "AI") resources = aiResources;

const filteredResources = resources.filter((resource) =>
  resource.title.toLowerCase().includes(search.toLowerCase())
);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center">
          Learning Resources
        </h1>

        <p className="text-center text-gray-400 mt-3">
          Everything you need to prepare for placements.
        </p>
        <p className="text-center text-blue-400 mt-2">
          Showing {filteredResources.length} resources for {category}
        </p>
        <p className="text-center text-green-400 mt-2">
          Resources Opened: {opened}
        </p>

        <input
  type="text"
  placeholder="Search resources..."
  value={search}
  
  onChange={(e) => setSearch(e.target.value)}
  className="w-full mt-10 p-4 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
/>
<select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full mt-4 p-4 rounded-xl bg-slate-800 border border-slate-700"
>
  <option>DSA</option>
  <option>DBMS</option>
  <option>OS</option>
  <option>CN</option>
  <option>OOP</option>
  <option>AI</option>
</select>
<div className="flex flex-wrap gap-3 mt-6">
  {["DSA", "DBMS", "OS", "CN", "OOP", "AI"].map((item) => (
    <button
      key={item}
      onClick={() => setCategory(item)}
      className={`px-5 py-2 rounded-lg transition ${
        category === item
          ? "bg-blue-600 text-white"
          : "bg-slate-800 hover:bg-slate-700"
      }`}
    >
      {item}
    </button>
  ))}
</div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          {filteredResources.map((resource) => (
            <ResourceCard
              key={resource.title}
              title={resource.title}
              description={resource.description}
              type={resource.type}
              link={resource.link}
              onOpen={() => setOpened(opened + 1)}
            />
          ))}
          {filteredResources.length === 0 && (
  <p className="text-center text-gray-400 col-span-3">
    No resources found.
  </p>
)}
        </div>
      </div>
    </div>
  );
}