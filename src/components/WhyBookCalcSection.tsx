import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Check, MessageCircle, Phone, Calculator, Shield, Clock, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import homeHealthcare from "@/assets/home-healthcare.jpg";
import heroImg from "@/assets/hero-doctor.jpg";
import priceCalcImg from "@/assets/price-calculator.jpg";
import { allServices, extendedAreas, calculatePrice, type UrgencyLevel, type PriceBreakdown } from "@/lib/pricing";
import { createWhatsAppUrl, openWhatsApp } from "@/lib/whatsapp";

const allAreasList = Object.entries(extendedAreas).flatMap(([city, list]) => list.map(a => `${a}, ${city}`));

const WhyBookCalcSection = () => {
  const [calcServiceId, setCalcServiceId] = useState("");
  const [calcArea, setCalcArea] = useState("");
  const [calcUrgency, setCalcUrgency] = useState<UrgencyLevel>("normal");
  const [calcResult, setCalcResult] = useState<PriceBreakdown | null>(null);

  const [bookName, setBookName] = useState("");
  const [bookPhone, setBookPhone] = useState("");
  const [bookArea, setBookArea] = useState("");
  const [bookAddress, setBookAddress] = useState("");
  const [bookService, setBookService] = useState("");
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookNotes, setBookNotes] = useState("");

  const serviceGroups = useMemo(() => [
    { label: "Home Services", services: allServices.filter(s => s.category === "home") },
    { label: "Bite & Emergency", services: allServices.filter(s => s.category === "bite") },
    { label: "Dressing & Injury", services: allServices.filter(s => s.category === "dressing") },
    { label: "Doctor", services: allServices.filter(s => s.category === "doctor") },
    { label: "Ambulance", services: allServices.filter(s => s.category === "ambulance") },
  ], []);

  const getPrice = () => {
    const areaName = calcArea.split(",")[0].trim();
    const result = calculatePrice(calcServiceId, areaName, calcUrgency);
    setCalcResult(result);
  };

  const handleBook = () => {
    if (!bookName || !bookPhone || !bookArea) return;
    const svc = allServices.find(s => s.id === bookService);
    const areaName = bookArea.split(",")[0].trim();
    const pricing = svc ? calculatePrice(svc.id, areaName, "normal") : null;
    let msg = `Hi MedKit! I'm ${bookName}. I'd like to book ${svc?.name || "a service"} in ${bookArea}. Address: ${bookAddress}. Date: ${bookDate}, Time: ${bookTime}.`;
    if (pricing) {
      msg += ` Estimated: ₹${pricing.totalPrice} (Base: ₹${pricing.basePrice}, Distance: ₹${pricing.distanceCost}, Platform: ₹${pricing.platformFee}).`;
    }
    if (bookNotes) msg += ` Notes: ${bookNotes}.`;
    msg += ` Phone: ${bookPhone}`;
    openWhatsApp({ message: msg });
  };

  const selectClasses = "w-full h-12 rounded-xl border border-border bg-card px-4 text-foreground focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition text-sm";
  const inputClasses = selectClasses;

  return (
    <section id="booking" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-background/90 backdrop-blur-sm" />
      </div>

      <div className="container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16 space-y-4">
          <span className="text-sm font-semibold tracking-widest uppercase text-primary">Book & Calculate</span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
            Quick Booking & <span className="text-gradient">Transparent Pricing</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {/* Why Choose Us */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card flex flex-col">
            <h3 className="text-2xl font-display font-bold text-foreground mb-6">Why Choose Us</h3>
            <img src={homeHealthcare} alt="Home healthcare" loading="lazy" width={800} height={600} className="rounded-xl w-full h-48 object-cover mb-6" />
            <ul className="space-y-3 flex-1">
              {["Certified Healthcare Professionals", "Transparent Real-Time Pricing", "Fast Service — Same Day Available", "Home Comfort & Safety", "Trusted by Local Families", "Instant WhatsApp Booking"].map(item => (
                <li key={item} className="flex items-center gap-3 text-foreground">
                  <Check className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-2 text-amber-500 mt-6">
              <Star className="w-5 h-5 fill-current" />
              <span className="font-bold text-foreground">4.8 Rated</span>
              <span className="text-muted-foreground text-sm">| 100+ Happy Patients</span>
            </div>
            <Button asChild className="w-full rounded-xl gradient-primary text-primary-foreground h-12 font-semibold hover:scale-[1.02] transition-transform mt-4">
              <a href="tel:+919818185270">
                <Phone className="mr-2 w-4 h-4" /> Talk to Expert
              </a>
            </Button>
          </motion.div>

          {/* Book Service */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card flex flex-col">
            <h3 className="text-2xl font-display font-bold text-foreground">Book Service</h3>
            <div className="flex items-center gap-2 mt-2 mb-5">
              <MessageCircle className="w-4 h-4 text-secondary flex-shrink-0" />
              <p className="text-sm text-muted-foreground font-medium">⚡ Need quick service? Book instantly on WhatsApp</p>
            </div>
            <div className="space-y-3 flex-1">
              <input type="text" placeholder="Your Name" value={bookName} onChange={e => setBookName(e.target.value)} className={inputClasses} />
              <input type="tel" placeholder="Phone Number" value={bookPhone} onChange={e => setBookPhone(e.target.value)} className={inputClasses} />
              <select value={bookArea} onChange={e => setBookArea(e.target.value)} className={selectClasses}>
                <option value="">Select Area</option>
                {Object.entries(extendedAreas).map(([city, list]) => (
                  <optgroup key={city} label={city}>
                    {list.map(a => <option key={a} value={`${a}, ${city}`}>{a}</option>)}
                  </optgroup>
                ))}
              </select>
              <input type="text" placeholder="Enter Full Address" value={bookAddress} onChange={e => setBookAddress(e.target.value)} className={inputClasses} />
              <select value={bookService} onChange={e => setBookService(e.target.value)} className={selectClasses}>
                <option value="">Select Service</option>
                {serviceGroups.map(g => (
                  <optgroup key={g.label} label={g.label}>
                    {g.services.map(s => <option key={s.id} value={s.id}>{s.name} — ₹{s.basePrice}</option>)}
                  </optgroup>
                ))}
              </select>
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={bookDate} onChange={e => setBookDate(e.target.value)} className={inputClasses} />
                <input type="time" value={bookTime} onChange={e => setBookTime(e.target.value)} className={inputClasses} />
              </div>
              <textarea placeholder="Additional Notes (optional)" value={bookNotes} onChange={e => setBookNotes(e.target.value)} rows={2} className={`${inputClasses} h-auto py-3 resize-none`} />
            </div>
            <Button onClick={handleBook} className="w-full rounded-xl gradient-primary text-primary-foreground h-14 text-lg font-semibold hover:scale-[1.02] transition-transform mt-5">
              Book Now
            </Button>
          </motion.div>

          {/* Price Calculator */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="glass rounded-2xl p-8 shadow-card flex flex-col">
            <h3 className="text-2xl font-display font-bold text-foreground flex items-center gap-2 mb-2">
              <Calculator className="w-6 h-6 text-primary" /> Price Calculator
            </h3>
            <p className="text-xs text-muted-foreground mb-6">Real-time transparent pricing — no hidden charges</p>
            <img src={priceCalcImg} alt="Price calculator" loading="lazy" width={800} height={600} className="rounded-xl w-full h-36 object-cover mb-6" />
            <div className="space-y-3">
              <select value={calcServiceId} onChange={e => { setCalcServiceId(e.target.value); setCalcResult(null); }} className={selectClasses}>
                <option value="">Select Service</option>
                {serviceGroups.map(g => (
                  <optgroup key={g.label} label={g.label}>
                    {g.services.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
                  </optgroup>
                ))}
              </select>
              <select value={calcArea} onChange={e => { setCalcArea(e.target.value); setCalcResult(null); }} className={selectClasses}>
                <option value="">Select Area</option>
                {allAreasList.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
              <select value={calcUrgency} onChange={e => { setCalcUrgency(e.target.value as UrgencyLevel); setCalcResult(null); }} className={selectClasses}>
                <option value="normal">Normal</option>
                <option value="same_day">Same Day (+₹50)</option>
                <option value="emergency">Emergency (+₹100)</option>
              </select>
              <Button onClick={getPrice} className="w-full rounded-xl gradient-primary text-primary-foreground h-12 font-semibold hover:scale-[1.02] transition-transform">
                Calculate Price
              </Button>
            </div>

            {calcResult && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-3">
                <div className="space-y-2 p-4 rounded-xl bg-accent/50 border border-border">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Base Price</span><span className="text-foreground font-medium">₹{calcResult.basePrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Distance ({calcResult.distanceKm} km)</span><span className="text-foreground font-medium">₹{calcResult.distanceCost}</span>
                  </div>
                  {calcResult.urgencyCharge > 0 && (
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Urgency Charge</span><span className="text-destructive font-medium">₹{calcResult.urgencyCharge}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Platform Fee</span><span className="text-foreground font-medium">₹{calcResult.platformFee}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-bold text-foreground">
                    <span>Total</span><span className="text-primary text-xl">₹{calcResult.totalPrice}</span>
                  </div>
                </div>
                <Badge variant="secondary" className="w-full justify-center py-1.5 text-xs gap-1">
                  <Shield className="w-3 h-3" /> Transparent pricing — pay after service
                </Badge>
              </motion.div>
            )}

            {!calcResult && (
              <ul className="space-y-2 mt-6 flex-1">
                {[{ icon: Shield, text: "No hidden charges" }, { icon: Clock, text: "Pay after service" }, { icon: Check, text: "Quick response team" }].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-foreground text-sm">
                    <Icon className="w-4 h-4 text-secondary" /> {text}
                  </li>
                ))}
              </ul>
            )}

            <Button asChild variant="outline" className="w-full rounded-xl h-12 font-semibold border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors mt-4">
              <a href={createWhatsAppUrl({ message: "Hi MedKit! I want to check pricing for a service." })} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 w-4 h-4" /> Book on WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyBookCalcSection;
