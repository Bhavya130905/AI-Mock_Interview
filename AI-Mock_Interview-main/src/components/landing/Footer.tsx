import { Rocket } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-10">
      <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg btn-primary">
            <Rocket className="h-4 w-4" />
          </div>
          <span className="text-sm font-medium">
            CareerPilot <span className="text-gradient">AI</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} CareerPilot AI. Built for the next generation of engineers.
        </p>
        <div className="flex gap-5 text-xs text-muted-foreground">
          <a href="#" className="hover:text-foreground">Privacy</a>
          <a href="#" className="hover:text-foreground">Terms</a>
          <a href="#" className="hover:text-foreground">Docs</a>
        </div>
      </div>
    </footer>
  );
}
