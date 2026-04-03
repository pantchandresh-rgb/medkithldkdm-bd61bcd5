import { Heart } from "lucide-react";

const Footer = () => (
  <footer className="gradient-hero text-primary-foreground/80 py-16">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div className="space-y-4">
          <h3 className="text-xl font-display font-bold text-primary-foreground flex items-center gap-2">
            <Heart className="w-5 h-5 text-secondary" /> MedKit
          </h3>
          <p className="text-sm leading-relaxed">
            Your trusted healthcare-at-home partner in Haldwani & Kathgodam. Quality medical care delivered to your doorstep.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {["Home", "Services", "Book Now", "Partner With Us"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-primary-foreground transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground">Services</h4>
          <ul className="space-y-2 text-sm">
            {["Injection at Home", "IV Drip", "ECG Test", "Nurse Visit", "Physiotherapy", "Blood Test"].map(s => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-display font-bold text-primary-foreground">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li>📞 +91 99999 99999</li>
            <li>📧 hello@medkit.in</li>
            <li>📍 Haldwani, Uttarakhand</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
        <span>© {new Date().getFullYear()} MedKit. All rights reserved.</span>
        <a href="/admin" className="text-primary-foreground/40 hover:text-primary-foreground/70 transition-colors text-xs">
          Admin Panel
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
