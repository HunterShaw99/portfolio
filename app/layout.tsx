import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hunter M. Shaw - Software Engineer",
  description: "Full-stack software engineer specializing in React, JavaScript, and AWS. Experienced in developing GIS web applications and scalable solutions.",
  keywords: [
    "Hunter M. Shaw",
    "Hunter Shaw",
    "Shaw",
    "Hunter",
    "software engineer",
    "full-stack developer",
    "React developer",
    "JavaScript engineer",
    "AWS solutions architect",
    "GIS web applications",
    "frontend development",
    "backend development",
    "web development",
    "TypeScript",
    "Node.js",
    "cloud computing"
  ],
  authors: [{ name: "Hunter M. Shaw" }],
  creator: "Hunter M. Shaw",
  publisher: "Hunter M. Shaw",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Hunter M. Shaw - Software Engineer",
    description: "Full-stack software engineer specializing in React, JavaScript, and AWS. Experienced in developing GIS web applications and scalable solutions.",
    siteName: "Hunter M. Shaw Portfolio",
    url: "https://huntershaw.dev",
    images: [
      {
        url: "https://huntershaw.dev/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Hunter M. Shaw - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunter M. Shaw - Software Engineer",
    description: "Full-stack software engineer specializing in React, JavaScript, and AWS. Experienced in developing GIS web applications and scalable solutions.",
    images: ["https://huntershaw.dev/og-image.jpg"],
  },
  alternates: {
    canonical: "https://huntershaw.dev",
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
  verification: {
    google: "your-google-site-verification-code", // Replace with your actual verification code
  },
  other: {
    'theme-color': '#000000',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}