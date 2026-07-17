import type { Metadata } from "next";
import { Geist_Mono, Inter, Playfair_Display } from "next/font/google";
import { personalInfo, siteConfig } from "@/content/site-config";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
  variable: "--font-heading",
  subsets: ["latin"],
});

const baseUrl = "https://portfolio-new-rho-dun.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `${siteConfig.title} | ${personalInfo.title}`,
    template: `%s | ${siteConfig.title}`,
  },
  description: siteConfig.description,
  keywords: [
    "Chirag",
    "Portfolio",
    "Product Designer",
    "Frontend Developer",
    "Next.js",
    "React",
    "Tailwind CSS",
  ],
  alternates: {
    canonical: baseUrl,
  },
  verification: {
    google: "i4G9c45HzMDSCkUGDfQ9BTbEOkiqP0SfHY5dXCCP_EE",
  },
  openGraph: {
    title: `${siteConfig.title} | ${personalInfo.title}`,
    description: siteConfig.description,
    url: baseUrl,
    siteName: siteConfig.title,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/profile.png",
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.title} | ${personalInfo.title}`,
    description: siteConfig.description,
    images: ["/images/profile.png"],
  },
  icons: {
    icon: [{ url: "/file.svg", type: "image/svg+xml" }],
    apple: [{ url: "/window.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfairDisplay.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}