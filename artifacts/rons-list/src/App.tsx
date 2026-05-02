import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";

const queryClient = new QueryClient();

function Home() {
  return (
    <div
      className="relative min-h-[100dvh] w-full overflow-hidden"
      style={{
        backgroundColor: "#F2EBE0",
      }}
    >
      {/* Beach image fading in from the right */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url("/hero-bg.png")',
          backgroundSize: "cover",
          backgroundPosition: "right center",
          backgroundRepeat: "no-repeat",
          maskImage:
            "linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 80%, black 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, transparent 30%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.85) 80%, black 100%)",
        }}
      />

      {/* Soft cream wash over everything to keep it light and airy */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, #F2EBE0 0%, #F2EBE0 25%, rgba(242,235,224,0.85) 45%, rgba(242,235,224,0.4) 65%, rgba(242,235,224,0.0) 100%)",
        }}
      />

      {/* Logo — top left */}
      <div className="relative z-10 px-6 pt-6 md:px-10 md:pt-8">
        <img
          src="/rons-list-logo-transparent.png"
          alt="Ron's List"
          data-testid="img-logo"
          className="w-[90px] md:w-[110px] h-auto object-contain"
        />
      </div>

      {/* Main content — centered */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100dvh-80px)] px-6 pb-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="w-full max-w-2xl flex flex-col items-center"
        >
          {/* Headline */}
          <h1
            className="font-serif font-semibold leading-[1.15] mb-5"
            style={{
              color: "#1A3320",
              fontSize: "clamp(2rem, 5vw, 3.6rem)",
            }}
          >
            Most Costly Mistakes in Nosara Start With Hiring the Wrong People
          </h1>

          {/* Gold divider */}
          <div
            className="mb-6"
            style={{
              width: "48px",
              height: "2px",
              backgroundColor: "#B8924A",
              borderRadius: "1px",
            }}
          />

          {/* Subheadline */}
          <p
            className="font-sans font-light leading-relaxed mb-4 max-w-md"
            style={{ color: "#2E2A24", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            The right professionals aren't easy to find—and the wrong ones cost you time, money, and stress.
          </p>

          {/* Supporting text */}
          <p
            className="font-sans font-light leading-relaxed mb-10 max-w-sm"
            style={{ color: "#2E2A24", fontSize: "clamp(0.95rem, 1.8vw, 1.1rem)" }}
          >
            Ron's List connects you with trusted, vetted professionals in Nosara.
          </p>

          {/* CTA Button */}
          <button
            data-testid="button-cta"
            className="w-full max-w-md font-sans font-medium tracking-wide transition-all duration-300"
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
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#244528";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = "#1A3320";
            }}
          >
            Get Connected to Trusted Professionals
          </button>

          {/* Trust note */}
          <p
            className="mt-4 font-sans font-light"
            style={{ color: "#7A7167", fontSize: "0.82rem" }}
          >
            No cost. No obligation. Just people you can trust.
          </p>
        </motion.div>
      </div>
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
