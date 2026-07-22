import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Heart, MessageCircle, Share2, TrendingUp, Users } from "lucide-react";

export const Route = createFileRoute("/_app/community")({
  component: CommunityPage,
  head: () => ({ meta: [{ title: "Community — CareerPilot AI" }] }),
});

const posts = [
  {
    author: "Priya Sharma",
    role: "Placed at Microsoft · SDE",
    time: "2h",
    text: "Cracked Microsoft SDE! Key thing that worked: focused DSA + system design for 8 weeks using CareerPilot's roadmap. AMA below 👇",
    likes: 128, comments: 34,
  },
  {
    author: "Rohan Verma",
    role: "Final year · IIT Bombay",
    time: "5h",
    text: "How are folks preparing for behavioral rounds at product companies? Any framework beyond STAR?",
    likes: 42, comments: 18,
  },
  {
    author: "Ananya Iyer",
    role: "Placed at Razorpay · Backend",
    time: "1d",
    text: "Sharing my complete resume template that got 3 offers. DM if you want the Figma file. Big win: quantified everything.",
    likes: 210, comments: 67,
  },
];

const leaderboard = [
  { name: "Aditya R.", xp: 4820, streak: 42 },
  { name: "Meera K.", xp: 4610, streak: 38 },
  { name: "Karan S.", xp: 4300, streak: 31 },
  { name: "Fatima A.", xp: 4180, streak: 29 },
  { name: "You", xp: 3920, streak: 7 },
];

function CommunityPage() {
  return (
    <>
      <PageHeader
        title={<>The <span className="text-gradient">Community</span></>}
        subtitle="Learn from peers who've cracked their dream roles."
      />

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="glass rounded-2xl p-4 flex gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full btn-primary text-sm font-semibold shrink-0">A</div>
            <input placeholder="Share a win or ask a question..." className="flex-1 bg-transparent outline-none text-sm" />
            <button className="btn-primary rounded-xl px-4 py-2 text-sm font-medium">Post</button>
          </div>

          {posts.map((p) => (
            <article key={p.author + p.time} className="glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full btn-primary text-sm font-semibold">
                  {p.author.split(" ").map((s) => s[0]).join("")}
                </div>
                <div>
                  <div className="font-medium text-sm">{p.author}</div>
                  <div className="text-xs text-muted-foreground">{p.role} · {p.time}</div>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed">{p.text}</p>
              <div className="mt-4 flex items-center gap-5 text-sm text-muted-foreground">
                <button className="inline-flex items-center gap-1.5 hover:text-rose-400"><Heart className="h-4 w-4" /> {p.likes}</button>
                <button className="inline-flex items-center gap-1.5 hover:text-primary-glow"><MessageCircle className="h-4 w-4" /> {p.comments}</button>
                <button className="inline-flex items-center gap-1.5 hover:text-foreground"><Share2 className="h-4 w-4" /></button>
              </div>
            </article>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp className="h-4 w-4 text-primary-glow" />
              <h3 className="font-semibold text-sm">Leaderboard</h3>
            </div>
            <ol className="space-y-3">
              {leaderboard.map((l, i) => (
                <li key={l.name} className={`flex items-center justify-between text-sm ${l.name === "You" ? "text-primary-glow font-medium" : ""}`}>
                  <span className="flex items-center gap-3">
                    <span className="w-5 text-muted-foreground">{i + 1}</span>
                    <span>{l.name}</span>
                  </span>
                  <span className="text-xs text-muted-foreground">{l.xp} XP</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-4 w-4 text-primary-glow" />
              <h3 className="font-semibold text-sm">Popular Circles</h3>
            </div>
            <div className="space-y-2">
              {["#faang-prep", "#resume-review", "#system-design", "#internship-2026", "#women-in-tech"].map((c) => (
                <a key={c} href="#" className="block glass rounded-xl px-3 py-2 text-sm hover:bg-white/5">{c}</a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
