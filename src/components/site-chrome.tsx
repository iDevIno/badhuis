"use client";
import { usePathname } from "next/navigation";
import { Header } from "./header";
import { Footer } from "./footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname === "/beheer" || pathname.startsWith("/beheer/");
  return <><a className="skip-link" href="#inhoud">Ga naar de inhoud</a>{!isAdmin && <Header />}<main id="inhoud">{children}</main>{!isAdmin && <Footer />}</>;
}
