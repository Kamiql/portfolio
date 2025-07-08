import { useState, useEffect } from 'react';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faDatabase, faBars, faXmark, faCalendar, faMapMarkerAlt, faUserTag, faPencil, faBucket } from '@fortawesome/free-solid-svg-icons';
import AnimatedBackground from './components/AnimatedBackground';

type Skill = {
  name: string;
  level: number;
  icon: any;
  startDate: Date;
  technologies?: string[];
};

type Experience = {
  title: string;
  description: string;
  achievements: string[];
};

type Project = {
  img: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

type RoadmapItem = {
  year: number;
  goals: string[];
};

type PersonalInfo = {
  name: string;
  birthDate: Date;
  specialization: string;
  location: string;
  bio: string;
};

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const sections = ['about', 'skills', 'experience', 'projects', 'roadmap', 'contact'];

  const personalInfo: PersonalInfo = {
    name: "kamiql",
    birthDate: new Date(2010, 8, 30),
    specialization: "Java Development",
    location: "Germany",
    bio: "Hey there! Its me, kamiql. I am a passionate Java developer, slowly looking forward to progress to a professional level. Even Though you can consider me a vibe coder, i've achived couple of things im proud of - look around..."
  };

  const skills: Skill[] = [
    {
      name: "Java/Kotlin",
      level: 90,
      icon: faCode,
      startDate: new Date(2022, 0, 1),
      technologies: ["Bukit", "Paper", "Gradle"]
    },
    {
      name: "Bukkit",
      level: 80,
      icon: faBucket,
      startDate: new Date(2022, 0, 1),
      technologies: ["NMS", "Kyori"]
    },
    {
      name: "Discord API",
      level: 40,
      icon: faDiscord,
      startDate: new Date(2023, 3, 1),
      technologies: ["JDA", "Webhooks", "OAuth2"]
    },
    {
      name: "MongoDB",
      level: 50,
      icon: faDatabase,
      startDate: new Date(2023, 9, 1),
      technologies: ["Caching", "Sharding"]
    },
    {
      name: "MySQL",
      level: 20,
      icon: faDatabase,
      startDate: new Date("2024/5/6"),
      technologies: ["Transactions"]
    },
    {
      name: "WebDev",
      level: 10,
      icon: faPencil,
      startDate: new Date("2025/1/1"),
      technologies: ["React", "Vite", "PhP", "Springboot", ""]
    }
  ];

  const experiences: Experience[] = [
    {
      title: "Java Developer",
      description: "Development of backend systems and APIs using Java ecosystem technologies",
      achievements: [
        "Many wrappers & frameworks such as a very nicely designed database manager working with mongodb (credits @Srino)",
        "Advanced Bukkit/Paper plugins",
        "Springboot backend for dashboard app"
      ]
    },
    {
      title: "Discord Bot Developer",
      description: "Built custom Discord bots for community management and engagement",
      achievements: [
        "Minecraft account link",
        "Simple moderation",
        "Minigames"
      ]
    }
  ];

  const projects: Project[] = [
    {
      img: "/assets/gradle.png",
      title: "Gradle SFTP Upload Plugin",
      description: "Plugin to automate deployment of builds to servers via SFTP",
      technologies: ["Kotlin", "Gradle"],
      link: "https://github.com/kamiql/sftp-upload"
    },
    {
      img: "/assets/economy.png",
      title: "Minecraft Economy System",
      description: "Custom economy plugin with multi-currency support",
      technologies: ["Kotlin", "MySQL"],
      link: "https://github.com/Kamiql/KqlEconomy"
    }
  ];

  const roadmap: RoadmapItem[] = [
    {
      year: 2025,
      goals: [
        "Learn Fabric API for mod development",
        "Advanced Full-stack web development"
      ]
    },
    {
      year: 2026,
      goals: [
        "Software w/ rust",
      ]
    }
  ];

  const calculateAge = (): number => {
    const today = new Date();
    const birthDate = personalInfo.birthDate;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const calculateExperience = (startDate: Date): { years: number; months: number } => {
    const today = new Date();
    const start = new Date(startDate);

    let years = today.getFullYear() - start.getFullYear();
    let months = today.getMonth() - start.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    return { years, months };
  };

  useEffect(() => {
    const handleInitialHash = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sections.includes(hash)) {
        setActiveSection(hash);
        const element = document.getElementById(hash);
        if (element) {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth'
          });
        }
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.substring(1);
      if (hash && sections.includes(hash)) {
        setActiveSection(hash);
      }
    };

    handleInitialHash();
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.location.hash = sectionId;
    }
  };

  useEffect(() => {
    const cursor = document.querySelector<HTMLDivElement>('.cursor');
    const move = (e: MouseEvent) => {
      if (cursor) {
        cursor.style.top = e.clientY + 'px';
        cursor.style.left = e.clientX + 'px';
      }
    };
    document.addEventListener('mousemove', move);
    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <AnimatedBackground/>
      <div className="min-h-screen flex justify-center">
        {/* Main Content */}
        <div className="flex-1 container">
          {/* Mobile Navigation */}
          <nav className="mobile-nav">
            <div className="mobile-nav-inner">
              <div className="brand">
                <img
                  src='assets/kamiql.png'
                  className="brand-icon"
                />
                <div className="brand-name">kamiql</div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="mobile-menu-btn"
              >
                <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
              </button>
            </div>

            {mobileMenuOpen && (
              <div className="mobile-menu">
                {sections.map((section) => (
                  <a
                    key={section}
                    href={`#${section}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(section);
                    }}
                    className={`mobile-menu-link ${activeSection === section ? 'active' : ''}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                ))}
              </div>
            )}
          </nav>

          {/* Hero Section */}
          <section className="hero flex flex-col items-center text-center">
            <div className="flex flex-col items-center">
              <div className="relative">
                <img
                  src='assets/kamiql.png'
                  title='kamiql-icon'
                  className="avatar"
                />
                <div className="status-indicator absolute"></div>
              </div>
              <h1 className="name-heading mb-2">
                {personalInfo.name}
              </h1>
              <div className="specialization-badge mb-6">
                <FontAwesomeIcon icon={faCode} className="mr-2" />
                <span>{personalInfo.specialization}</span>
              </div>
              <p className="bio mb-8">
                {personalInfo.bio}
              </p>
              <div className="flex gap-4">
                <a
                  href="#contact"
                  className="btn btn-primary"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                >
                  Contact Me
                </a>
                <a
                  href="#projects"
                  className="btn btn-secondary"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('projects');
                  }}
                >
                  View Projects
                </a>
              </div>
            </div>
          </section>

          {/* About Section */}
          <section
            id="about"
            className="section"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  About Me
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="card">
                <div className="about-grid">
                  <div>
                    <h3 className="subtitle">Personal Information</h3>
                    <ul className="space-y-4">
                      <li className="info-item">
                        <FontAwesomeIcon icon={faUserTag} className="info-icon" />
                        <div>
                          <div className="info-label">Name</div>
                          <div>{personalInfo.name}</div>
                        </div>
                      </li>
                      <li className="info-item">
                        <FontAwesomeIcon icon={faCalendar} className="info-icon" />
                        <div>
                          <div className="info-label">Age</div>
                          <div>{calculateAge()} years</div>
                        </div>
                      </li>
                      <li className="info-item">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="info-icon" />
                        <div>
                          <div className="info-label">Location</div>
                          <div>{personalInfo.location}</div>
                        </div>
                      </li>
                      <li className="info-item">
                        <FontAwesomeIcon icon={faCode} className="info-icon" />
                        <div>
                          <div className="info-label">Specialization</div>
                          <div>{personalInfo.specialization}</div>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="subtitle">Background</h3>
                    <p className="text-gray-300 leading-relaxed">
                      I'm a young developer focused on backend systems and game server technologies.
                      Since starting my journey in 2022, I've specialized in Java development with
                      expertise in Minecraft plugin architecture and database optimization. My approach
                      emphasizes clean code practices and scalable solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section
            id="skills"
            className="section"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  Technical Skills
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="skills-grid">
                {skills.map((skill, index) => {
                  const exp = calculateExperience(skill.startDate);
                  return (
                    <div
                      key={index}
                      className="card card-hover"
                    >
                      <div className="skill-header">
                        <div className="skill-icon">
                          <FontAwesomeIcon
                            icon={skill.icon}
                            className="text-blue-400 text-xl"
                          />
                        </div>
                        <div>
                          <h3 className="skill-title">{skill.name}</h3>
                          <div className="skill-experience">
                            {exp.years > 0 ? `${exp.years}yr ` : ''}
                            {exp.months}mo
                          </div>
                        </div>
                      </div>

                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      <div>
                        <h4 className="tech-label">TECHNOLOGIES</h4>
                        <div className="flex flex-wrap gap-2">
                          {skill.technologies?.map((tech, i) => (
                            <span
                              key={i}
                              className="tech-badge"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section
            id="experience"
            className="section"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  Professional Experience
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="space-y-8">
                {experiences.map((exp, index) => {
                  return (
                    <div key={index} className="card">
                      <div className="flex flex-wrap justify-between items-start mb-4">
                        <div>
                          <h3 className="experience-title">{exp.title}</h3>
                          <p className="experience-desc">{exp.description}</p>
                        </div>
                      </div>

                      <div className="mt-5">
                        <h4 className="achievements-title">KEY ACHIEVEMENTS:</h4>
                        <ul className="space-y-2">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i} className="achievement-item">
                              <div className="achievement-bullet"></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section
            id="projects"
            className="section"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  Featured Projects
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="projects-grid">
                {projects.map((project, index) => (
                  <div key={index} className="card card-hover project-card">
                    <div className="mb-4">
                      <img
                        src={project.img}
                        alt={project.title}
                        className="project-img"
                      />
                      <h3 className="project-title">{project.title}</h3>
                    </div>
                    <p className="project-desc">{project.description}</p>

                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-badge">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.link}
                      className="project-link"
                      target='_blank'
                    >
                      View Project
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Roadmap Section */}
          <section
            id="roadmap"
            className="section"
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  Development Roadmap
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="roadmap-container">
                {roadmap.sort((a, b) => a.year - b.year).map((item, index) => (
                  <div key={index} className="roadmap-item">
                    <div className="card">
                      <h3 className="roadmap-year">{item.year}</h3>

                      <ul className="space-y-3">
                        {item.goals.map((goal, i) => (
                          <li key={i} className="roadmap-goal">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{goal}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section
            id="contact"
            className="section"
          >
            <div className="max-w-2xl mx-auto">
              <div className="flex items-center mb-10">
                <div className="section-divider"></div>
                <h2 className="section-title">
                  Get In Touch
                </h2>
                <div className="section-divider"></div>
              </div>

              <div className="card">
                <div className="contact-grid mb-10">
                  <a href="mailto:kamiql.dev@gmail.com" className="contact-item">
                    <div className="contact-icon-wrapper">
                      <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <div className="contact-label">Email</div>
                      <div className="contact-value">kamiql.dev@gmail.com</div>
                    </div>
                  </a>

                  <a href="https://github.com/kamiql" target="_blank" rel="noopener noreferrer" className="contact-item">
                    <div className="contact-icon-wrapper">
                      <FontAwesomeIcon icon={faGithub} className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <div className="contact-label">GitHub</div>
                      <div className="contact-value">github.com/kamiql</div>
                    </div>
                  </a>
                </div>

                <div className="contact-divider text-center">
                  <p className="text-gray-400 mb-6">Interested in collaboration or have questions about my work?</p>
                  <a
                    href="mailto:kamiql.dev@gmail.com"
                    className="contact-btn"
                  >
                    <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                    Send Message
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <div className="container px-4">
              <div className="social-links">
                <a href="https://discord.com/" className="social-link">
                  <FontAwesomeIcon icon={faDiscord} size="lg" />
                </a>
                <a href="https://github.com/kamiql" className="social-link">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
              </div>
              <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}