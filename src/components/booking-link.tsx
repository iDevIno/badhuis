import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function BookingLink({ className = "button button-primary", label = "Maak een afspraak", href = siteConfig.bookingUrl }: { className?: string; label?: string; href?: string }) {
  return <a className={className} href={href} target="_blank" rel="noopener noreferrer"><CalendarDays aria-hidden="true" size={18} />{label}<span className="sr-only"> (opent in een nieuw tabblad)</span></a>;
}
