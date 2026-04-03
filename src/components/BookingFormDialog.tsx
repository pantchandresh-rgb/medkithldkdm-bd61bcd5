import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { addBooking } from "@/lib/bookings";
import { toast } from "@/hooks/use-toast";
import { CalendarCheck, MessageCircle } from "lucide-react";

const areas: Record<string, string[]> = {
  Haldwani: ["Rampur Road", "Kaladhungi Road", "Nainital Road", "Mukhani", "Heera Nagar", "Kusumkhera", "Panchakki", "Bareilly Road", "Transport Nagar"],
  Kathgodam: ["Kathgodam Market", "Gaula Barrage", "Shish Mahal", "Ranibagh"],
};

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  servicePrice: number;
}

const BookingFormDialog = ({ open, onOpenChange, serviceName, servicePrice }: Props) => {
  const [form, setForm] = useState({ name: "", phone: "", city: "", area: "", address: "", date: "", time: "", notes: "" });
  const [submitting, setSubmitting] = useState(false);

  const cityAreas = form.city ? areas[form.city] || [] : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.area || !form.address || !form.date || !form.time) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    addBooking({
      name: form.name,
      phone: form.phone,
      city: form.city,
      area: form.area,
      service: serviceName,
      address: form.address,
      dateTime: `${form.date} ${form.time}`,
      notes: form.notes,
    });
    toast({ title: "Booking Submitted! ✅", description: `Your ${serviceName} booking has been received. We'll contact you shortly.` });
    setForm({ name: "", phone: "", city: "", area: "", address: "", date: "", time: "", notes: "" });
    setSubmitting(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <CalendarCheck className="w-5 h-5 text-primary" />
            Book {serviceName}
          </DialogTitle>
          <p className="text-sm text-muted-foreground">Starting at <span className="font-bold text-primary">₹{servicePrice}</span></p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bk-name">Full Name *</Label>
              <Input id="bk-name" placeholder="Your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bk-phone">Phone Number *</Label>
              <Input id="bk-phone" placeholder="9876543210" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>City *</Label>
              <Select value={form.city} onValueChange={(v) => setForm({ ...form, city: v, area: "" })}>
                <SelectTrigger><SelectValue placeholder="Select city" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(areas).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Area *</Label>
              <Select value={form.area} onValueChange={(v) => setForm({ ...form, area: v })} disabled={!form.city}>
                <SelectTrigger><SelectValue placeholder="Select area" /></SelectTrigger>
                <SelectContent>
                  {cityAreas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bk-address">Full Address *</Label>
            <Input id="bk-address" placeholder="House no, street, landmark" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="bk-date">Preferred Date *</Label>
              <Input id="bk-date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="bk-time">Preferred Time *</Label>
              <Input id="bk-time" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="bk-notes">Notes (optional)</Label>
            <Textarea id="bk-notes" placeholder="Any special instructions..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={3} />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground rounded-full" disabled={submitting}>
              <CalendarCheck className="w-4 h-4 mr-2" /> Submit Booking
            </Button>
            <Button type="button" variant="outline" className="flex-1 rounded-full" asChild>
              <a
                href={`https://wa.me/919818185270?text=${encodeURIComponent(`Hi MedKit! I want to book ${serviceName} (₹${servicePrice}). Please confirm.`)}`}
                target="_blank" rel="noopener noreferrer"
              >
                <MessageCircle className="w-4 h-4 mr-2" /> Book via WhatsApp
              </a>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
