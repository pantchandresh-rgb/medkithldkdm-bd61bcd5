import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

const FloatingButtons = () => (
  <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
    <motion.a
      href="tel:+919999999999"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-elevated text-primary-foreground"
      aria-label="Call us"
    >
      <Phone className="w-6 h-6" />
    </motion.a>
    <motion.a
      href="https://wa.me/919999999999"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.15 }}
      whileTap={{ scale: 0.95 }}
      className="w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-elevated text-primary-foreground"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </motion.a>
  </div>
);

export default FloatingButtons;
