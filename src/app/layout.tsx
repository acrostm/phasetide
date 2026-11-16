import type { Metadata } from "next";
import { site } from "@/lib/site";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "PhaseTide 相位潮汐｜软件开发 · FDE · AI 解决方案",
    template: "%s | PhaseTide 相位潮汐",
  },
  description: site.description,
  openGraph: {
    title: "PhaseTide 相位潮汐",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "zh_CN",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="antialiased">
      <body id="top">
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
