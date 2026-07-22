import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Rocket } from "lucide-react";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({ meta: [{ title: "Create account — CareerPilot AI" }] }),
});

function SignupPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen grid place-items-center px-6 py-12">
      <div className="glass w-full max-w-md rounded-3xl p-8 shadow-elegant">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl btn-primary">
            <Rocket className="h-5 w-5" />
          </div>
          <span className="font-semibold">CareerPilot <span className="text-gradient">AI</span></span>
        </Link>
        <h1 className="mt-6 text-3xl font-bold">Create your account</h1>
        <p className="mt-2 text-sm text-muted-foreground">Start your AI-guided placement journey.</p>
        <form className="mt-8 space-y-3">
          <input placeholder="Full name" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <input type="email" placeholder="Email" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="College" className="glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
            <input placeholder="Branch" className="glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          </div>
          <input placeholder="Graduation year" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <input type="password" placeholder="Password" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <button type="button" onClick={() => navigate({ to: "/dashboard" })} className="w-full btn-primary rounded-xl px-6 py-3 font-medium">Create account</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already registered? <Link to="/login" className="text-primary-glow hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
