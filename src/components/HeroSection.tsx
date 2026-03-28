import { motion } from "framer-motion";
import heroImg from "@/assets/hero-doctor.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden gradient-hero">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary-foreground/80">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Trusted by 100+ families in Haldwani
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.1] text-primary-foreground">
            Healthcare at Home,{" "}
            <span className="text-gradient">Simplified</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-lg leading-relaxed">
            Book trusted healthcare services instantly — from injections to diagnostics, delivered at your doorstep by certified professionals.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 h-14 text-base font-semibold shadow-elevated hover:scale-105 transition-transform">
              Book Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-secondary bg-secondary/10 text-primary-foreground hover:bg-secondary/20 hover:text-primary-foreground">
              <Play className="mr-2 w-5 h-5" /> Explore Services
            </Button>
          </div>

          <div className="flex items-center gap-6 pt-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full gradient-primary border-2 border-background flex items-center justify-center text-xs font-bold text-primary-foreground">
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400">
                {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
              </div>
              <p className="text-sm text-primary-foreground/60">4.8 Rating • 100+ Happy Patients</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-elevated">
            <img src={heroImg} alt="Professional healthcare at home" width={1280} height={960} className="w-full h-auto object-cover rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent" />
          </div>
          {/* Floating stat cards */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-6 top-1/4 glass rounded-2xl p-4 shadow-card"
          >
            <p className="text-2xl font-bold text-primary">500+</p>
            <p className="text-sm text-muted-foreground">Services Done</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-4 bottom-1/4 glass rounded-2xl p-4 shadow-card"
          >
            <p className="text-2xl font-bold text-secondary">30 min</p>
            <p className="text-sm text-muted-foreground">Avg. Response</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
