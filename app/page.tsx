"use client";

import ContactModal from "@/app/components/ContactModal";
import {BriefcaseIcon} from '@heroicons/react/24/solid';

export default function Home() {

  const skills = [
    "JavaScript", "React", "Express", "Python", "REST APIs",
    "ADO/Jira", "Git", "FastAPI", "GIS Web Apps", "AWS (EC2, S3, RDS)",
    "PostgreSQL/RDBS", "PL/SQL", "Linux/Unix", "Containerization"
  ];

  const workExperience = [
    {
      title: "Software Engineer",
      company: "Personal Project - Portfolio Website",
      period: "August 2025 - Present",
      summary: "Designed and developed a modern, responsive portfolio website showcasing professional experience and technical expertise using Next.js and contemporary web technologies, and the ability to create polished, production-ready applications.",
      responsibilities: [
        "Implemented advanced CSS techniques including conic gradients, backdrop filters, and complex animations to enhance the user interface and overall web design",
        "Created a secure email contact system using Base64 encoding to prevent bot scraping, demonstrating proficiency in security best practices within JavaScript development",
        "Achieved optimal performance through Next.js optimization features and proper image handling, showcasing expertise in building high-performance web applications with Next.js",
        "Established a comprehensive Docker workflow supporting both Docker and Podman environments for efficient application packaging and deployment using containerization technologies",
        "Built responsive web design adapting seamlessly across mobile, tablet, and desktop devices, ensuring accessibility and optimal user experience"
      ]
    },
    {
      title: "Software Engineer",
      company: "Crown Castle",
      period: "July 2022 - Present",
      summary: "Leveraging full-stack development tools to create scalable web applications and GIS solutions that drive business value and operational efficiency.",
      responsibilities: [
        "Develops full-stack web applications using JavaScript, React, Python, and Next.js, enabling real-time data analysis to optimize infrastructure usage and generate additional revenue from existing assets. Leveraged REST APIs for seamless data integration",
        "Creates and maintains GIS Web Apps that provide critical insights into geographic and asset-related data, helping the company make data-driven decisions and boost operational efficiency. Utilized Python scripting to automate data processing within these applications",
        "Designs customized sales pipeline applications using JavaScript and React that streamline operations and improve lead tracking, increasing sales volume while minimizing reliance on external vendor solutions. Implemented features with a focus on feature ownership",
        "Deploys scalable applications and databases on AWS (EC2, S3, RDS), tailoring solutions to meet customer requirements, enhancing performance, and driving client engagement. Implemented CD/CI pipelines for automated deployments",
        "Utilizes agile methodologies to rapidly deliver and iterate on web applications, ensuring continuous alignment with business goals and stakeholder needs. Demonstrated strong thought leadership in advocating for best practices within the team"
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
          <div className="space-y-12">
            {workExperience.map((job, index) => (
              <div key={index} className="card">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold text-white mb-3">{job.title}</h3>
                  <p className="text-xl text-gray-300 mb-2">{job.company}</p>
                  <p className="text-gray-500 font-medium mb-4">{job.period}</p>
                  {job.summary && (
                    <p className="text-lg text-gray-400 italic leading-relaxed">{job.summary}</p>
                  )}
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
          <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-2xl mx-auto px-4 sm:px-0">
            <ContactModal />
            <a
              href="https://www.linkedin.com/in/huntermshaw/"
              target="_blank"
              rel="noopener noreferrer"
              className="card text-center group w-full sm:flex-1 sm:max-w-xs mx-auto h-36 flex flex-col items-center justify-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform "><BriefcaseIcon className={'w-10 h-10 items-center justify-center'}/></div>
              <h3 className="text-lg font-semibold text-white mb-2">LinkedIn</h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors text-center px-2">Connect with me</p>
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