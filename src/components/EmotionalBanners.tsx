import { motion } from "framer-motion";
import { Heart, Ambulance, UserCheck, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP = "919818185270";

const banners = [
  {
    icon: UserCheck,
    role: "Healthcare Technician",
    headline: "Bring care closer to every home",
    desc: "Join MedKit as a certified healthcare technician. Serve patients in your own city — from injections to ECG — with flexible hours and steady income.",
    cta: "Join as Technician",
    msg: "Hi MedKit! I want to join as a Healthcare Technician partner.",
    color: "from-primary/10 to-primary/5",
    borderColor: "border-primary/20",
    iconColor: "text-primary",
    btnClass: "gradient-primary text-primary-foreground",
  },
  {
    icon: Heart,
    role: "Doctor Partner",
    headline: "Be there when someone needs care the most",
    desc: "Consult patients remotely via audio or video calls. Set your own schedule, earn per consultation, and make healthcare accessible from anywhere.",
    cta: "Join as Doctor",
    msg: "Hi MedKit! I'm a doctor and I'd like to partner with you for teleconsultations.",
    color: "from-secondary/10 to-secondary/5",
    borderColor: "border-secondary/20",
    iconColor: "text-secondary",
    btnClass: "bg-secondary text-secondary-foreground hover:bg-secondary/90",
  },
  {
    icon: Ambulance,
    role: "Ambulance Partner",
    headline: "Every second matters. Be the help that arrives in time.",
    desc: "Register your ambulance with MedKit's emergency network. Get dispatch requests in your area and help save lives with priority response.",
    cta: "Join as Ambulance Partner",
    msg: "Hi MedKit! I want to register my ambulance service as a partner.",
    color: "from-destructive/10 to-destructive/5",
    borderColor: "border-destructive/20",
    iconColor: "text-destructive",
    btnClass: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  },
];

const EmotionalBanners = () => (
  <section className="py-20 bg-muted/30">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14 space-y-3"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Partner With MedKit</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Join Our <span className="text-gradient">Healthcare Network</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Whether you're a doctor, technician, or ambulance provider — partner with us to serve your community and grow your practice.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-6">
        {banners.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${b.color} rounded-2xl p-7 border ${b.borderColor} shadow-card flex flex-col hover:shadow-elevated transition-shadow`}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${b.color.replace('from-', 'bg-').split(' ')[0]}`}>
              <b.icon className={`w-6 h-6 ${b.iconColor}`} />
            </div>
            <span className={`text-xs font-semibold uppercase tracking-wider ${b.iconColor} mb-2`}>{b.role}</span>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">{b.headline}</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">{b.desc}</p>
            <Button asChild className={`rounded-full w-full font-semibold hover:scale-[1.02] transition-transform ${b.btnClass}`}>
              <a
                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(b.msg)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> {b.cta}
              </a>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EmotionalBanners;
