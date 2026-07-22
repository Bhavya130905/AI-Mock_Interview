import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/app/PageHeader";
import { Building2, Calendar, DollarSign, MapPin, Search } from "lucide-react";

export const Route = createFileRoute("/_app/placements")({
  component: PlacementsPage,
  head: () => ({ meta: [{ title: "Placements — CareerPilot AI" }] }),
});

const jobs = [
  { company: "Google", role: "SDE Intern", ctc: "1.8L/mo", loc: "Bangalore", deadline: "Jul 20", match: 92, tag: "On-campus" },
  { company: "Microsoft", role: "SDE-1", ctc: "44 LPA", loc: "Hyderabad", deadline: "Jul 25", match: 88, tag: "Full-time" },
  { company: "Razorpay", role: "Backend Engineer", ctc: "28 LPA", loc: "Remote", deadline: "Jul 22", match: 84, tag: "Off-campus" },
  { company: "Zomato", role: "Frontend Engineer", ctc: "22 LPA", loc: "Gurgaon", deadline: "Jul 30", match: 79, tag: "Full-time" },
  { company: "Atlassian", role: "SWE Intern", ctc: "1.2L/mo", loc: "Bangalore", deadline: "Aug 2", match: 76, tag: "On-campus" },
];

const applied = [
  { company: "Google", stage: "OA cleared", next: "Technical R1 · Jul 15" },
  { company: "Amazon", stage: "Applied", next: "Awaiting OA" },
  { company: "Flipkart", stage: "R2 cleared", next: "HR · Jul 14" },
];

function PlacementsPage() {
  return (
    <>
      <PageHeader
        title={<><span className="text-gradient">Placements</span> & Opportunities</>}
        subtitle="Curated roles matched to your profile."
      />

      <div className="glass rounded-2xl p-3 flex items-center gap-3 mb-6">
        <Search className="h-4 w-4 text-muted-foreground ml-2" />
        <input placeholder="Search by company, role, location..." className="flex-1 bg-transparent outline-none text-sm py-1" />
        <button className="btn-primary rounded-xl px-4 py-2 text-sm">Filters</button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {jobs.map((j) => (
            <div key={j.company + j.role} className="glass rounded-2xl p-5 hover:bg-white/5 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl btn-primary">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{j.role}</div>
                    <div className="text-xs text-muted-foreground">{j.company} · {j.tag}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gradient">{j.match}% match</div>
                  <div className="text-xs text-muted-foreground">Deadline {j.deadline}</div>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><DollarSign className="h-3.5 w-3.5" /> {j.ctc}</span>
                <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {j.loc}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Apply by {j.deadline}</span>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="btn-primary rounded-xl px-4 py-2 text-sm font-medium">Apply</button>
                <button className="glass rounded-xl px-4 py-2 text-sm">Save</button>
              </div>
            </div>
          ))}
        </div>

        <aside className="space-y-6">
          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-sm mb-4">Your applications</h3>
            <div className="space-y-3">
              {applied.map((a) => (
                <div key={a.company} className="rounded-xl bg-white/5 p-3">
                  <div className="text-sm font-medium">{a.company}</div>
                  <div className="text-xs text-primary-glow mt-0.5">{a.stage}</div>
                  <div className="text-xs text-muted-foreground mt-1">{a.next}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-sm mb-2">Placement stats</h3>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div>
                <div className="text-2xl font-bold text-gradient">12</div>
                <div className="text-xs text-muted-foreground">Applied</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">5</div>
                <div className="text-xs text-muted-foreground">Interviews</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gradient">2</div>
                <div className="text-xs text-muted-foreground">Offers</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
