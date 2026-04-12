import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import partnerImg from "@/assets/partner-team.jpg";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const PartnerSection = () => (
  <section id="partner" className="py-24 bg-background">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Join Our Network</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Partner <span className="text-gradient">With Us</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our growing healthcare professional network and connect with patients who need your expertise.
          </p>
          <ul className="space-y-4">
            {["Flexible working hours", "Regular patient flow", "Fast payments", "Trusted brand support"].map(item => (
              <li key={item} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                  <Check className="w-4 h-4 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{item}</span>
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="rounded-full gradient-primary text-primary-foreground px-8 h-14 text-base font-semibold shadow-elevated hover:scale-105 transition-transform">
            <a href={createWhatsAppUrl({ message: "Hi MedKit! I want to become a partner." })} target="_blank" rel="noopener noreferrer">
              Become a Partner <ArrowRight className="ml-2 w-5 h-5" />
            </a>
          </Button>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <img src={partnerImg} alt="Healthcare team" loading="lazy" width={800} height={600} className="rounded-3xl shadow-elevated w-full object-cover" />
        </motion.div>
      </div>
    </div>
  </section>
);

export default PartnerSection;
