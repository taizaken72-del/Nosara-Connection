import { Switch, Route, Router as WouterRouter, Link } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const queryClient = new QueryClient();

function Home() {
  return (
    <div className="relative min-h-[100dvh] w-full flex flex-col items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url("/hero-bg.png")' }}
      >
        <div className="absolute inset-0 bg-black/40 z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-4xl px-6 py-12 md:py-20 flex flex-col items-center justify-center flex-1 h-full text-center">
        
        {/* Logo & Top Nav */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-16 w-full"
        >
          <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg mb-8 inline-block">
            <img 
              src="/rons-list-logo.jpg" 
              alt="Ron's List" 
              className="w-32 md:w-44 h-auto object-contain mix-blend-multiply"
            />
          </div>
          
          <nav className="flex items-center gap-8 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-white/90">
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#message-us" className="hover:text-white transition-colors">Message Us</a>
          </nav>
        </motion.div>

        {/* Hero Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="max-w-3xl flex flex-col items-center"
        >
          <h1 className="font-serif text-[32px] leading-[1.2] md:text-[56px] md:leading-[1.1] text-[#FDFCF9] font-medium mb-6">
            Most Costly Mistakes in Nosara Start With Hiring the Wrong People
          </h1>
          
          <p className="text-lg md:text-xl text-[#FDFCF9]/90 font-light max-w-2xl mb-6 leading-relaxed">
            The most reliable professionals here aren't easy to find—and the wrong ones lead to delays, budget overruns, and serious stress.
          </p>
          
          <p className="text-base md:text-lg text-[#FDFCF9]/80 font-light max-w-xl mb-10 leading-relaxed">
            Ron's List connects you with trusted, vetted professionals in Nosara known for fair pricing and solid work.
          </p>

          <Button 
            className="bg-[#2D5016] hover:bg-[#39631C] text-white rounded-full px-8 py-7 md:px-10 md:py-8 text-base md:text-lg font-medium tracking-wide shadow-xl transition-all duration-300 w-full md:w-auto"
          >
            Get Connected to Trusted Professionals
          </Button>

          <p className="mt-5 text-sm md:text-base text-white/70 italic font-light">
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
