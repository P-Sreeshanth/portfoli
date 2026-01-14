import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sreeshanth Peddi | Full Stack Developer & AI Enthusiast",
    template: "%s | Sreeshanth Peddi",
  },
  description:
    "Full Stack Developer crafting high-performance applications with AI/ML integrations. Building production-ready systems from computer vision to enterprise RAG platforms.",
  keywords: [
    "Full Stack Developer",
    "AI/ML Engineer",
    "Computer Vision",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "TypeScript",
    "Portfolio",
    "Sreeshanth Peddi",
    "Hyderabad",
  ],
  authors: [{ name: "Sreeshanth Peddi" }],
  creator: "Sreeshanth Peddi",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sreeshanth.dev",
    title: "Sreeshanth Peddi | Full Stack Developer & AI Enthusiast",
    description:
      "Full Stack Developer crafting high-performance applications with AI/ML integrations.",
    siteName: "Sreeshanth Peddi Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sreeshanth Peddi - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sreeshanth Peddi | Full Stack Developer & AI Enthusiast",
    description:
      "Full Stack Developer crafting high-performance applications with AI/ML integrations.",
    images: ["/og-image.png"],
    creator: "@sreeshanthpeddi",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#1A1A17",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased min-h-screen bg-[#1A1A17] text-[#E6E6E1]`}
      >
        {/* Noise overlay */}
        <div className="noise-overlay" />
        
        {/* Main content */}
        {children}
        
        {/* Toast notifications */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1A1A17",
              color: "#E6E6E1",
              border: "1px solid rgba(230, 230, 225, 0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}
