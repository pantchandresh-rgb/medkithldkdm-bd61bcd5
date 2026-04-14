import { useState, useEffect, useMemo } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { addBooking, suggestService } from "@/lib/bookings";
import { calculatePrice, extendedAreas, type UrgencyLevel, type PriceBreakdown } from "@/lib/pricing";
import { openWhatsApp } from "@/lib/whatsapp";
import { toast } from "@/hooks/use-toast";
import { CalendarCheck, MessageCircle, Sparkles, AlertTriangle, CreditCard, CheckCircle2, TrendingUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  serviceName: string;
  servicePrice: number;
}

const BookingFormDialog = ({ open, onOpenChange, serviceName, servicePrice }: Props) => {
  const [form, setForm] = useState({
    name: "", phone: "", city: "", area: "", address: "", date: "", time: "", notes: "",
    symptoms: "", callType: "", pickupLocation: "", dropLocation: "", emergencyType: "",
    problemDescription: "", ambulanceType: "",
  });
  const [urgency, setUrgency] = useState<UrgencyLevel>("normal");
  const [submitting, setSubmitting] = useState(false);
  const [aiSuggestion, setAiSuggestion] = useState<{ service: string; isEmergency: boolean } | null>(null);
  const [hasPaid, setHasPaid] = useState(false);

  const isDoctor = serviceName === "Doctor Consultation";
  const isAmbulance = serviceName === "Ambulance Service" || serviceName === "Non-ICU Ambulance" || serviceName === "ICU Ambulance";
  const cityAreas = form.city ? extendedAreas[form.city] || [] : [];

  // Real-time price calculation
  const pricing: PriceBreakdown | null = useMemo(() => {
    if (!form.area) return null;
    let serviceId = serviceName;
    if (isAmbulance && form.ambulanceType) {
      serviceId = form.ambulanceType === "ICU" ? "ambulance-icu" : "ambulance-non-icu";
    }
    return calculatePrice(serviceId, form.area, urgency);
  }, [serviceName, form.area, form.ambulanceType, urgency, isAmbulance]);

  useEffect(() => {
    if (form.problemDescription.length > 5) {
      const result = suggestService(form.problemDescription);
      setAiSuggestion(result);
    } else {
      setAiSuggestion(null);
    }
  }, [form.problemDescription]);

  const buildWhatsAppMsg = () => {
    const price = pricing?.totalPrice ?? servicePrice;
    let msg = `Hi MedKit! I want to book ${serviceName} (₹${price}).`;
    msg += `\nName: ${form.name}\nPhone: ${form.phone}\nArea: ${form.area}, ${form.city}\nAddress: ${form.address}`;
    if (pricing) {
      msg += `\n\n💰 Price Breakdown:`;
      msg += `\nBase: ₹${pricing.basePrice}`;
      msg += `\nDistance (${pricing.distanceKm}km): ₹${pricing.distanceCost}`;
      if (pricing.urgencyCharge > 0) msg += `\nUrgency: ₹${pricing.urgencyCharge}`;
      msg += `\nPlatform Fee: ₹${pricing.platformFee}`;
      msg += `\nTotal: ₹${pricing.totalPrice}`;
    }
    if (isDoctor) {
      msg += `\nSymptoms: ${form.symptoms}\nCall Type: ${form.callType}\nPayment: ${hasPaid ? "Paid ✅" : "Unpaid"}`;
    }
    if (isAmbulance) {
      msg += `\nAmbulance Type: ${form.ambulanceType || "Non-ICU"}`;
      msg += `\nPickup: ${form.pickupLocation}\nDrop: ${form.dropLocation}\nEmergency: ${form.emergencyType}`;
    }
    if (form.notes) msg += `\nNotes: ${form.notes}`;
    return msg;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.city || !form.area || !form.address || !form.date || !form.time) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    if (isDoctor && !hasPaid) {
      toast({ title: "Payment required", description: "Please complete UPI payment before submitting.", variant: "destructive" });
      return;
    }
    if (isDoctor && !form.symptoms) {
      toast({ title: "Please describe your symptoms", variant: "destructive" });
      return;
    }
    if (isAmbulance && !form.pickupLocation) {
      toast({ title: "Please enter pickup location", variant: "destructive" });
      return;
    }

    setSubmitting(true);

    const emergencyWords = ["accident", "emergency", "urgent", "bleeding", "unconscious", "heart attack", "stroke", "critical", "snake"];
    const isEmergency = emergencyWords.some(w => (form.emergencyType + form.notes + form.problemDescription).toLowerCase().includes(w));

    addBooking({
      name: form.name, phone: form.phone, city: form.city, area: form.area,
      service: serviceName, address: form.address,
      dateTime: `${form.date} ${form.time}`, notes: form.notes,
      serviceType: isDoctor ? "doctor" : isAmbulance ? "ambulance" : "home",
      symptoms: form.symptoms || undefined,
      callType: (form.callType as "Audio" | "Video") || undefined,
      pickupLocation: form.pickupLocation || undefined,
      dropLocation: form.dropLocation || undefined,
      emergencyType: form.emergencyType || undefined,
      isEmergency,
      paymentStatus: isDoctor ? (hasPaid ? "Paid" : "Unpaid") : undefined,
    });

    toast({
      title: isEmergency ? "🚨 Emergency Booking Submitted!" : "Booking Submitted! ✅",
      description: isEmergency
        ? "Priority assignment activated. We'll contact you immediately."
        : `Your ${serviceName} booking has been received. We'll contact you shortly.`,
    });

    setForm({ name: "", phone: "", city: "", area: "", address: "", date: "", time: "", notes: "", symptoms: "", callType: "", pickupLocation: "", dropLocation: "", emergencyType: "", problemDescription: "", ambulanceType: "" });
    setHasPaid(false);
    setUrgency("normal");
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

        {/* AI Suggestion */}
        <div className="space-y-2">
          <Badge variant="secondary" className="text-xs gap-1"><Sparkles className="w-3 h-3" /> Smart assistance enabled</Badge>
          <div className="space-y-1.5">
            <Label>Describe your problem</Label>
            <Textarea
              placeholder="e.g. I have fever and headache since 2 days..."
              value={form.problemDescription}
              onChange={(e) => setForm({ ...form, problemDescription: e.target.value })}
              rows={2} className="text-sm"
            />
          </div>
          {aiSuggestion?.isEmergency && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm">
              <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0" />
              <span className="text-destructive font-medium">🚨 Emergency detected — fastest response activated</span>
            </div>
          )}
          {aiSuggestion && !aiSuggestion.isEmergency && aiSuggestion.service !== serviceName && (
            <p className="text-xs text-muted-foreground">💡 Suggested service: <strong>{aiSuggestion.service}</strong></p>
          )}
        </div>

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
                  {Object.keys(extendedAreas).map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
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

          {/* Urgency */}
          <div className="space-y-1.5">
            <Label>Urgency Level</Label>
            <Select value={urgency} onValueChange={(v) => setUrgency(v as UrgencyLevel)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal (No extra charge)</SelectItem>
                <SelectItem value="same_day">Same Day (+₹50)</SelectItem>
                <SelectItem value="emergency">Emergency (+₹100)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ambulance Type Selection */}
          {isAmbulance && (
            <div className="space-y-4 p-4 rounded-xl border border-destructive/20 bg-destructive/5">
              <h4 className="text-sm font-semibold text-destructive flex items-center gap-1.5">🚑 Ambulance Details</h4>
              <div className="space-y-1.5">
                <Label>Ambulance Type *</Label>
                <Select value={form.ambulanceType} onValueChange={(v) => setForm({ ...form, ambulanceType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Non-ICU">🚑 Non-ICU Ambulance (₹800 – ₹1200)</SelectItem>
                    <SelectItem value="ICU">🏥 ICU Ambulance (₹1500 – ₹2500)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Pickup Location *</Label>
                <Input placeholder="Where to pick up?" value={form.pickupLocation} onChange={(e) => setForm({ ...form, pickupLocation: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Drop Location</Label>
                <Input placeholder="Hospital / Destination" value={form.dropLocation} onChange={(e) => setForm({ ...form, dropLocation: e.target.value })} />
              </div>
              <div className="space-y-1.5">
                <Label>Emergency Type</Label>
                <Select value={form.emergencyType} onValueChange={(v) => setForm({ ...form, emergencyType: v })}>
                  <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Accident">🚗 Accident</SelectItem>
                    <SelectItem value="Medical Emergency">🏥 Medical Emergency</SelectItem>
                    <SelectItem value="Heart/Cardiac">❤️ Heart / Cardiac</SelectItem>
                    <SelectItem value="Pregnancy">🤰 Pregnancy</SelectItem>
                    <SelectItem value="Transfer">🔄 Hospital Transfer</SelectItem>
                    <SelectItem value="Other">📋 Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Doctor Consultation Fields */}
          {isDoctor && (
            <div className="space-y-4 p-4 rounded-xl border border-primary/20 bg-primary/5">
              <h4 className="text-sm font-semibold text-primary flex items-center gap-1.5">🩺 Doctor Consultation Details</h4>
              <div className="space-y-1.5">
                <Label>Symptoms / Issue *</Label>
                <Textarea placeholder="Describe your symptoms in detail..." value={form.symptoms} onChange={(e) => setForm({ ...form, symptoms: e.target.value })} rows={3} />
              </div>
              <div className="space-y-1.5">
                <Label>Call Type</Label>
                <Select value={form.callType} onValueChange={(v) => setForm({ ...form, callType: v })}>
                  <SelectTrigger><SelectValue placeholder="Audio / Video" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Audio">📞 Audio Call</SelectItem>
                    <SelectItem value="Video">📹 Video Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {/* UPI Payment */}
              <div className="space-y-3 p-4 rounded-xl border border-amber-300/30 bg-amber-50/50 dark:bg-amber-900/10">
                <h5 className="text-sm font-semibold flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-600" /> Payment Required
                </h5>
                <p className="text-xs text-muted-foreground">Pay via UPI before submitting your consultation request.</p>
                <div className="flex flex-col items-center gap-2 py-3">
                  <div className="px-4 py-2 rounded-lg bg-card border text-center">
                    <p className="text-xs text-muted-foreground">UPI ID</p>
                    <p className="text-sm font-bold text-foreground select-all">medkit@upi</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Amount: <strong className="text-primary">₹{pricing?.totalPrice ?? servicePrice}</strong></p>
                </div>
                <Button
                  type="button"
                  variant={hasPaid ? "default" : "outline"}
                  className={`w-full rounded-lg ${hasPaid ? "bg-emerald-600 hover:bg-emerald-700 text-primary-foreground" : "border-amber-400 text-amber-700 hover:bg-amber-100"}`}
                  onClick={() => setHasPaid(!hasPaid)}
                >
                  {hasPaid ? <><CheckCircle2 className="w-4 h-4 mr-1" /> Payment Confirmed</> : "I Have Paid ✅"}
                </Button>
              </div>
            </div>
          )}

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
            <Textarea id="bk-notes" placeholder="Any special instructions..." value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2} />
          </div>

          {/* Real-time Price Breakdown */}
          {pricing && (
            <div className="p-4 rounded-xl bg-accent/50 border border-border space-y-2">
              <h4 className="text-sm font-semibold flex items-center gap-1.5 text-foreground">
                <TrendingUp className="w-4 h-4 text-primary" /> Price Breakdown
              </h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between text-muted-foreground"><span>Base Price</span><span className="text-foreground">₹{pricing.basePrice}</span></div>
                <div className="flex justify-between text-muted-foreground"><span>Distance ({pricing.distanceKm} km)</span><span className="text-foreground">₹{pricing.distanceCost}</span></div>
                {pricing.urgencyCharge > 0 && <div className="flex justify-between text-muted-foreground"><span>Urgency</span><span className="text-destructive">₹{pricing.urgencyCharge}</span></div>}
                <div className="flex justify-between text-muted-foreground"><span>Platform Fee</span><span className="text-foreground">₹{pricing.platformFee}</span></div>
                <div className="border-t border-border pt-1.5 flex justify-between font-bold text-foreground"><span>Total</span><span className="text-primary text-lg">₹{pricing.totalPrice}</span></div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" className="flex-1 gradient-primary text-primary-foreground rounded-full" disabled={submitting}>
              <CalendarCheck className="w-4 h-4 mr-2" /> Submit Booking
            </Button>
            <Button type="button" variant="outline" className="flex-1 rounded-full" onClick={() => {
              openWhatsApp({ message: buildWhatsAppMsg() });
            }}>
              <MessageCircle className="w-4 h-4 mr-2" /> Book via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BookingFormDialog;
