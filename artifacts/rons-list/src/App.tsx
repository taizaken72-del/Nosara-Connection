import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

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
            backgroundImage: 'url("/hero-bg-watercolor.png")',
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
            className="w-full max-w-2xl flex flex-col items-center"
          >
            {/* Headline */}
            <h1
              className="font-serif font-semibold leading-[1.15] mb-3"
              style={{
                color: "#1A3320",
                fontSize: "clamp(1.7rem, 4vw, 2.9rem)",
              }}
            >
              Hiring the Wrong Builders Is the Most Expensive Mistake in Nosara
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
              The wrong professionals lead to delays, budget overruns, and serious stress.
            </p>

            {/* Supporting text */}
            <p
              className="font-sans font-light leading-relaxed mb-6 max-w-lg"
              style={{ color: "#2E2A24", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
            >
              Ron's List connects you with trusted professionals in Nosara—backed by <strong style={{ fontWeight: 600 }}>real experiences</strong> from the <strong style={{ fontWeight: 600 }}>local community.</strong>
            </p>

            {/* CTA Button */}
            <button
              data-testid="button-cta"
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
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          <FadeIn>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-[#1A3320] mb-8 leading-tight">
              Why So Many Projects Go Wrong in Nosara
            </h2>
            <p className="text-lg md:text-xl font-light mb-8 text-[#2E2A24]">
              Hiring in Nosara can be unpredictable.
            </p>
            <ul className="text-left inline-block space-y-4 mb-10 text-lg md:text-xl font-light text-[#2E2A24]">
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
              "And sometimes… it leads to costly mistakes."
            </p>
          </FadeIn>
        </div>
      </section>

      {/* SECTION 3: Testimonials */}
      <section className="py-24 px-6 bg-[#EDE4D3]" data-testid="section-testimonials">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <div className="grid md:grid-cols-2 gap-12 md:gap-16">
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl font-serif text-[#B8924A] opacity-40 leading-none">"</span>
                <p className="relative z-10 text-lg md:text-xl font-serif leading-relaxed mb-6 text-[#2E2A24]">
                  Hiring the wrong people early on set our project back months and cost us far more than expected. If I had access to a trusted network like Ron's List from the start, we would have done things very differently.
                </p>
                <p className="text-sm uppercase tracking-widest text-[#7A7167]">
                  — Homeowner in Nosara
                </p>
              </div>
              <div className="relative">
                <span className="absolute -top-10 -left-6 text-8xl font-serif text-[#B8924A] opacity-40 leading-none">"</span>
                <p className="relative z-10 text-lg md:text-xl font-serif leading-relaxed mb-6 text-[#2E2A24]">
                  After dealing with the wrong people early on, finding Ron's List changed everything for us. The people we were connected with showed up, communicated well, did solid work and finished on time. It made the whole process far less stressful.
                </p>
                <p className="text-sm uppercase tracking-widest text-[#7A7167]">
                  — Homeowner in Nosara
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

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-[#D5CABB]">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-[#7A7167] font-sans">
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
