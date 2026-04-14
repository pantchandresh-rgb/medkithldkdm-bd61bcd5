import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginModal from "@/components/LoginModal";

const links = [
  { label: "Home", href: "#" },
  { label: "Services", href: "#services" },
  { label: "Booking", href: "#booking" },
  { label: "Areas", href: "#areas" },
  { label: "Partner", href: "#partner" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/30">
        <div className="container flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2 font-display font-bold text-xl text-foreground">
            <Heart className="w-6 h-6 text-primary" /> MedKit
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map(l => (
              <a key={l.label} href={l.href} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{l.label}</a>
            ))}
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="gap-1.5 text-sm" onClick={() => navigate("/my-account")}>
                  <User className="w-4 h-4" /> {user?.name?.split(" ")[0]}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => { logout(); }} title="Logout">
                  <LogOut className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="rounded-full px-5 gap-1.5" onClick={() => setLoginOpen(true)}>
                <User className="w-4 h-4" /> My Account
              </Button>
            )}
            <Button asChild size="sm" className="rounded-full gradient-primary text-primary-foreground font-semibold px-6">
              <a href="#booking">Book Now</a>
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
                {isLoggedIn ? (
                  <div className="flex items-center justify-between py-2">
                    <Button variant="ghost" size="sm" className="gap-1.5" onClick={() => { setOpen(false); navigate("/my-account"); }}>
                      <User className="w-4 h-4" /> {user?.name?.split(" ")[0]}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive gap-1" onClick={() => { logout(); setOpen(false); }}>
                      <LogOut className="w-4 h-4" /> Logout
                    </Button>
                  </div>
                ) : (
                  <Button variant="outline" className="w-full rounded-full gap-1.5" onClick={() => { setLoginOpen(true); setOpen(false); }}>
                    <User className="w-4 h-4" /> My Account
                  </Button>
                )}
                <Button asChild className="w-full rounded-full gradient-primary text-primary-foreground font-semibold">
                  <a href="#booking" onClick={() => setOpen(false)}>Book Now</a>
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
      <LoginModal open={loginOpen} onOpenChange={setLoginOpen} />
    </>
  );
};

export default Navbar;
