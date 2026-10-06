"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/next";

const beforeSend: BeforeSend = (event) => {
  const { pathname } = new URL(event.url);
  if (pathname === "/beheer" || pathname.startsWith("/beheer/")) return null;
  return event;
};

export function SiteAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
