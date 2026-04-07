import { motion } from "framer-motion";
import { Star, BadgeCheck } from "lucide-react";
import doctor1 from "@/assets/doctor-1.jpg";
import doctor2 from "@/assets/doctor-2.jpg";
import doctor3 from "@/assets/doctor-3.jpg";
import doctor4 from "@/assets/doctor-4.jpg";

const doctors = [
  { name: "Dr. Rahul Sharma", degree: "MBBS, MD", experience: "8+ years", expertise: "General Physician", rating: 4.8, image: doctor1, available: true },
  { name: "Dr. Neha Verma", degree: "MBBS, DGO", experience: "6+ years", expertise: "Women's Health", rating: 4.7, image: doctor2, available: true },
  { name: "Dr. Amit Joshi", degree: "MBBS, MD", experience: "10+ years", expertise: "Internal Medicine", rating: 4.9, image: doctor3, available: false },
  { name: "Dr. Priya Rawat", degree: "MBBS, DCH", experience: "5+ years", expertise: "Pediatrics", rating: 4.6, image: doctor4, available: true },
];

const DoctorsSection = () => (
  <section id="doctors" className="py-24 bg-gradient-to-b from-background to-accent/30">
    <div className="container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Our Doctors</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Meet Our <span className="text-gradient">Expert Doctors</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Trusted, verified doctors available for consultations — at home or on call.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {doctors.map((doc, i) => (
          <motion.div
            key={doc.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="glass rounded-2xl overflow-hidden shadow-card hover:shadow-elevated transition-all duration-300 flex flex-col"
          >
            <div className="relative">
              <img
                src={doc.image}
                alt={doc.name}
                loading="lazy"
                width={512}
                height={512}
                className="w-full h-56 object-cover"
              />
              {doc.available && (
                <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 text-primary-foreground text-xs font-semibold shadow-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground animate-pulse" />
                  Available Now
                </span>
              )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-1.5 mb-1">
                <h3 className="text-lg font-display font-bold text-foreground">{doc.name}</h3>
                <BadgeCheck className="w-4 h-4 text-primary flex-shrink-0" />
              </div>
              <p className="text-sm text-muted-foreground">{doc.degree}</p>
              <p className="text-sm text-foreground font-medium mt-1">{doc.expertise}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{doc.experience} experience</p>
              <div className="flex items-center gap-1 mt-3 pt-3 border-t border-border">
                <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span className="text-sm font-bold text-foreground">{doc.rating}</span>
                <span className="text-xs text-muted-foreground">/ 5</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default DoctorsSection;
