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
    status: "Pending",
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
