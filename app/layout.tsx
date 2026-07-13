import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
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

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
});

const baseUrl =
  "https://portfolio-rkriq60pd-chiragkulal07s-projects.vercel.app";

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
  openGraph: {
    title: `${siteConfig.title} | ${personalInfo.title}`,
    description: siteConfig.description,
    url: baseUrl,
    siteName: siteConfig.title,
    locale: "en_US",
    type: "website",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: `${personalInfo.name} portfolio preview` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.title} | ${personalInfo.title}`,
    description: siteConfig.description,
    images: ["/og-image.png"],
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
