// Real-time pricing engine for MedKit

export interface ServicePrice {
  id: string;
  name: string;
  category: "home" | "bite" | "dressing" | "doctor" | "ambulance";
  basePrice: number;
  subtype?: string;
}

export const allServices: ServicePrice[] = [
  // Core Home Services
  { id: "injection", name: "Injection at Home", category: "home", basePrice: 120 },
  { id: "iv-drip", name: "IV Drip Administration", category: "home", basePrice: 300 },
  { id: "ecg", name: "ECG Test at Home", category: "home", basePrice: 400 },
  { id: "nurse", name: "Nurse Visit at Home", category: "home", basePrice: 499 },
  { id: "physio", name: "Physiotherapy at Home", category: "home", basePrice: 500 },
  { id: "bp-sugar", name: "BP & Sugar Check", category: "home", basePrice: 199 },
  { id: "blood-test", name: "Blood Test at Home", category: "home", basePrice: 499 },
  // Bite & Emergency
  { id: "dog-bite", name: "Dog Bite Injection", category: "bite", basePrice: 300, subtype: "Dog Bite" },
  { id: "monkey-bite", name: "Monkey Bite Injection", category: "bite", basePrice: 300, subtype: "Monkey Bite" },
  { id: "snake-bite", name: "Snake Bite (Emergency)", category: "bite", basePrice: 500, subtype: "Snake Bite" },
  // Dressing & Injury
  { id: "minor-dressing", name: "Minor Dressing", category: "dressing", basePrice: 200, subtype: "Minor" },
  { id: "major-dressing", name: "Major Dressing", category: "dressing", basePrice: 400, subtype: "Major" },
  { id: "burn-dressing", name: "Burn Dressing", category: "dressing", basePrice: 300, subtype: "Burn" },
  { id: "plaster-apply", name: "Plaster Application", category: "dressing", basePrice: 600, subtype: "Plaster Apply" },
  { id: "plaster-remove", name: "Plaster Removal", category: "dressing", basePrice: 300, subtype: "Plaster Remove" },
  // Doctor
  { id: "doctor", name: "Doctor Consultation", category: "doctor", basePrice: 300 },
  // Ambulance
  { id: "ambulance-non-icu", name: "Non-ICU Ambulance", category: "ambulance", basePrice: 800, subtype: "Non-ICU" },
  { id: "ambulance-icu", name: "ICU Ambulance", category: "ambulance", basePrice: 1500, subtype: "ICU" },
];

// Area-to-distance mapping (km from center hub)
export const areaDistances: Record<string, number> = {
  // Haldwani areas
  "Rampur Road": 3,
  "Kaladhungi Road": 4,
  "Nainital Road": 5,
  "Mukhani": 3,
  "Heera Nagar": 2,
  "Kusumkhera": 4,
  "Panchakki": 3,
  "Bareilly Road": 6,
  "Transport Nagar": 2,
  "Lamachaur": 7,
  "Kathgharia": 5,
  "Devalchaur": 8,
  "Chadail": 6,
  // Kathgodam areas
  "Kathgodam Market": 4,
  "Gaula Barrage": 6,
  "Shish Mahal": 5,
  "Ranibagh": 7,
};

export const extendedAreas: Record<string, string[]> = {
  Haldwani: [
    "Rampur Road", "Kaladhungi Road", "Nainital Road", "Mukhani",
    "Heera Nagar", "Kusumkhera", "Panchakki", "Bareilly Road",
    "Transport Nagar", "Lamachaur", "Kathgharia", "Devalchaur", "Chadail",
  ],
  Kathgodam: ["Kathgodam Market", "Gaula Barrage", "Shish Mahal", "Ranibagh"],
};

export type UrgencyLevel = "normal" | "same_day" | "emergency";

export const urgencyCharges: Record<UrgencyLevel, number> = {
  normal: 0,
  same_day: 50,
  emergency: 100,
};

export interface PriceBreakdown {
  basePrice: number;
  distanceCost: number;
  urgencyCharge: number;
  platformFee: number;
  totalPrice: number;
  distanceKm: number;
}

export function calculatePrice(
  serviceId: string,
  area: string,
  urgency: UrgencyLevel = "normal"
): PriceBreakdown | null {
  const service = allServices.find((s) => s.id === serviceId || s.name === serviceId);
  if (!service) return null;

  const basePrice = service.basePrice;
  const distanceKm = areaDistances[area] ?? 3;

  // Distance: first 3 km free, then ₹10/km (₹15/km for ambulance)
  const freeKm = 3;
  const ratePerKm = service.category === "ambulance" ? 15 : 10;
  const distanceCost = distanceKm > freeKm ? (distanceKm - freeKm) * ratePerKm : 0;

  // Urgency (no urgency charge for doctor — optional already in base)
  const urgencyCharge = service.category === "doctor" ? 0 : urgencyCharges[urgency];

  // Platform fee: ₹50 min or 10% of subtotal
  const subtotal = basePrice + distanceCost + urgencyCharge;
  const platformFee = Math.max(50, Math.round(subtotal * 0.1));

  const totalPrice = subtotal + platformFee;

  return { basePrice, distanceCost, urgencyCharge, platformFee, totalPrice, distanceKm };
}

export function getServiceById(id: string): ServicePrice | undefined {
  return allServices.find((s) => s.id === id || s.name === id);
}

export function getServicesByCategory(category: ServicePrice["category"]): ServicePrice[] {
  return allServices.filter((s) => s.category === category);
}
