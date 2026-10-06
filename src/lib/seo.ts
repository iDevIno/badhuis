import type { Metadata } from "next";
import { siteConfig } from "./config";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const socialTitle = `${title} | ${siteConfig.name}`;
  const image = { url: "/images/praktijk/ingang.webp", alt: "Huisartsenpraktijk Badhuis aan de Pachtstraat in Sint-Andries, Antwerpen" };
  return {
    title: path === "/" ? { absolute: `${title} | ${siteConfig.shortName}` } : title,
    description,
    alternates: { canonical: path },
    openGraph: { title: socialTitle, description, url: path, siteName: siteConfig.name, locale: "nl_BE", type: "website", images: [image] },
    twitter: { card: "summary_large_image", title: socialTitle, description, images: [image] },
  };
}

export function jsonLdText(value: unknown) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${siteConfig.url}/#praktijk`,
  name: siteConfig.name,
  url: siteConfig.url,
  description: "Huisartsenpraktijk in de wijk Sint-Andries in Antwerpen. Consultaties op afspraak aan de Pachtstraat 16.",
  telephone: siteConfig.phoneHref.replace("tel:", ""),
  image: `${siteConfig.url}/images/praktijk/ingang.webp`,
  address: { "@type": "PostalAddress", streetAddress: "Pachtstraat 16", postalCode: "2000", addressLocality: "Antwerpen", addressCountry: "BE" },
  containedInPlace: { "@type": "Place", name: "Sint-Andries", containedInPlace: { "@type": "City", name: "Antwerpen" } },
  medicalSpecialty: "https://schema.org/PrimaryCare",
};
