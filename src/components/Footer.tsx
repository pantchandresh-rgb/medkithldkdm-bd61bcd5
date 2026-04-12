import { Heart } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const Footer = () => (
  <footer className="gradient-hero text-primary-foreground/80 py-20">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-primary-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" /> MedKit
          </h3>
          <p className="text-sm leading-relaxed">
            Your trusted healthcare-at-home partner in Haldwani & Kathgodam. Quality medical care delivered to your doorstep.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2.5 text-sm">
            {["Home", "Services", "Doctors", "Book Now", "Partner With Us"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wider">Services</h4>
          <ul className="space-y-2.5 text-sm">
            {["Injection at Home", "IV Drip", "ECG Test", "Nurse Visit", "Doctor Consultation", "Ambulance Service"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-2.5 text-sm">
            <li>📞 +91 9818185270</li>
            <li>📧 hello@medkit.in</li>
            <li>📍 Haldwani, Uttarakhand</li>
          </ul>
        </div>
      </div>
      <Separator className="my-10 bg-primary-foreground/10" />
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm">
        <span>© {new Date().getFullYear()} MedKit. All rights reserved.</span>
        <a href="/admin" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-xs">
          Admin Panel
        </a>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-primary-foreground/30 mt-3">
        <a href="/technician" className="hover:text-primary-foreground/60 transition-colors">Technician Dashboard</a>
        <span>•</span>
        <a href="/doctor-dashboard" className="hover:text-primary-foreground/60 transition-colors">Doctor Dashboard</a>
        <span>•</span>
        <a href="/ambulance-dashboard" className="hover:text-primary-foreground/60 transition-colors">Ambulance Dashboard</a>
      </div>
    </div>
  </footer>
);

export default Footer;
