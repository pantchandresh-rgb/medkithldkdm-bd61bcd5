import { useState, useEffect } from "react";
import { getBookings, updateBookingStatus, type BookingEntry } from "@/lib/bookings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MessageCircle, CheckCircle2, ArrowLeft, Stethoscope } from "lucide-react";
import { createWhatsAppUrl } from "@/lib/whatsapp";

const DoctorDashboard = () => {
  const [bookings, setBookings] = useState<BookingEntry[]>([]);

  useEffect(() => {
    setBookings(getBookings().filter(b => b.serviceType === "doctor"));
  }, []);

  const markCompleted = (id: string) => {
    updateBookingStatus(id, "Completed");
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: "Completed" } : b));
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-30 h-16 bg-card/80 backdrop-blur-lg border-b border-border flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-3">
          <Stethoscope className="w-5 h-5 text-primary" />
          <h1 className="text-lg font-display font-bold text-foreground">Doctor Dashboard</h1>
        </div>
        <a href="/" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1.5">
          <ArrowLeft className="w-4 h-4" /> Back
        </a>
      </header>

      <main className="p-4 md:p-8 max-w-4xl mx-auto space-y-4">
        <p className="text-muted-foreground text-sm">{bookings.length} consultation requests</p>
        {bookings.length === 0 && <p className="text-center text-muted-foreground py-16">No consultation requests yet.</p>}
        {bookings.map(b => (
          <div key={b.id} className="bg-card border border-border rounded-xl p-5 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-semibold text-foreground">{b.name}</p>
                <p className="text-sm text-muted-foreground">{b.callType || "Audio"} Call • {b.area}, {b.city}</p>
                {b.symptoms && <p className="text-sm text-foreground mt-1">🩺 {b.symptoms}</p>}
                <p className="text-xs text-muted-foreground mt-1">{b.dateTime}</p>
                {b.paymentStatus && (
                  <Badge variant={b.paymentStatus === "Paid" ? "default" : "destructive"} className="mt-1 text-xs">
                    {b.paymentStatus === "Paid" ? "💳 Paid" : "⚠ Unpaid"}
                  </Badge>
                )}
              </div>
              <Badge variant={b.status === "Completed" ? "default" : "secondary"} className="text-xs">{b.status}</Badge>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="gap-1.5 rounded-lg" asChild>
                <a href={`tel:${b.phone}`}><Phone className="w-3 h-3" /> Call Patient</a>
              </Button>
              <Button size="sm" variant="outline" className="gap-1.5 rounded-lg" asChild>
                <a href={createWhatsAppUrl({ phone: b.phone })} target="_blank" rel="noopener noreferrer"><MessageCircle className="w-3 h-3" /> WhatsApp</a>
              </Button>
              {b.status !== "Completed" && (
                <Button size="sm" className="gap-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-primary-foreground" onClick={() => markCompleted(b.id)}>
                  <CheckCircle2 className="w-3 h-3" /> Done
                </Button>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default DoctorDashboard;
