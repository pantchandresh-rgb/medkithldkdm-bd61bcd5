import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { openWhatsApp } from "@/lib/whatsapp";
import { getBookings, type BookingEntry } from "@/lib/bookings";
import { User, Phone, MapPin, Edit2, Save, X, LogOut, CalendarCheck, MessageCircle, PhoneCall, ArrowLeft, Clock, CheckCircle2, AlertTriangle } from "lucide-react";

const MyAccount = () => {
  const { user, isLoggedIn, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [bookings, setBookings] = useState<BookingEntry[]>([]);
  const [expandedBooking, setExpandedBooking] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
      return;
    }
    if (user) {
      setForm({ name: user.name, phone: user.phone, address: user.address || "" });
      setBookings(getBookings().filter((b) => b.phone === user.phone));
    }
  }, [user, isLoggedIn, navigate]);

  const handleSave = () => {
    const trimmedPhone = form.phone.replace(/\D/g, "");
    if (!form.name.trim()) {
      toast({ title: "Name is required", variant: "destructive" });
      return;
    }
    if (trimmedPhone.length !== 10) {
      toast({ title: "Enter valid 10-digit phone", variant: "destructive" });
      return;
    }
    updateProfile({ name: form.name.trim(), phone: trimmedPhone, address: form.address.trim() || undefined });
    setEditing(false);
    toast({ title: "Profile updated ✅" });
  };

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully" });
    navigate("/");
  };

  const statusIcon = (status: string) => {
    if (status === "Completed") return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
    if (status === "Assigned") return <Clock className="w-4 h-4 text-amber-500" />;
    return <AlertTriangle className="w-4 h-4 text-muted-foreground" />;
  };

  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-2xl py-8 px-4 space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")} className="gap-1">
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <Button variant="outline" size="sm" onClick={handleLogout} className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        {/* Profile Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="w-5 h-5 text-primary" /> My Profile
            </CardTitle>
            {!editing ? (
              <Button variant="ghost" size="sm" onClick={() => setEditing(true)} className="gap-1">
                <Edit2 className="w-4 h-4" /> Edit
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button variant="ghost" size="sm" onClick={() => setEditing(false)}><X className="w-4 h-4" /></Button>
                <Button size="sm" onClick={handleSave} className="gap-1 gradient-primary text-primary-foreground"><Save className="w-4 h-4" /> Save</Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="space-y-4">
            {editing ? (
              <>
                <div className="space-y-1.5">
                  <Label>Name</Label>
                  <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} maxLength={50} />
                </div>
                <div className="space-y-1.5">
                  <Label>Phone</Label>
                  <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} maxLength={10} />
                </div>
                <div className="space-y-1.5">
                  <Label>Address (optional)</Label>
                  <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Home address for auto-fill" maxLength={200} />
                </div>
              </>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm"><User className="w-4 h-4 text-muted-foreground" /> <span className="font-medium">{user?.name}</span></div>
                <div className="flex items-center gap-3 text-sm"><Phone className="w-4 h-4 text-muted-foreground" /> <span>{user?.phone}</span></div>
                {user?.address && <div className="flex items-center gap-3 text-sm"><MapPin className="w-4 h-4 text-muted-foreground" /> <span>{user.address}</span></div>}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" className="rounded-full gap-2" onClick={() => openWhatsApp({ message: "Hi MedKit, I need help with my account." })}>
            <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
          </Button>
          <Button variant="outline" className="rounded-full gap-2" asChild>
            <a href="tel:+919818185270"><PhoneCall className="w-4 h-4" /> Call Now</a>
          </Button>
        </div>

        {/* Booking History */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <CalendarCheck className="w-5 h-5 text-primary" /> Booking History
            </CardTitle>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No bookings yet. Book your first service!</p>
            ) : (
              <div className="space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="p-3 rounded-xl border border-border bg-accent/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {statusIcon(b.status)}
                        <span className="font-medium text-sm">{b.service}</span>
                      </div>
                      <Badge variant={b.status === "Completed" ? "default" : b.status === "Assigned" ? "secondary" : "outline"} className="text-xs">
                        {b.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</span>
                      <Button variant="ghost" size="sm" className="text-xs h-6 px-2" onClick={() => setExpandedBooking(expandedBooking === b.id ? null : b.id)}>
                        {expandedBooking === b.id ? "Hide" : "View Details"}
                      </Button>
                    </div>
                    {expandedBooking === b.id && (
                      <div className="text-xs space-y-1 pt-2 border-t border-border text-muted-foreground">
                        <p><strong>Date/Time:</strong> {b.dateTime}</p>
                        <p><strong>Address:</strong> {b.address}</p>
                        <p><strong>Area:</strong> {b.area}, {b.city}</p>
                        {b.symptoms && <p><strong>Symptoms:</strong> {b.symptoms}</p>}
                        {b.notes && <p><strong>Notes:</strong> {b.notes}</p>}
                        {b.isEmergency && <p className="text-destructive font-medium">🚨 Emergency booking</p>}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MyAccount;
