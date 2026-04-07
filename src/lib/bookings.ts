export interface BookingEntry {
  id: string;
  name: string;
  phone: string;
  city: string;
  area: string;
  service: string;
  address: string;
  dateTime: string;
  notes: string;
  status: "Pending" | "Assigned" | "Completed";
  technician: string;
  createdAt: string;
  // Extended fields
  serviceType?: "home" | "doctor" | "ambulance";
  symptoms?: string;
  callType?: "Audio" | "Video";
  pickupLocation?: string;
  dropLocation?: string;
  emergencyType?: string;
  isEmergency?: boolean;
  paymentStatus?: "Unpaid" | "Paid";
}

const STORAGE_KEY = "medkit-bookings";

export function getBookings(): BookingEntry[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addBooking(booking: Omit<BookingEntry, "id" | "status" | "technician" | "createdAt">): BookingEntry {
  const entry: BookingEntry = {
    ...booking,
    id: crypto.randomUUID(),
    status: booking.isEmergency ? "Assigned" : "Pending",
    technician: "—",
    createdAt: new Date().toISOString(),
  };
  const bookings = getBookings();
  bookings.unshift(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  return entry;
}

export function updateBookingStatus(id: string, status: BookingEntry["status"]): void {
  const bookings = getBookings();
  const idx = bookings.findIndex((b) => b.id === id);
  if (idx !== -1) {
    bookings[idx].status = status;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }
}

// AI-like keyword service suggestion
const serviceKeywords: Record<string, string[]> = {
  "Doctor Consultation": ["fever", "cold", "cough", "headache", "sick", "diagnosis", "consult", "doctor", "medicine", "prescription", "throat", "stomach", "nausea", "vomit"],
  "Ambulance Service": ["accident", "emergency", "urgent", "bleeding", "unconscious", "heart attack", "stroke", "critical", "ambulance", "fracture", "collapse"],
  "Injection at Home": ["injection", "shot", "vaccine", "insulin"],
  "IV Drip Administration": ["drip", "iv", "saline", "hydration", "infusion"],
  "ECG Test at Home": ["ecg", "heart", "chest pain", "cardiac"],
  "Nurse Visit at Home": ["nurse", "post surgery", "wound", "dressing", "elderly care"],
  "Physiotherapy at Home": ["physio", "therapy", "pain", "joint", "back pain", "exercise", "mobility"],
  "BP & Sugar Check": ["bp", "blood pressure", "sugar", "diabetes", "glucose"],
  "Blood Test at Home": ["blood test", "lab", "cbc", "thyroid", "report"],
  "Wound / Burn Dressing": ["wound", "burn", "cut", "dressing", "bandage"],
};

export function suggestService(input: string): { service: string; isEmergency: boolean } | null {
  const lower = input.toLowerCase();
  const emergencyWords = ["accident", "emergency", "urgent", "bleeding", "unconscious", "heart attack", "stroke", "critical", "collapse"];
  const isEmergency = emergencyWords.some(w => lower.includes(w));

  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [service, keywords] of Object.entries(serviceKeywords)) {
    const score = keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) {
      bestScore = score;
      bestMatch = service;
    }
  }

  if (bestMatch) return { service: bestMatch, isEmergency };
  return null;
}
