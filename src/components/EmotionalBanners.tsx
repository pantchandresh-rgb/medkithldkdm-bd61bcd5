import { motion } from "framer-motion";
import { Heart, Ambulance, UserCheck } from "lucide-react";

const banners = [
  { icon: UserCheck, text: "Bring care closer to every home", color: "from-primary/10 to-primary/5", iconColor: "text-primary" },
  { icon: Heart, text: "Be there when someone needs care the most", color: "from-secondary/10 to-secondary/5", iconColor: "text-secondary" },
  { icon: Ambulance, text: "Every second matters. Be the help that arrives in time.", color: "from-destructive/10 to-destructive/5", iconColor: "text-destructive" },
];

const EmotionalBanners = () => (
  <section className="py-16 bg-background">
    <div className="container">
      <div className="grid md:grid-cols-3 gap-6">
        {banners.map((b, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`bg-gradient-to-br ${b.color} rounded-2xl p-8 text-center border border-border/50 shadow-card`}
          >
            <b.icon className={`w-10 h-10 mx-auto mb-4 ${b.iconColor}`} />
            <p className="text-lg font-display font-semibold text-foreground">{b.text}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default EmotionalBanners;
