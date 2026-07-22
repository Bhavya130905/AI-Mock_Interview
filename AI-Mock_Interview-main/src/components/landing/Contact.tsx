import { Mail, MapPin, MessageCircle } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="glass rounded-3xl p-10 md:p-14 grid lg:grid-cols-2 gap-10 items-center relative overflow-hidden">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/30 blur-3xl" />
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Ready to <span className="text-gradient">get placed?</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Join thousands of students who are turning ambition into offer letters.
            </p>
            <div className="mt-8 space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl glass"><Mail className="h-4 w-4" /></div>
                <span>hello@careerpilot.ai</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl glass"><MessageCircle className="h-4 w-4" /></div>
                <span>24/7 AI chat support</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl glass"><MapPin className="h-4 w-4" /></div>
                <span>Bangalore, India</span>
              </div>
            </div>
          </div>
          <form className="space-y-3">
            <input placeholder="Name" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
            <input placeholder="Email" type="email" className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60" />
            <textarea placeholder="How can we help?" rows={4} className="w-full glass rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/60 resize-none" />
            <button type="button" className="w-full btn-primary rounded-xl px-6 py-3 font-medium hover:[&]:btn-primary-hover">
              Send message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
