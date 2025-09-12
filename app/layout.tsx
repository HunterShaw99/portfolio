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
  },
  alternates: {
    canonical: "https://huntershaw.dev",
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
};

// verification: {
//     google: "your-google-site-verification-code", // Replace with your actual verification code
//     // yandex: "your-yandex-verification-code", // Uncomment and add if needed
//     // yahoo: "your-yahoo-verification-code", // Uncomment and add if needed
//   },
// twitter: {
//     card: "summary_large_image",
//     title: "Hunter M. Shaw - Software Engineer",
//     description: "Full-stack software engineer specializing in React, JavaScript, and AWS. Experienced in developing GIS web applications and scalable solutions.",
//     creator: "@huntershaw", // Replace with your actual Twitter handle if you have one
//   },


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100`}
      >
        {children}
      </body>
    </html>
  );
}