import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const PHONE = "9818185270";
const WHATSAPP = "919818185270";

const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
    <motion.a
      href={`tel:+91${PHONE}`}
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated text-primary-foreground"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
    </motion.a>
    <motion.a
      href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Hi MedKit! I need help with a healthcare service.")}`}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="w-14 h-14 rounded-full bg-[hsl(142,70%,49%)] flex items-center justify-center shadow-elevated text-primary-foreground"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  </div>
);

export default FloatingButtons;
