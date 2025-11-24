import type {Metadata, Viewport} from "next"; // 1. Import Viewport
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#000000",
};

export const metadata: Metadata = {
    metadataBase: new URL("https://huntershaw.dev"),
    title: "Hunter M. Shaw - Software Engineer",
    description: "Hunter Shaw. Full-Stack Engineer specializing in React/Next.js/Python. I build scalable systems for telecommunication systems.",
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
        "cloud computing",
        "AWS",
        "Digital Ocean",
        "Developer",
        "Next.js Developer",
        "Cloud Solutions Architect",
        "Full Stack Cloud Engineer",
        "React.js Specialist",
        "Serverless Application Developer",
        "Hire Next.js developer",
        "Cloud migration consultant",
        "Build scalable web application",
        "Custom software development services",
        "MVP development",
        "Legacy code modernization",
        "Next.js 14",
        "Next.js 15",
        "App Router",
        "React Server Components",
        "Server-Side Rendering (SSR)",
        "Static Site Generation (SSG)",
        "TypeScript",
        "Tailwind CSS",
        "Vercel",
        "Turborepo",
        "Amazon Web Services (AWS)",
        "Google Cloud Platform (GCP)",
        "Microservices architecture",
        "Event-driven architecture",
        "Serverless computing",
        "Terraform",
        "Infrastructure as Code (IaC)",
        "Docker",
        "Kubernetes",
        "CI/CD Pipelines",
        "GitHub Actions",
        "Software engineering",
        "Web application development",
        "Digital transformation",
        "API development",
        "Rest API",
        "GraphQL",
        "SaaS Development",
        "Database optimization",
        "Secure cloud infrastructure",
        "GIS Web Apps",
        "Geographic Information Systems",
        "Real-time data analysis",
        "Sales pipeline automation",
        "FastAPI Developer",
        "Python Scripting",
        "PCAP Certified",
        "Certified Associate in Python Programming",
        "Digital Ocean",
        "Podman",
        "PostgreSQL",
        "PL/SQL",
        "Feature Ownership",
        "Agile Methodologies",
        "Pittsburgh Software Engineer",
        "University of Pittsburgh Alumni",
        "AWS Rekognition",
        "AWS Databricks"
    ],
    authors: [{name: "Hunter M. Shaw"}],
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
        description: "Hunter Shaw. Full-Stack Engineer specializing in React/Next.js/Python. I build scalable systems for telecommunication systems.",
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
        description: "Hunter Shaw. Full-Stack Engineer specializing in React/Next.js/Python. I build scalable systems for telecommunication systems.",
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
        "knowsAbout": ["React", "JavaScript", "AWS", "GIS", "Software Engineering", 'Next.js', 'Node.js', 'TypeScript', 'PostgreSQL', 'Amazon Web Services (AWS)', 'AWS Rekognition', 'AWS Databricks'],
    };

    return (
        <html lang="en">
        <body
            className={`antialiased bg-gray-900 text-gray-100 selection:bg-emerald-700 selection:text-white`}
        >
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}}
        />
        {children}
        </body>
        </html>
    );
}