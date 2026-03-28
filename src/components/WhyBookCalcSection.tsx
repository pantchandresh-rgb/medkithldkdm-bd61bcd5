import { motion } from "framer-motion";
import { useState } from "react";
import { Check, MessageCircle, Phone, Calculator, Shield, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import homeHealthcare from "@/assets/home-healthcare.jpg";

const areas: Record<string, string[]> = {
  Haldwani: ["Rampur Road", "Kaladhungi Road", "Nainital Road", "Mukhani", "Heera Nagar", "Kusumkhera", "Panchakki", "Bareilly Road", "Transport Nagar"],
  Kathgodam: ["Kathgodam Market", "Gaula Barrage", "Shish Mahal", "Ranibagh"],
};

const allAreas = Object.entries(areas).flatMap(([city, list]) => list.map(a => `${a}, ${city}`));

const services = [
  { name: "Injection at Home", price: 299 },
  { name: "IV Drip Administration", price: 799 },
  { name: "ECG Test at Home", price: 999 },
  { name: "Nurse Visit at Home", price: 499 },
  { name: "Physiotherapy at Home", price: 699 },
  { name: "BP & Sugar Check", price: 199 },
  { name: "Blood Test at Home", price: 499 },
  { name: "Wound / Burn Dressing", price: 399 },
];

const WhyBookCalcSection = () => {
  const [calcService, setCalcService] = useState("");
  const [calcArea, setCalcArea] = useState("");
  const [calcPrice, setCalcPrice] = useState<number | null>(null);
  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookArea, setBookArea] = useState("");

  const getPrice = () => {
    const s = services.find(sv => sv.name === calcService);
    if (s) setCalcPrice(s.price);
  };

  const handleBook = () => {
    if (!bookName || !bookPhone || !bookArea) return;
    const msg = `Hi MedKit! I'm ${bookName}. I'd like to book a service in ${bookArea}. My phone: ${bookPhone}`;
    window.open(`https://wa.me/919999999999?text=${encodeURIComponent(msg)}`, "_blank");
  };

  const selectClasses = "w-full h-12 rounded-xl border border-border bg-card px-4 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition";
  const inputClasses = selectClasses;

  return (
    <section id="booking" className="py-24 bg-muted/50">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Book & Calculate</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Quick Booking & <span className="text-gradient">Transparent Pricing</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Why Choose Us */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card space-y-6">
            <h3 className="text-2xl font-display font-bold text-foreground">Why Choose Us</h3>
            <img src={homeHealthcare} alt="Home healthcare" loading="lazy" width={800} height={600} className="rounded-xl w-full h-48 object-cover" />
            <ul className="space-y-3">
              {["Certified Healthcare Professionals", "Transparent Pricing", "Fast Service", "Home Comfort", "Trusted by Local Families", "Instant WhatsApp Booking"].map(item => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-amber-500">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-foreground">4.8 Rated</span>
              <span className="text-muted-foreground text-sm">| 100+ Happy Patients</span>
            </div>
            <Button className="w-full rounded-xl gradient-primary text-primary-foreground h-12 font-semibold hover:scale-[1.02] transition-transform">
              <Phone className="mr-2 w-4 h-4" /> Talk to Expert
            </Button>
          </motion.div>

          {/* Book Service */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card space-y-6">
            <h3 className="text-2xl font-display font-bold text-foreground">Book Service</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Your Name" value={bookName} onChange={e => setBookName(e.target.value)} className={inputClasses} />
              <input type="tel" placeholder="Phone Number" value={bookPhone} onChange={e => setBookPhone(e.target.value)} className={inputClasses} />
              <select value={bookArea} onChange={e => setBookArea(e.target.value)} className={selectClasses}>
                <option value="">Select Area</option>
                {Object.entries(areas).map(([city, list]) => (
                  <optgroup key={city} label={city}>
                    {list.map(a => <option key={a} value={`${a}, ${city}`}>{a}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>
            <div className="flex items-center gap-3 p-4 rounded-xl bg-accent border border-primary/10">
              <MessageCircle className="w-6 h-6 text-secondary flex-shrink-0" />
              <p className="text-sm text-accent-foreground font-medium">
                ⚡ Need quick service? Book instantly on WhatsApp
              </p>
            </div>
            <Button onClick={handleBook} className="w-full rounded-xl gradient-primary text-primary-foreground h-14 text-lg font-semibold hover:scale-[1.02] transition-transform">
              Book Now
            </Button>
          </motion.div>

          {/* Price Calculator */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card space-y-6">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" /> Price Calculator
            </h3>
            <div className="space-y-4">
              <select value={calcService} onChange={e => { setCalcService(e.target.value); setCalcPrice(null); }} className={selectClasses}>
                <option value="">Select Service</option>
                {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
              </select>
              <select value={calcArea} onChange={e => setCalcArea(e.target.value)} className={selectClasses}>
                <option value="">Select Area</option>
                {allAreas.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <Button onClick={getPrice} className="w-full rounded-xl gradient-primary text-primary-foreground h-12 font-semibold hover:scale-[1.02] transition-transform">
                Get Price
              </Button>
            </div>

            {calcPrice !== null && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center p-6 rounded-xl bg-accent border border-primary/10">
                <p className="text-sm text-muted-foreground mb-1">Estimated Price</p>
                <p className="text-4xl font-display font-bold text-primary">₹{calcPrice}</p>
              </motion.div>
            )}

            <ul className="space-y-2">
              {[{ icon: Shield, text: "No hidden charges" }, { icon: Clock, text: "Pay after service" }, { icon: Check, text: "Quick response team" }].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-foreground text-sm">
                  <Icon className="w-4 h-4 text-secondary" /> {text}
                </li>
              ))}
            </ul>
            <Button variant="outline" className="w-full rounded-xl h-12 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors">
              Book Now
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookCalcSection;
