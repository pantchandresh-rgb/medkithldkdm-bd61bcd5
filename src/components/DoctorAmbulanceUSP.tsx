import { motion } from "framer-motion";
import { Stethoscope, Ambulance, Phone, Video, MapPin, Clock, Shield, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import doctorImg from "@/assets/doctor-consultation-usp.jpg";
import ambulanceImg from "@/assets/ambulance-usp.jpg";

const WHATSAPP = "919818185270";

const DoctorAmbulanceUSP = () => (
  <section className="py-28 bg-background">
    <div className="container space-y-20">
      {/* Doctor Consultation USP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Doctor on Call</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Consult a Doctor from <span className="text-gradient">Home</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Skip the clinic queues. Talk to verified, experienced doctors via audio or video call — anytime, from the comfort of your home.
          </p>
          <ul className="space-y-3">
            {[
              { icon: Video, text: "Audio & Video consultations available" },
              { icon: Clock, text: "Available 8 AM – 10 PM, 7 days a week" },
              { icon: Shield, text: "MBBS / MD verified doctors only" },
              { icon: CheckCircle, text: "Digital prescription delivered after call" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full gradient-primary text-primary-foreground px-8 font-semibold hover:scale-105 transition-transform">
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi MedKit! I want to book a Doctor Consultation.")}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> Book Doctor on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground">
              <a href={`tel:+91${WHATSAPP.slice(2)}`}>
                <Phone className="w-4 h-4 mr-2" /> Call Now
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Starting at <span className="font-bold text-primary">₹499</span> per consultation</p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <img src={doctorImg} alt="Doctor video consultation" loading="lazy" width={800} height={600} className="rounded-3xl shadow-elevated w-full object-cover" />
          <div className="absolute -bottom-4 -left-4 glass rounded-2xl p-4 shadow-card">
            <p className="text-sm font-bold text-foreground">🩺 4.8★ Rated Doctors</p>
            <p className="text-xs text-muted-foreground">Trusted by 100+ families</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Ambulance Service USP */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid lg:grid-cols-2 gap-12 items-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative order-2 lg:order-1"
        >
          <img src={ambulanceImg} alt="Ambulance emergency service" loading="lazy" width={800} height={600} className="rounded-3xl shadow-elevated w-full object-cover" />
          <div className="absolute -bottom-4 -right-4 glass rounded-2xl p-4 shadow-card border border-destructive/20">
            <p className="text-sm font-bold text-destructive">🚨 24/7 Emergency</p>
            <p className="text-xs text-muted-foreground">Response in minutes</p>
          </div>
        </motion.div>

        <div className="space-y-6 order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 border border-destructive/20">
            <Ambulance className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Ambulance Service</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Emergency? We're <span className="text-destructive">Minutes Away</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Fast, reliable ambulance dispatch for emergencies and hospital transfers in Haldwani & Kathgodam. Every second counts — and we don't waste them.
          </p>
          <ul className="space-y-3">
            {[
              { icon: Clock, text: "Fastest response in your area — under 15 minutes" },
              { icon: MapPin, text: "GPS-tracked fleet covering all local areas" },
              { icon: Shield, text: "Equipped with oxygen, stretcher & first-aid" },
              { icon: CheckCircle, text: "Accident, cardiac, pregnancy & transfer support" },
            ].map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-foreground">
                <div className="w-8 h-8 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-4 h-4 text-destructive" />
                </div>
                <span className="text-sm">{text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg" className="rounded-full bg-destructive text-destructive-foreground px-8 font-semibold hover:bg-destructive/90 hover:scale-105 transition-transform">
              <a href={`tel:+91${WHATSAPP.slice(2)}`}>
                <Phone className="w-4 h-4 mr-2" /> 🚑 Call Ambulance Now
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 font-semibold border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
              <a href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("🚑 EMERGENCY! I need an ambulance immediately. Please send one ASAP!")}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" /> WhatsApp SOS
              </a>
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">Starting at <span className="font-bold text-destructive">₹999</span> • No hidden charges</p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default DoctorAmbulanceUSP;
