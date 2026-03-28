import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const areasList = [
  "Rampur Road", "Kaladhungi Road", "Nainital Road", "Mukhani",
  "Heera Nagar", "Kusumkhera", "Panchakki", "Bareilly Road",
  "Transport Nagar", "Kathgodam Market", "Gaula Barrage",
  "Shish Mahal", "Ranibagh"
];

const AreasSection = () => (
  <section id="areas" className="py-24 bg-muted/50">
    <div className="container">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Coverage</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Areas We <span className="text-gradient">Serve</span>
        </h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Currently serving Haldwani & Kathgodam with plans to expand.</p>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
        {areasList.map((area, i) => (
          <motion.div
            key={area}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03 }}
            whileHover={{ scale: 1.08 }}
            className="flex items-center gap-2 px-5 py-3 rounded-full glass shadow-card text-foreground font-medium text-sm cursor-default"
          >
            <MapPin className="w-4 h-4 text-primary" />
            {area}
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AreasSection;
