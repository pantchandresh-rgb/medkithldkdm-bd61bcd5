import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Areas", href: "#areas" },
  { label: "Partner", href: "#partner" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container flex items-center justify-between h-16">
        <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-foreground">
          <Heart className="w-6 h-6 text-primary" /> MedKit
        </a>
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
          ))}
          <Button size="sm" className="rounded-full gradient-primary text-primary-foreground font-semibold px-6">
            Book Now
          </Button>
        </div>
        <button onClick={() => setOpen(!open)} className="md:hidden text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden glass">
            <div className="container py-4 space-y-3">
              {links.map(l => (
                <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block py-2 text-sm font-medium text-foreground">{l.label}</a>
              ))}
              <Button className="w-full rounded-full gradient-primary text-primary-foreground font-semibold">Book Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
