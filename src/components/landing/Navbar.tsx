import { Link } from "@tanstack/react-router";
import { Rocket } from "lucide-react";

export function Navbar() {
  const links = [
    { href: "#features", label: "Features" },
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl btn-primary">
              <Rocket className="h-5 w-5" />
            </div>
            <span className="font-semibold tracking-tight">
              CareerPilot <span className="text-gradient">AI</span>
            </span>
          </Link>
          <ul className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-foreground transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="hidden sm:inline-flex px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="inline-flex btn-primary rounded-xl px-4 py-2 text-sm font-medium hover:[&]:btn-primary-hover"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
