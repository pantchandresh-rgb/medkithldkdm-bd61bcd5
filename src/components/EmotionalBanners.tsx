import { motion } from "framer-motion";
import { Heart, Ambulance, UserCheck, Stethoscope, MessageCircle, ArrowRight, Users, HandHeart, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import partnerImg from "@/assets/partner-community.jpg";

const WHATSAPP = "919818185270";

const roles = [
  {
    icon: UserCheck,
    role: "Healthcare Technician",
    tagline: "Bring care closer to every home",
    desc: "Serve patients in your own city with flexible hours — from injections to ECGs.",
    msg: "Hi MedKit! I want to join as a Healthcare Technician partner.",
  },
  {
    icon: Stethoscope,
    role: "Doctor Partner",
    tagline: "Be there when someone needs care the most",
    desc: "Consult patients remotely via audio or video calls. Set your own schedule.",
    msg: "Hi MedKit! I'm a doctor and I'd like to partner with you for teleconsultations.",
  },
  {
    icon: Ambulance,
    role: "Ambulance Partner",
    tagline: "Every second matters. Be the help that arrives in time",
    desc: "Register your ambulance with MedKit's emergency network in your area.",
    msg: "Hi MedKit! I want to register my ambulance service as a partner.",
  },
];

const highlights = [
  { icon: HandHeart, text: "Make a real difference in your community" },
  { icon: Users, text: "Join a growing network of trusted professionals" },
  { icon: ShieldCheck, text: "Verified, supported & respected partnership" },
];

const EmotionalBanners = () => (
  <section id="partner" className="py-28 bg-muted/30">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-6"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Join Our Mission</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Be the Reason Someone Gets <span className="text-gradient">Care in Time</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Healthcare isn't just a profession — it's a calling. Partner with MedKit and help families in Haldwani & Kathgodam access quality care at their doorstep.
          </p>
          <ul className="space-y-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-foreground font-medium">{text}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <img src={partnerImg} alt="MedKit healthcare partners" loading="lazy" width={1024} height={640} className="rounded-3xl shadow-elevated w-full object-cover" />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {roles.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-2xl p-7 shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col group"
          >
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <r.icon className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{r.role}</span>
            <h3 className="text-lg font-display font-bold text-foreground mb-2">{r.tagline}</h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1">{r.desc}</p>
            <Button
              className="rounded-full w-full font-semibold gradient-primary text-primary-foreground hover:scale-[1.02] transition-transform"
              onClick={() => window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(r.msg)}`, '_blank', 'noopener,noreferrer')}
            >
              <MessageCircle className="w-4 h-4 mr-2" /> Join as Partner
            </Button>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-sm text-muted-foreground mt-8"
      >
        ✔ Trusted by healthcare professionals across Haldwani & Kathgodam
      </motion.p>
    </div>
  </section>
);

export default EmotionalBanners;
