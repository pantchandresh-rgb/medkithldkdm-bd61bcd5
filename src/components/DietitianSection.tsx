import { useState } from "react";
import { motion } from "framer-motion";
import { Apple, Phone, MessageCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { addDietitianRequest } from "@/lib/dietitian";
import { openWhatsApp } from "@/lib/whatsapp";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const concerns = [
  "Weight Loss",
  "Weight Gain",
  "Diabetes Management",
  "PCOS / Hormonal Health",
  "Heart Health",
  "General Wellness",
  "Post-Surgery Diet",
  "Child Nutrition",
  "Other",
];

const DietitianSection = () => {
  const { user, isLoggedIn } = useAuth();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", concern: "", customConcern: "", preferredTime: "" });

  const handleOpen = () => {
    if (isLoggedIn && user) {
      setForm((prev) => ({ ...prev, name: prev.name || user.name, phone: prev.phone || user.phone }));
    }
    setSubmitted(false);
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error("Please enter your name and phone number");
      return;
    }
    if (!/^\d{10}$/.test(form.phone)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    const concern = form.concern === "Other" ? form.customConcern : form.concern;
    if (!concern) {
      toast.error("Please select or describe your concern");
      return;
    }

    addDietitianRequest({ name: form.name, phone: form.phone, concern, preferredTime: form.preferredTime });
    setSubmitted(true);
    toast.success("Our dietitian will contact you shortly!");
  };

  const resetAndClose = () => {
    setForm({ name: "", phone: "", concern: "", customConcern: "", preferredTime: "" });
    setSubmitted(false);
    setOpen(false);
  };

  return (
    <section className="py-20 bg-accent/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto bg-card rounded-3xl border border-border/60 shadow-card overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            {/* Left - Info */}
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
              <div className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center">
                <Apple className="w-7 h-7 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-semibold tracking-widest uppercase text-primary">New Service</span>
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  Talk to a <span className="text-gradient">Dietitian</span>
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Get personalized diet and nutrition advice from certified experts. Whether it's weight management, diabetes care, or general wellness — our dietitians are here to help.
                </p>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> Certified nutrition experts</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> Personalized diet plans</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> Phone or WhatsApp consultation</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" /> No payment required to connect</li>
              </ul>
              <Button onClick={handleOpen} className="gradient-primary text-primary-foreground rounded-full px-8 w-fit hover:scale-105 transition-transform">
                Consult Now
              </Button>
            </div>

            {/* Right - Illustration area */}
            <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-primary/5 to-accent/50 p-10">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center">
                  <Apple className="w-12 h-12 text-primary-foreground" />
                </div>
                <p className="text-lg font-display font-semibold text-foreground">Expert Nutrition Advice</p>
                <p className="text-sm text-muted-foreground max-w-[200px] mx-auto">Personalized guidance for a healthier you</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Consultation Form Dialog */}
      <Dialog open={open} onOpenChange={(v) => !v && resetAndClose()}>
        <DialogContent className="sm:max-w-md">
          {!submitted ? (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 font-display">
                  <Apple className="w-5 h-5 text-primary" /> Talk to a Dietitian
                </DialogTitle>
                <p className="text-sm text-muted-foreground">Fill in your details. No payment required.</p>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-2">
                <div className="space-y-1.5">
                  <Label>Name *</Label>
                  <Input placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone Number *</Label>
                  <Input placeholder="9876543210" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
                </div>
                <div className="space-y-1.5">
                  <Label>Concern *</Label>
                  <Select value={form.concern} onValueChange={(v) => setForm({ ...form, concern: v })}>
                    <SelectTrigger><SelectValue placeholder="Select your concern" /></SelectTrigger>
                    <SelectContent>
                      {concerns.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {form.concern === "Other" && (
                  <div className="space-y-1.5">
                    <Label>Describe your concern</Label>
                    <Textarea placeholder="Tell us more..." value={form.customConcern} onChange={(e) => setForm({ ...form, customConcern: e.target.value })} rows={2} />
                  </div>
                )}
                <div className="space-y-1.5">
                  <Label>Preferred Time (optional)</Label>
                  <Input type="time" value={form.preferredTime} onChange={(e) => setForm({ ...form, preferredTime: e.target.value })} />
                </div>
                <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-full">
                  Submit Request
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-primary" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-display font-bold text-foreground">Request Submitted!</h3>
                <p className="text-sm text-muted-foreground">Our dietitian will contact you shortly.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button
                  onClick={() => openWhatsApp({ message: `Hi MedKit! I'd like to consult a dietitian.\nName: ${form.name}\nConcern: ${form.concern === "Other" ? form.customConcern : form.concern}` })}
                  className="rounded-full gap-2 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-primary-foreground"
                >
                  <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                </Button>
                <Button variant="outline" className="rounded-full gap-2" asChild>
                  <a href="tel:+919818185270">
                    <Phone className="w-4 h-4" /> Call Now
                  </a>
                </Button>
              </div>
              <Button variant="ghost" size="sm" onClick={resetAndClose} className="text-muted-foreground">
                Close
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default DietitianSection;
