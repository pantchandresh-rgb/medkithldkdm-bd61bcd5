const DEFAULT_WHATSAPP_PHONE = "919818185270";

export function sanitizeWhatsAppPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");

  if (!digits) return DEFAULT_WHATSAPP_PHONE;
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 11 && digits.startsWith("0")) return `91${digits.slice(1)}`;

  return digits;
}

export function createWhatsAppUrl({
  phone = DEFAULT_WHATSAPP_PHONE,
  message,
}: {
  phone?: string;
  message?: string;
} = {}): string {
  const params = new URLSearchParams({ phone: sanitizeWhatsAppPhone(phone) });

  if (message?.trim()) {
    params.set("text", message.trim());
  }

  return `https://api.whatsapp.com/send?${params.toString()}`;
}

export function openWhatsApp(options: { phone?: string; message?: string } = {}): void {
  const url = createWhatsAppUrl(options);
  const popup = window.open(url, "_blank", "noopener,noreferrer");

  if (!popup) {
    window.location.href = url;
  }
}