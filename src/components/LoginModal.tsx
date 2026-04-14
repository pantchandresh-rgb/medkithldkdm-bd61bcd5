import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { User, Phone, ShieldCheck } from "lucide-react";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

const LoginModal = ({ open, onOpenChange, onSuccess }: Props) => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedPhone = phone.replace(/\D/g, "");

    if (!trimmedName) {
      toast({ title: "Please enter your name", variant: "destructive" });
      return;
    }
    if (trimmedPhone.length !== 10) {
      toast({ title: "Please enter a valid 10-digit phone number", variant: "destructive" });
      return;
    }

    login({ name: trimmedName, phone: trimmedPhone });
    toast({ title: `Welcome, ${trimmedName}! 👋`, description: "You're now logged in." });
    setName("");
    setPhone("");
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl font-display">
            <User className="w-5 h-5 text-primary" /> Quick Login
          </DialogTitle>
          <p className="text-sm text-muted-foreground">No OTP required. Quick access.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-1.5">
            <Label htmlFor="login-name">Full Name *</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="login-name"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="pl-10"
                maxLength={50}
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="login-phone">Phone Number *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                id="login-phone"
                placeholder="9876543210"
                type="tel"
                value={phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setPhone(val);
                }}
                className="pl-10"
                maxLength={10}
              />
            </div>
            <p className="text-xs text-muted-foreground">10-digit Indian mobile number</p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-lg bg-accent/50 border border-border text-xs text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
            Your data is stored locally on your device. No OTP or verification needed.
          </div>

          <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-full font-semibold">
            Continue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
