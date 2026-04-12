import { motion } from "framer-motion";
import heroImg from "@/assets/hero-doctor.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, ShieldCheck, Clock, MapPin, CheckCircle } from "lucide-react";

const WHATSAPP = "919818185270";

const trustItems = [
  { icon: ShieldCheck, text: "Verified Professionals" },
  { icon: Clock, text: "Fast Response" },
  { icon: MapPin, text: "Serving Haldwani & Kathgodam" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden gradient-hero">
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-secondary/8 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/4 blur-3xl animate-pulse" />
      </div>

      <div className="container relative z-10 grid lg:grid-cols-2 gap-16 items-center py-24 lg:py-28">
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

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-extrabold leading-[1.08] text-primary-foreground tracking-tight">
            Book Trusted Healthcare{" "}
            <span className="text-gradient">Services at Home</span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-lg leading-relaxed">
            From diagnostics to home care — fast, reliable, and verified professionals at your doorstep.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg" className="gradient-primary text-primary-foreground rounded-full px-8 h-14 text-base font-semibold shadow-elevated hover:scale-105 transition-transform">
              <a href="#booking">
                Book a Service <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-semibold border-secondary bg-secondary/10 text-primary-foreground hover:bg-secondary/20 hover:text-primary-foreground">
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi MedKit! I want to book a healthcare service.")}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="mr-2 w-5 h-5" /> Chat on WhatsApp
              </a>
            </Button>
          </div>

          {/* Trust line */}
          <div className="flex flex-wrap items-center gap-5 pt-2">
            {trustItems.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-primary-foreground/70 text-sm">
                <Icon className="w-4 h-4 text-secondary" />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <p className="text-xs text-primary-foreground/50">Get instant response on WhatsApp — no waiting</p>
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
