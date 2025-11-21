import type { Metadata, Viewport } from "next"; // 1. Import Viewport
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "@/app/providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://huntershaw.dev"),
  title: "Hunter M. Shaw - Software Engineer",
  description: "Full-stack software engineer specializing in React, JavaScript, and AWS.",
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

  icons: {
    icon: "/favicon.ico",
  },

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
    description: "Full-stack software engineer specializing in React, JavaScript, and AWS.",
    siteName: "Hunter M. Shaw Portfolio",
    url: "/",
    images: [
      {
        url: "/hunter-shaw-software-engineer.png",
        width: 1200,
        height: 630,
        alt: "Hunter M. Shaw - Software Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hunter M. Shaw - Software Engineer",
    description: "Full-stack software engineer specializing in React, JavaScript, and AWS.",
    images: ["/hunter-shaw-software-engineer.png"],
  },
  alternates: {
    canonical: "/",
  },
  category: "technology",
  classification: "Software Engineering Portfolio",
  verification: {
    google: "your-google-site-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Hunter M. Shaw",
    "url": "https://huntershaw.dev",
    "jobTitle": "Software Engineer",
    "image": "https://huntershaw.dev/hunter-shaw-software-engineer.png",
    "sameAs": [
      "https://www.linkedin.com/in/huntermshaw/",
      "https://github.com/HunterShaw99",
    ],
    "knowsAbout": ["React", "JavaScript", "AWS", "GIS", "Software Engineering", 'Next.js', 'Node.js', 'TypeScript'],
  };

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 text-gray-100 selection:bg-emerald-700 selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}