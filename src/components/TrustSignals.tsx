import { motion } from "framer-motion";
import { ShieldCheck, MapPin, BadgeCheck, MessageCircle } from "lucide-react";

const signals = [
  {
    icon: BadgeCheck,
    title: "Verified Professionals",
    desc: "Every technician, nurse & doctor is background-verified and certified.",
  },
  {
    icon: MapPin,
    title: "Serving Haldwani & Kathgodam",
    desc: "Covering all major areas with fast doorstep service delivery.",
  },
  {
    icon: ShieldCheck,
    title: "Transparent Pricing",
    desc: "Real-time pricing with no hidden charges. Pay only after service.",
  },
  {
    icon: MessageCircle,
    title: "Quick WhatsApp Support",
    desc: "Get instant help and book services directly via WhatsApp chat.",
  },
];

const TrustSignals = () => (
  <section className="py-16 bg-accent/30 border-y border-border/50">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {signals.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border/50 shadow-sm hover:shadow-card transition-shadow"
          >
            <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
              <s.icon className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h3 className="text-sm font-display font-bold text-foreground mb-1">{s.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TrustSignals;
