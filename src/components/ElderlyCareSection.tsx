import { motion } from "framer-motion";
import { Heart, Shield, Clock, Phone, Star, CheckCircle, UserCheck, Activity, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import elderlyCareImg from "@/assets/elderly-care.jpg";

const plans = [
  {
    name: "Basic Care",
    price: 2999,
    popular: false,
    icon: Heart,
    features: [
      { icon: UserCheck, text: "Weekly nurse visit" },
      { icon: Activity, text: "BP & sugar monitoring" },
      { icon: Phone, text: "Emergency support" },
      { icon: Stethoscope, text: "Basic health tracking" },
    ],
  },
  {
    name: "Advanced Care",
    price: 4999,
    popular: true,
    icon: Shield,
    features: [
      { icon: UserCheck, text: "2 nurse visits per week" },
      { icon: Stethoscope, text: "Medicine assistance" },
      { icon: Star, text: "Priority booking" },
      { icon: Activity, text: "Health monitoring" },
    ],
  },
  {
    name: "Premium Care",
    price: 7999,
    popular: false,
    icon: Clock,
    features: [
      { icon: Activity, text: "Daily monitoring" },
      { icon: UserCheck, text: "Dedicated caregiver support" },
      { icon: Stethoscope, text: "Full assistance" },
      { icon: Phone, text: "Emergency priority response" },
    ],
  },
];

const ElderlyCareSection = () => (
  <section className="relative py-28 overflow-hidden bg-gradient-to-b from-accent/40 to-background">
    {/* Decorative blobs */}
    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

    <div className="container relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 space-y-4"
      >
        <span className="text-sm font-semibold tracking-widest uppercase text-primary">Elderly Care Plans</span>
        <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground">
          Care for Your Parents at Home <span className="inline-block">❤️</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          Affordable monthly care plans designed for elderly safety, comfort, and regular health monitoring.
        </p>
        <p className="text-foreground font-medium text-base">👉 Ensure your parents are cared for even when you're not around.</p>
        <motion.img
          src={elderlyCareImg}
          alt="Elderly care at home with a caring nurse"
          loading="lazy"
          width={1024}
          height={640}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto rounded-2xl shadow-elevated max-w-2xl w-full h-auto object-cover"
        />
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative rounded-2xl p-8 flex flex-col shadow-card hover:shadow-elevated transition-all duration-300 ${
              plan.popular
                ? "bg-gradient-to-br from-primary/10 to-secondary/10 border-2 border-primary/30 scale-[1.03]"
                : "glass"
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 gradient-primary text-primary-foreground px-4 py-1 text-xs font-bold shadow-elevated">
                Most Popular
              </Badge>
            )}

            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${
              plan.popular ? "gradient-primary" : "bg-accent"
            }`}>
              <plan.icon className={`w-7 h-7 ${plan.popular ? "text-primary-foreground" : "text-primary"}`} />
            </div>

            <h3 className="text-xl font-display font-bold text-foreground mb-1">{plan.name}</h3>
            <div className="flex items-baseline gap-1 mb-1">
              <span className="text-4xl font-display font-bold text-primary">₹{plan.price.toLocaleString("en-IN")}</span>
              <span className="text-muted-foreground text-sm">/month</span>
            </div>
            <p className="text-xs font-semibold text-amber-600 mb-5">⚡ Limited slots available this week</p>

            <ul className="space-y-3 flex-1 mb-8">
              {plan.features.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-foreground text-sm">
                  <Icon className="w-4 h-4 text-secondary flex-shrink-0" />
                  {text}
                </li>
              ))}
            </ul>

            <Button
              asChild
              className={`w-full rounded-xl h-12 font-semibold hover:scale-[1.02] transition-transform ${
                plan.popular
                  ? "gradient-primary text-primary-foreground"
                  : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              }`}
              variant={plan.popular ? "default" : "outline"}
            >
              <a
                href={`https://wa.me/919818185270?text=${encodeURIComponent(`Hi MedKit! I'm interested in the ${plan.name} plan (₹${plan.price}/month). Please share details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Choose Plan
              </a>
            </Button>
          </motion.div>
        ))}
      </div>

      {/* CTA + Trust */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mt-14 space-y-5"
      >
        <Button
          asChild
          size="lg"
          className="rounded-full gradient-primary text-primary-foreground px-10 h-14 text-lg font-semibold shadow-elevated hover:scale-105 transition-transform"
        >
          <a href="https://wa.me/919818185270?text=Hi%20MedKit!%20I%20want%20to%20know%20about%20Elderly%20Care%20Plans." target="_blank" rel="noopener noreferrer">
            💬 Talk to Expert &amp; Get Plan
          </a>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="rounded-full border-primary text-primary px-10 h-14 text-lg font-semibold hover:bg-primary hover:text-primary-foreground transition-all"
        >
          <a href="tel:+919818185270">
            📞 Call: 9818185270
          </a>
        </Button>
        <p className="flex items-center justify-center gap-2 text-muted-foreground text-sm">
          <CheckCircle className="w-4 h-4 text-secondary" />
          Trusted by families in Haldwani &amp; Kathgodam
        </p>
      </motion.div>
    </div>
  </section>
);

export default ElderlyCareSection;
