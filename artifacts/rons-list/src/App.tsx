import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ROTATING_WORDS = ["Builder", "Contractor", "Architect", "Designer", "Property Manager"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative" style={{ minWidth: "7ch" }}>
      <AnimatePresence mode="wait">
        <motion.span
          key={ROTATING_WORDS[index]}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="inline-block"
          style={{ color: "#B8924A" }}
        >
          {ROTATING_WORDS[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

const queryClient = new QueryClient();

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "14px 16px",
  backgroundColor: "#F8F3EC",
  border: "1px solid #D5CABB",
  borderRadius: "6px",
  fontSize: "1rem",
  color: "#2E2A24",
  fontFamily: "Inter, sans-serif",
  outline: "none",
  transition: "border-color 0.2s",
};

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [needs, setNeeds] = useState<string[]>([]);
  const [timeline, setTimeline] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const toggleNeed = (value: string) => {
    setNeeds((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New Ron's List inquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone || "Not provided"}\n\nNeeds: ${needs.join(", ") || "Not specified"}\nTimeline: ${timeline || "Not specified"}`
    );
    window.location.href = `mailto:ronslistnosara@gmail.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-[2px] bg-[#B8924A] mx-auto mb-8" />
        <h3 className="font-serif text-2xl text-[#1A3320] mb-4">Thank you.</h3>
        <p className="font-sans font-light text-lg text-[#2E2A24]">
          We'll be in touch with the right people for your project.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-[#1A3320] tracking-wide">Name</label>
          <input
            data-testid="input-name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            style={inputStyle}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-sans text-sm font-medium text-[#1A3320] tracking-wide">Email</label>
          <input
            data-testid="input-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
            style={inputStyle}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-sans text-sm font-medium text-[#1A3320] tracking-wide">WhatsApp Phone Number</label>
        <input
          data-testid="input-phone"
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+506"
          style={inputStyle}
        />
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-sans text-sm font-medium text-[#1A3320] tracking-wide">What do you need help with? <span className="font-light text-[#7A7167]">(select all that apply)</span></label>
        <div className="flex flex-wrap gap-3">
          {[
            "Builder / Contractor", "Architect", "Designer",
            "Furniture & Interiors", "Property Management",
            "Maintenance / Repairs", "Landscaping",
            "Pool Service", "Cleaning", "Other"
          ].map((option) => {
            const selected = needs.includes(option);
            return (
              <button
                key={option}
                type="button"
                data-testid={`chip-${option}`}
                onClick={() => toggleNeed(option)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "6px",
                  border: selected ? "1.5px solid #1A3320" : "1.5px solid #D5CABB",
                  backgroundColor: selected ? "#1A3320" : "#F8F3EC",
                  color: selected ? "#FFFFFF" : "#2E2A24",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  fontWeight: selected ? 500 : 400,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label className="font-sans text-sm font-medium text-[#1A3320] tracking-wide">When do you need someone?</label>
        <div className="flex flex-wrap gap-3">
          {["As soon as possible", "Within 1–2 weeks", "Within 1–2 months", "Just researching"].map((option) => {
            const selected = timeline === option;
            return (
              <button
                key={option}
                type="button"
                data-testid={`timeline-${option}`}
                onClick={() => setTimeline(selected ? "" : option)}
                style={{
                  padding: "10px 18px",
                  borderRadius: "6px",
                  border: selected ? "1.5px solid #1A3320" : "1.5px solid #D5CABB",
                  backgroundColor: selected ? "#1A3320" : "#F8F3EC",
                  color: selected ? "#FFFFFF" : "#2E2A24",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  fontWeight: selected ? 500 : 400,
                }}
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
      <button
        data-testid="button-submit"
        type="submit"
        className="font-sans font-medium tracking-wide transition-all duration-300 hover:opacity-90 mt-2"
        style={{
          backgroundColor: "#1A3320",
          color: "#FFFFFF",
          borderRadius: "8px",
          padding: "16px 36px",
          fontSize: "1rem",
          border: "none",
          cursor: "pointer",
          letterSpacing: "0.02em",
        }}
      >
        Get Connected to Trusted Professionals
      </button>
      <p className="text-center font-sans font-light text-[#7A7167] text-sm">
        <strong style={{ fontWeight: 600, color: "#5A5248" }}>No cost.</strong> No obligation. Just people you can trust.
      </p>
    </form>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Hiring the wrong people early on set our project back months and cost us far more than expected. If I had access to a trusted network like Ron's List from the start, we would have done things very differently.",
    author: "Homeowner in Nosara",
  },
  {
    quote:
      "After dealing with the wrong people early on, finding Ron's List changed everything for us. The people we were connected with showed up, communicated well, did solid work and finished on time. It made the whole process far less stressful.",
    author: "Homeowner in Nosara",
  },
];

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);

  const go = (d: 1 | -1) => {
    setDir(d);
    setIndex((prev) => (prev + d + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[index];

  return (
    <div className="relative flex items-center gap-4 md:gap-8">
      {/* Left arrow */}
      <button
        onClick={() => go(-1)}
        aria-label="Previous review"
        className="flex-shrink-0 w-10 h-10 rounded-full border border-[#D5CABB] flex items-center justify-center text-[#1A3320] hover:border-[#1A3320] transition-colors"
      >
        &#8592;
      </button>

      {/* Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: dir * 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -40 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative flex-1 min-h-[180px]"
        >
          <span className="absolute -top-8 -left-4 text-8xl font-serif text-[#B8924A] opacity-30 leading-none select-none">"</span>
          <p className="relative z-10 text-lg md:text-xl font-serif leading-relaxed mb-6 text-[#2E2A24]">
            {t.quote}
          </p>
          <p className="text-sm uppercase tracking-widest text-[#7A7167]">
            — {t.author}
          </p>
        </motion.div>
      </AnimatePresence>

      {/* Right arrow */}
      <button
        onClick={() => go(1)}
        aria-label="Next review"
        className="flex-shrink-0 w-10 h-10 rounded-full border border-[#D5CABB] flex items-center justify-center text-[#1A3320] hover:border-[#1A3320] transition-colors"
      >
        &#8594;
      </button>

      {/* Dots */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDir(i > index ? 1 : -1); setIndex(i); }}
            className="w-2 h-2 rounded-full transition-colors"
            style={{ backgroundColor: i === index ? "#B8924A" : "#D5CABB" }}
            aria-label={`Go to review ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut", delay }}
  >
    {children}
  </motion.div>
);

function Home() {
  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-x-hidden font-sans"
      style={{
        backgroundColor: "#F2EBE0",
        color: "#2E2A24",
      }}
    >
      {/* SECTION 1: HERO */}
      <div className="relative min-h-[100dvh] w-full overflow-hidden">
        {/* Watercolor beach background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/hero-bg-watercolor.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Very subtle cream wash to lift text readability without hiding the art */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background: "rgba(242, 235, 224, 0.25)",
          }}
        />

        {/* Logo — top center */}
        <div className="relative z-10 flex justify-center px-6 pt-6 md:pt-8">
          <img
            src="/rons-list-logo-transparent.png"
            alt="Ron's List"
            data-testid="img-logo"
            className="w-[190px] md:w-[230px] h-auto object-contain"
          />
        </div>

        {/* Main content — shifted up */}
        <div className="relative z-10 flex flex-col items-center justify-start pt-4 md:pt-6 px-6 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="w-full max-w-4xl flex flex-col items-center"
          >
            {/* Headline */}
            <h1
              className="font-serif font-semibold leading-[1.15] mb-3"
              style={{
                color: "#1A3320",
                fontSize: "clamp(1.7rem, 4vw, 2.9rem)",
              }}
            >
              The Most Expensive Mistake in Nosara? Hiring the Wrong <RotatingWord />.
            </h1>

            {/* Gold divider */}
            <div
              className="mb-4"
              style={{
                width: "48px",
                height: "2px",
                backgroundColor: "#B8924A",
                borderRadius: "1px",
              }}
            />

            {/* Subheadline */}
            <p
              className="font-sans font-light leading-relaxed mb-3 max-w-md"
              style={{ color: "#2E2A24", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
            >
              The wrong professionals lead to delays, budget overruns, and decisions you can't undo.
            </p>

            {/* Supporting text */}
            <p
              className="font-sans font-light leading-relaxed mb-6 max-w-lg"
              style={{ color: "#2E2A24", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
            >
              Ron's List connects you with the professionals long-time Nosara residents quietly recommend—down to furniture and finishing touches.
            </p>

            {/* Community Verified Badge */}
            <div
              className="mb-6 flex items-center gap-3 max-w-md w-full"
              style={{
                background: "#F5F0E8",
                border: "1px solid #E0D8CC",
                borderRadius: "10px",
                padding: "10px 19.7px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: "33px",
                  height: "33px",
                  borderRadius: "50%",
                  backgroundColor: "#1A3320",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 22 22" fill="none">
                  <path d="M5 11.5L9 15.5L17 7" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div
                style={{
                  width: "1px",
                  height: "29px",
                  backgroundColor: "#C8BFB0",
                  flexShrink: 0,
                }}
              />
              <div>
                <p className="font-sans font-bold" style={{ color: "#1A3320", fontSize: "0.784rem", letterSpacing: "0.1em" }}>
                  COMMUNITY VERIFIED
                </p>
                <p className="font-sans font-light" style={{ color: "#5A5248", fontSize: "0.815rem", marginTop: "1px" }}>
                  Built on real referrals from people who live here
                </p>
              </div>
            </div>

            {/* CTA Button */}
            <button
              data-testid="button-cta"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full max-w-md font-sans font-medium tracking-wide transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#1A3320",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "18px 36px",
                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Get Connected to Trusted Professionals
            </button>

            {/* Trust note */}
            <p
              className="mt-4 font-sans font-light"
              style={{ color: "#7A7167", fontSize: "0.82rem" }}
            >
              <strong style={{ fontWeight: 600, color: "#5A5248" }}>No cost. No obligation. Just people you can trust.</strong>
            </p>
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Problem Section */}
      <section className="py-24 px-6" data-testid="section-problem">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              {/* Text */}
              <div className="w-full md:w-3/5">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3320] mb-8 leading-tight">
                  Why So Many Projects Go Wrong in Nosara
                </h2>
                <p className="text-lg md:text-xl font-light mb-8 text-[#2E2A24]">
                  Hiring in Nosara can be unpredictable.
                </p>
                <ul className="space-y-4 mb-10 text-lg md:text-xl font-light text-[#2E2A24]">
                  <li className="flex items-start">
                    <span className="text-[#B8924A] mr-4 text-2xl leading-none">&bull;</span>
                    Random recommendations with no context
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B8924A] mr-4 text-2xl leading-none">&bull;</span>
                    No idea who's actually available
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#B8924A] mr-4 text-2xl leading-none">&bull;</span>
                    No consistency in quality or pricing
                  </li>
                </ul>
                <p className="text-xl md:text-2xl font-serif italic text-[#1A3320]">
                  And often, it leads to costly mistakes.
                </p>
              </div>
              {/* Photo */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img
                  src="/nosara-construction.jpg"
                  alt="Construction in Nosara"
                  className="w-full h-[380px] md:h-[460px] object-cover rounded-sm"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3: Testimonials */}
      <section className="py-24 px-6 bg-[#EDE4D3]" data-testid="section-testimonials">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1A3320]">
                Real experiences from homeowners who've built in Nosara.
              </h2>
              <div className="w-12 h-[2px] bg-[#B8924A] mx-auto mt-6" />
            </div>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl font-serif text-[#B8924A] opacity-40 leading-none">"</span>
                <p className="relative z-10 text-lg md:text-xl font-serif leading-relaxed mb-6 text-[#2E2A24]">
                  After dealing with the wrong people early on, finding Ron's List changed everything for us. The people we were connected with showed up, communicated well, did solid work and finished on time. It made the whole process far less stressful.
                </p>
                <p className="text-sm uppercase tracking-widest text-[#7A7167]">
                  — Simon Sayag, North Guiones
                </p>
                <img
                  src="/simon-home.jpg"
                  alt="Simon Sayag's home in North Guiones"
                  className="mt-6 w-full h-56 object-cover rounded-sm"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
                  loading="lazy"
                  decoding="async"
                />
                <p className="mt-2 text-xs text-[#7A7167] font-sans italic">
                  Actual Project, North Guiones.
                </p>
              </div>
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl font-serif text-[#B8924A] opacity-40 leading-none">"</span>
                <p className="relative z-10 text-lg md:text-xl font-serif leading-relaxed mb-6 text-[#2E2A24]">
                  Hiring the wrong people early on set our project back months and cost us far more than expected. If I had access to a trusted network like Ron's List from the start, we would have done things very differently.
                </p>
                <p className="text-sm uppercase tracking-widest text-[#7A7167]">
                  — Itai Algazi, Playa Pelada
                </p>
                <img
                  src="/itai-home.jpg"
                  alt="Itai Algazi's home in Playa Pelada"
                  className="mt-6 w-full h-56 object-cover rounded-sm"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.10)" }}
                  loading="lazy"
                  decoding="async"
                />
                <p className="mt-2 text-xs text-[#7A7167] font-sans italic">
                  Actual Project, Playa Pelada.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 4: Solution Section */}
      <section className="py-28 px-6" data-testid="section-solution">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3320] mb-6">
              A Better Way to Find the Right People
            </h2>
            <div className="w-12 h-[2px] bg-[#B8924A] mx-auto mb-8" />
            <p className="text-lg md:text-xl font-light mb-12 text-[#2E2A24]">
              Ron's List connects you with professionals who are:
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#1A3320] flex items-center justify-center text-[#1A3320] font-serif text-xl mb-4">1</div>
                <h3 className="font-serif text-xl text-[#1A3320]">Proven locally</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#1A3320] flex items-center justify-center text-[#1A3320] font-serif text-xl mb-4">2</div>
                <h3 className="font-serif text-xl text-[#1A3320]">Consistently recommended</h3>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#1A3320] flex items-center justify-center text-[#1A3320] font-serif text-xl mb-4">3</div>
                <h3 className="font-serif text-xl text-[#1A3320]">Known and trusted within the Nosara community</h3>
              </div>
            </div>

            <div className="max-w-3xl mx-auto space-y-6 text-[#2E2A24] font-light text-lg">
              <p>
                Ratings and recommendations are based on real experiences from homeowners and residents in Nosara—not anonymous online reviews.
              </p>
              <p>
                Ratings reflect real homeowner experiences across reliability, communication, timelines, honesty, and overall quality of work.
              </p>
              <p className="font-medium text-[#1A3320] pt-4">
                This isn't a public directory. It's a curated network built on real experience and trusted referrals.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 5: Credibility / Origin Story */}
      <section className="py-24 px-6 bg-[#EDE4D3]" data-testid="section-credibility">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
              {/* Photo */}
              <div className="w-full md:w-2/5 flex-shrink-0">
                <img
                  src="/nosara-surf.jpg"
                  alt="Nosara sunset surf"
                  className="w-full h-[420px] md:h-[500px] object-cover rounded-sm"
                  style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.10)" }}
                  loading="lazy"
                  decoding="async"
                />
              </div>
              {/* Text */}
              <div className="w-full md:w-3/5 border-l-2 border-[#B8924A] pl-8 md:pl-12">
                <h2 className="font-serif text-3xl md:text-4xl text-[#1A3320] mb-8">
                  Built on Years of Local Trust
                </h2>
                <div className="space-y-6 font-serif text-lg md:text-xl text-[#2E2A24] leading-relaxed">
                  <p>
                    "I grew up in Nosara and saw firsthand how often people struggle after hiring the wrong professionals."
                  </p>
                  <p>
                    "For years, homeowners have relied on my dad (Ron)—a developer here since 2005—for trusted recommendations when it really mattered."
                  </p>
                  <p>
                    "Ron's List simply brings that trusted network into one place—so you don't have to figure it out the hard way."
                  </p>
                </div>
                <p className="mt-8 text-lg font-serif text-[#2E2A24]">
                  — Milan
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 6: How It Works */}
      <section className="py-28 px-6" data-testid="section-how-it-works">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3320] mb-6">
                Simple. Direct. Reliable.
              </h2>
              <div className="w-12 h-[2px] bg-[#B8924A] mx-auto" />
            </div>

            <div className="grid md:grid-cols-3 gap-12 text-center">
              <div className="flex flex-col items-center">
                <span className="text-[#8FAB7A] font-serif text-6xl mb-4 block">1.</span>
                <p className="font-sans text-xl text-[#1A3320]">Tell us what you need</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#8FAB7A] font-serif text-6xl mb-4 block">2.</span>
                <p className="font-sans text-xl text-[#1A3320]">Get matched with the right professionals</p>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-[#8FAB7A] font-serif text-6xl mb-4 block">3.</span>
                <p className="font-sans text-xl text-[#1A3320]">Move forward with clarity and confidence</p>
              </div>
            </div>

            <div className="text-center mt-20">
              <p className="font-serif italic text-2xl text-[#1A3320]">
                No endless searching. No guesswork.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 7: Categories */}
      <section className="py-24 px-6 bg-[#EDE4D3]" data-testid="section-categories">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A3320] mb-12">
              What You Can Find
            </h2>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[
                "Builders & General Contractors",
                "Architects & Designers",
                "Furniture & Interiors",
                "Property Management",
                "Maintenance & Services"
              ].map((category) => (
                <div 
                  key={category}
                  className="px-6 py-4 bg-[#F2EBE0] border border-[#D5CABB] rounded-sm font-sans text-lg text-[#1A3320] tracking-wide"
                >
                  {category}
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 8: Final CTA */}
      <section className="py-32 px-6" data-testid="section-cta">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <FadeIn>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A3320] mb-6">
              Don't Leave It to Chance
            </h2>
            <div className="w-12 h-[2px] bg-[#B8924A] mx-auto mb-8" />
            <p className="text-lg md:text-xl font-light mb-12 text-[#2E2A24]">
              The difference between a smooth project and a frustrating one often comes down to who you hire.
            </p>
            
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full max-w-md font-sans font-medium tracking-wide transition-all duration-300 hover:opacity-90"
              style={{
                backgroundColor: "#1A3320",
                color: "#FFFFFF",
                borderRadius: "8px",
                padding: "18px 36px",
                fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Get Connected to Trusted Professionals
            </button>
            
            <p className="mt-6 font-sans font-light text-[#7A7167] text-sm">
              No cost. No obligation. Just the right people.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 9: Contact Form */}
      <section id="contact" className="py-24 px-6 bg-[#EDE4D3]" data-testid="section-contact">
        <div className="max-w-2xl mx-auto">
          <FadeIn>
            <div className="text-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A3320] mb-4">
                Tell Us What You Need
              </h2>
              <div className="w-12 h-[2px] bg-[#B8924A] mx-auto mb-6" />
              <p className="font-sans font-light text-lg text-[#2E2A24]">
                We'll connect you with trusted professionals in Nosara—based on real experiences from the community.
              </p>
            </div>
            <ContactForm />
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#D5CABB]">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-sm font-sans text-[#2E2A24]">
            <a href="mailto:ronslistnosara@gmail.com" className="hover:text-[#1A3320] transition-colors">
              ronslistnosara@gmail.com
            </a>
            <span className="hidden sm:inline text-[#D5CABB]">·</span>
            <a href="tel:+12132387286" className="hover:text-[#1A3320] transition-colors">
              +1 213 238 7286
            </a>
          </div>
          <p className="text-xs text-[#7A7167] font-sans">
            © 2025 Ron's List · Nosara, Costa Rica
          </p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
