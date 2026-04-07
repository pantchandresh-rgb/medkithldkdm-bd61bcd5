import { useState } from "react";
import { motion } from "framer-motion";
import { Syringe, Droplets, Heart, UserCheck, Activity, Thermometer, TestTube, Bandage, Stethoscope, Ambulance } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingFormDialog from "@/components/BookingFormDialog";

const services = [
  { icon: Syringe, title: "Injection at Home", desc: "Safe & sterile injections by certified nurses at your doorstep.", price: 299 },
  { icon: Droplets, title: "IV Drip Administration", desc: "Professional IV therapy for hydration, vitamins & medications.", price: 799 },
  { icon: Heart, title: "ECG Test at Home", desc: "Complete 12-lead ECG with instant report by trained technicians.", price: 999 },
  { icon: UserCheck, title: "Nurse Visit at Home", desc: "Experienced nurses for post-surgery care, elderly care & more.", price: 499 },
  { icon: Activity, title: "Physiotherapy at Home", desc: "Personalized physiotherapy sessions by licensed therapists.", price: 699 },
  { icon: Thermometer, title: "BP & Sugar Check", desc: "Regular health monitoring with digital equipment at home.", price: 199 },
  { icon: TestTube, title: "Blood Test at Home", desc: "Sample collection at home with reports delivered digitally.", price: 499 },
  { icon: Bandage, title: "Wound / Burn Dressing", desc: "Professional wound care and burn dressing by trained staff.", price: 399 },
  { icon: Stethoscope, title: "Doctor Consultation", desc: "Consult verified doctors via audio or video call from home.", price: 499, highlight: true },
  { icon: Ambulance, title: "Ambulance Service", desc: "Fast ambulance dispatch for emergencies & hospital transfers.", price: 999, emergency: true },
];

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<{ title: string; price: number } | null>(null);

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-4"
        >
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Our Services</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Healthcare Services at Your <span className="text-gradient">Doorstep</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Certified professionals delivering quality healthcare in the comfort of your home.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`group glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 flex flex-col ${
                s.emergency ? "border border-destructive/20 bg-destructive/5" : s.highlight ? "border border-primary/20 bg-primary/5" : ""
              }`}
            >
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
                s.emergency ? "bg-destructive/15" : "gradient-primary"
              }`}>
                <s.icon className={`w-7 h-7 ${s.emergency ? "text-destructive" : "text-primary-foreground"}`} />
              </div>
              <h3 className="text-lg font-display font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{s.desc}</p>
              <div className="flex items-center justify-between mt-auto">
                <span className="text-2xl font-bold text-primary">₹{s.price}</span>
                <Button
                  size="sm"
                  className={`rounded-full hover:scale-105 transition-transform ${
                    s.emergency ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : "gradient-primary text-primary-foreground"
                  }`}
                  onClick={() => setSelectedService({ title: s.title, price: s.price })}
                >
                  {s.emergency ? "🚑 Book" : "Book Now"}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedService && (
        <BookingFormDialog
          open={!!selectedService}
          onOpenChange={(open) => !open && setSelectedService(null)}
          serviceName={selectedService.title}
          servicePrice={selectedService.price}
        />
      )}
    </section>
  );
};

export default ServicesSection;
