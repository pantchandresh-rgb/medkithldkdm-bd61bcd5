import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const areasList = [
  "Rampur Road", "Kaladhungi Road", "Nainital Road", "Mukhani",
  "Heera Nagar", "Kusumkhera", "Panchakki", "Bareilly Road",
  "Transport Nagar", "Lamachaur", "Kathgharia", "Devalchaur", "Chadail",
  "Kathgodam Market", "Gaula Barrage", "Shish Mahal", "Ranibagh"
];

const AreasSection = () => (
  <section id="areas" className="py-28 bg-muted/40">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14 space-y-3">
        <span className="text-xs font-semibold tracking-widest uppercase text-primary">Coverage</span>
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
          Areas We <span className="text-gradient">Serve</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Currently serving Haldwani & Kathgodam with plans to expand.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {areasList.map((area, i) => (
          <motion.div
            key={area}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.06 }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border/50 shadow-sm text-foreground font-medium text-sm cursor-default hover:shadow-card transition-shadow"
          >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            {area}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AreasSection;
