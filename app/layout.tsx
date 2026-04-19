import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Arbiter Legal — Minder administratie. Betere praktijk.",
  description:
    "Van eerste bericht tot afgesloten dossier. Arbiter vangt elke e-mail, WhatsApp, document en oproep automatisch op en structureert ze in één werkbaar dossier.",
  keywords:
    "juridische software, advocatenkantoor software, case management, Nederlandse advocaten, Wwft compliance, AI advocaat",
  metadataBase: new URL("https://arbiterlegal.com"),
  alternates: { canonical: "https://arbiterlegal.com" },
  openGraph: {
    title: "Arbiter Legal — Minder administratie. Betere praktijk.",
    description:
      "Het juridisch besturingssysteem voor Nederlandse solo-advocaten en kleine kantoren.",
    url: "https://arbiterlegal.com",
    siteName: "Arbiter Legal",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    locale: "nl_NL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arbiter Legal — Minder administratie. Betere praktijk.",
    description: "Het juridisch besturingssysteem voor Nederlandse solo-advocaten en kleine kantoren.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Arbiter Legal",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              description:
                "AI-native juridisch besturingssysteem voor Nederlandse solo-advocaten en kleine kantoren.",
              url: "https://arbiterlegal.com",
              offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
            }),
          }}
        />
      </head>
      <body className="bg-[#F7F6F2] text-[#0C0F14] font-sans antialiased">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
