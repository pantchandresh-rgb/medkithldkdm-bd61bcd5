import { useState } from "react";
import { motion } from "framer-motion";
import {
  Syringe, Droplets, Heart, UserCheck, Activity, Thermometer, TestTube,
  Bandage, Bug, AlertTriangle, Scissors, ShieldPlus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import BookingFormDialog from "@/components/BookingFormDialog";

const homeServices = [
  { icon: Syringe, title: "Injection at Home", desc: "Safe & sterile injections by certified nurses at your doorstep.", price: 120, id: "injection" },
  { icon: Droplets, title: "IV Drip Administration", desc: "Professional IV therapy for hydration, vitamins & medications.", price: 300, id: "iv-drip" },
  { icon: Heart, title: "ECG Test at Home", desc: "Complete 12-lead ECG with instant report by trained technicians.", price: 400, id: "ecg" },
  { icon: UserCheck, title: "Nurse Visit at Home", desc: "Experienced nurses for post-surgery care, elderly care & more.", price: 499, id: "nurse" },
  { icon: Activity, title: "Physiotherapy at Home", desc: "Personalized physiotherapy sessions by licensed therapists.", price: 500, id: "physio" },
  { icon: Thermometer, title: "BP & Sugar Check", desc: "Regular health monitoring with digital equipment at home.", price: 199, id: "bp-sugar" },
  { icon: TestTube, title: "Blood Test at Home", desc: "Sample collection at home with reports delivered digitally.", price: 499, id: "blood-test" },
];

const biteServices = [
  { icon: Bug, title: "Dog Bite Injection", desc: "Anti-rabies vaccination & wound care for dog bites.", price: 300, id: "dog-bite" },
  { icon: Bug, title: "Monkey Bite Injection", desc: "Immediate injection & care for monkey bite injuries.", price: 300, id: "monkey-bite" },
  { icon: AlertTriangle, title: "Snake Bite (Emergency)", desc: "Emergency anti-venom & first-aid for snake bites.", price: 500, id: "snake-bite", emergency: true },
];

const dressingServices = [
  { icon: Bandage, title: "Minor Dressing", desc: "Clean wound care & bandaging for minor injuries.", price: 200, id: "minor-dressing" },
  { icon: Bandage, title: "Major Dressing", desc: "Professional wound management for deep or surgical wounds.", price: 400, id: "major-dressing" },
  { icon: ShieldPlus, title: "Burn Dressing", desc: "Specialized burn care with medicated dressing.", price: 300, id: "burn-dressing" },
  { icon: Scissors, title: "Plaster Application", desc: "Professional plaster/cast application at home.", price: 600, id: "plaster-apply" },
  { icon: Scissors, title: "Plaster Removal", desc: "Safe plaster/cast removal by trained technicians.", price: 300, id: "plaster-remove" },
];

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  desc: string;
  price: number;
  index: number;
  emergency?: boolean;
  onBook: () => void;
}

const ServiceCard = ({ icon: Icon, title, desc, price, index, emergency, onBook }: ServiceCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    whileHover={{ y: -8, scale: 1.02 }}
    className={`group glass rounded-2xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 flex flex-col ${
      emergency ? "border border-destructive/30 bg-destructive/5" : ""
    }`}
  >
    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform ${
      emergency ? "bg-destructive/20" : "gradient-primary"
    }`}>
      <Icon className={`w-7 h-7 ${emergency ? "text-destructive" : "text-primary-foreground"}`} />
    </div>
    <h3 className="text-lg font-display font-bold text-foreground mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground mb-4 flex-1">{desc}</p>
    <div className="flex items-center justify-between mt-auto">
      <div>
        <span className="text-2xl font-bold text-primary">₹{price}</span>
        <span className="text-xs text-muted-foreground ml-1">onwards</span>
      </div>
      <Button
        size="sm"
        className={`rounded-full hover:scale-105 transition-transform ${
          emergency
            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
            : "gradient-primary text-primary-foreground"
        }`}
        onClick={onBook}
      >
        {emergency ? "Get Immediate Help" : "Book Now"}
      </Button>
    </div>
  </motion.div>
);

const ServicesSection = () => {
  const [selectedService, setSelectedService] = useState<{ title: string; price: number; id: string } | null>(null);

  const renderGrid = (
    services: typeof homeServices,
    cols = "lg:grid-cols-4"
  ) => (
    <div className={`grid sm:grid-cols-2 ${cols} gap-6`}>
      {services.map((s, i) => (
        <ServiceCard
          key={s.id}
          icon={s.icon}
          title={s.title}
          desc={s.desc}
          price={s.price}
          index={i}
          emergency={"emergency" in s ? (s as any).emergency : false}
          onBook={() => setSelectedService({ title: s.title, price: s.price, id: s.id })}
        />
      ))}
    </div>
  );

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container space-y-20">
        {/* Home Services */}
        <div>
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
          {renderGrid(homeServices)}
        </div>

        {/* Bite & Emergency */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-4"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-destructive">Emergency Care</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              🐍 Bite & Emergency <span className="text-destructive">Injection Care</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Immediate professional response for animal bite emergencies. Don't wait — get help now.
            </p>
          </motion.div>
          {renderGrid(biteServices, "lg:grid-cols-3")}
        </div>

        {/* Dressing & Injury */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12 space-y-4"
          >
            <span className="text-sm font-semibold tracking-widest uppercase text-primary">Wound Care</span>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              🩹 Dressing & Injury <span className="text-gradient">Management</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional wound care, burn treatment, and plaster services at your doorstep.
            </p>
          </motion.div>
          {renderGrid(dressingServices, "lg:grid-cols-3")}
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
