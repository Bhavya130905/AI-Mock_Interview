import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Rocket } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Sign in — CareerPilot AI" }] }),
});

function LoginPage() {
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
        <h1 className="mt-6 text-3xl font-bold">Welcome back</h1>
        <p className="mt-2 text-sm text-muted-foreground">Sign in to continue your placement prep.</p>
        <form className="mt-8 space-y-3">
          <input type="email" placeholder="Email" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <input type="password" placeholder="Password" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <label className="flex items-center gap-2"><input type="checkbox" /> Remember me</label>
            <a href="#" className="hover:text-foreground">Forgot password?</a>
          </div>
          <button type="button" onClick={() => navigate({ to: "/dashboard" })} className="w-full btn-primary rounded-xl px-6 py-3 font-medium">Sign in</button>
        </form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          New here? <Link to="/signup" className="text-primary-glow hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}
