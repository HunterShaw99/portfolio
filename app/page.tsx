"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    // Decode the email on the client side to prevent bot scraping
    const encoded = 'aHVudGVyc2hhdzBAZ21haWwuY29t'; // Base64 encoded email
    const decoded = atob(encoded);
    setEmail(decoded);
  }, []);

  const handleEmailClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:${email}`;
    }
  };

  const skills = [
    "JavaScript", "React", "Express", "Python", "REST APIs",
    "ADO/Jira", "Git", "FastAPI", "GIS Web Apps", "AWS (EC2, S3, RDS)",
    "PostgreSQL/RDBS", "PL/SQL", "Linux/Unix", "Containerization"
  ];

  const workExperience = [
    {
      title: "Full Stack Developer",
      company: "Personal Project - Portfolio Website (huntershaw.dev)",
      period: "January 2024",
      responsibilities: [
        "Built a modern, responsive portfolio website using Next.js 15 and React 19, implementing server-side rendering for optimal performance and SEO",
        "Designed an elegant dark theme interface with Tailwind CSS, featuring gradient text effects, smooth animations, and mobile-first responsive design",
        "Implemented TypeScript for type safety and better developer experience, ensuring robust code quality and maintainability",
        "Deployed the application using Digital Ocean App Platform with automated CI/CD pipeline, enabling seamless updates and reliable hosting",
        "Utilized modern React features including hooks (useState, useEffect) for state management and client-side email decoding to prevent bot scraping",
        "Integrated advanced CSS techniques including backdrop filters, custom animations, and CSS Grid for professional layout and visual appeal"
      ]
    },
    {
      title: "Software Engineer",
      company: "Crown Castle",
      period: "July 2022 - Present",
      responsibilities: [
        "Develops full-stack web applications using JavaScript, React, and Express, enabling real-time data analysis to optimize infrastructure usage and generate additional revenue from existing assets",
        "Creates and maintains GIS web apps that provide critical insights into geographic and asset-related data, helping the company make data-driven decisions and boost operational efficiency",
        "Designs customized sales pipeline applications that streamline operations and improve lead tracking, increasing sales volume while minimizing reliance on external vendor solutions",
        "Deploys scalable applications and databases on AWS, tailoring solutions to meet customer requirements, enhancing performance, and driving client engagement",
        "Utilizes agile methodologies to rapidly deliver and iterate on web applications, ensuring continuous alignment with business goals and stakeholder needs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white">Hunter M. Shaw</h1>
            <div className="hidden md:flex space-x-8">
              <a href="#about" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">About</a>
              <a href="#experience" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Experience</a>
              <a href="#skills" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Skills</a>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors text-sm font-medium">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-20"></div>
        <div className="max-w-6xl mx-auto text-center relative">
          <div className="mb-8">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
              <span className="gradient-text">Hunter M. Shaw</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed">
              Full-Stack Software Engineer specializing in React, JavaScript, and AWS.
              Building scalable web applications and GIS solutions that drive business value.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact" className="button-primary">
              Get In Touch
            </a>
            <a
              href="https://www.linkedin.com/in/huntermshaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="button-secondary"
            >
              View LinkedIn
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text-accent">About Me</h2>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                I&#39;m a passionate software engineer with over 2 years of experience developing
                full-stack web applications at Crown Castle. I specialize in creating scalable
                solutions using modern technologies like React, JavaScript, and AWS.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed">
                My expertise lies in building GIS web applications and data-driven solutions
                that help organizations make informed decisions and optimize their operations.
              </p>
              <div className="space-y-3 pt-4">
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                  <span><strong className="text-white">Location:</strong> Pittsburgh, PA</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                  <span><strong className="text-white">Education:</strong> B.S. Computer Science, University of Pittsburgh</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                  <span><strong className="text-white">Certification:</strong> Certified Associate in Python Programming (PCAP)</span>
                </div>
              </div>
            </div>
            <div className="card">
              <h3 className="text-xl font-semibold mb-6 text-white">Key Strengths</h3>
              <div className="space-y-4">
                {["Full-Stack Web Development", "GIS Web Applications", "AWS Cloud Solutions", "Agile Development", "Thought Leadership"].map((strength, index) => (
                  <div key={index} className="flex items-center text-gray-300">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-4"></span>
                    <span>{strength}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text-accent">Experience</h2>
          <div className="space-y-8">
            {workExperience.map((job, index) => (
              <div key={index} className="card">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">{job.title}</h3>
                  <p className="text-xl text-gray-300 mb-2">{job.company}</p>
                  <p className="text-gray-500 font-medium">{job.period}</p>
                </div>
                <div className="space-y-5">
                  {job.responsibilities.map((responsibility, idx) => (
                    <div key={idx} className="flex items-start text-gray-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 bg-gray-500 rounded-full mr-4 mt-2 flex-shrink-0"></span>
                      <span>{responsibility}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      <div className="section-divider"></div>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text-accent">Skills & Technologies</h2>
          <div className="flex flex-wrap gap-3 justify-center mb-20">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Frontend</h3>
              <p className="text-gray-400 leading-relaxed">React, JavaScript, TypeScript, HTML5, CSS3, Responsive Design</p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Backend</h3>
              <p className="text-gray-400 leading-relaxed">Express, FastAPI, Python, Next.JS, REST APIs, PL/SQL, Database Design</p>
            </div>
            <div className="card text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">Cloud & DevOps</h3>
              <p className="text-gray-400 leading-relaxed">AWS (EC2, S3, RDS), Digital Ocean,<br />Linux/Unix, Containerization, Git</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider"></div>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text-accent">Let&#39;s Connect</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            I&#39;m always interested in discussing new opportunities and exciting projects.
          </p>
          <div className="flex justify-center gap-6 max-w-2xl mx-auto">
            <a
              href="#"
              onClick={handleEmailClick}
              className="card text-center group flex-1 max-w-xs"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">📧</div>
              <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                {email || 'Click to reveal email'}
              </p>
            </a>
            <a
              href="https://www.linkedin.com/in/huntermshaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center group flex-1 max-w-xs"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">💼</div>
              <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors">Connect with me</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            © 2025 Hunter M. Shaw. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}