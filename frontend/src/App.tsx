// src/App.jsx
import React, { useState, useEffect } from 'react';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faDatabase, faBars, faXmark, faCalendar, faMapMarkerAlt, faUserTag, faBucket } from '@fortawesome/free-solid-svg-icons';

const Portfolio = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  const sections = ['about', 'skills', 'experience', 'projects', 'roadmap', 'contact'];

  const personalInfo = {
    name: "kamiql",
    birthDate: new Date(2010, 8, 30),
    specialization: "Java Development",
    location: "Germany",
    bio: "Hey there! Its me, kamiql. I am a passionate Java developer, slowly looking forward to progress to a professional level. Even Though you can consider me a vibe coder, i've achived couple of things im proud of - look around..."
  };

  const skills = [
    { name: "Java/Kotlin", level: 90, icon: faCode, startDate: new Date(2022, 0, 1), technologies: ["Bukit", "Paper", "Gradle"] },
    { name: "Bukkit", level: 80, icon: faBucket, startDate: new Date(2022, 0, 1), technologies: ["NMS", "Kyori"] },
    { name: "Discord API", level: 40, icon: faDiscord, startDate: new Date(2023, 3, 1), technologies: ["JDA", "Webhooks", "OAuth2"] },
    { name: "MongoDB", level: 50, icon: faDatabase, startDate: new Date(2023, 9, 1), technologies: ["Caching", "Sharding"] },
    { name: "MySQL", level: 20, icon: faDatabase, startDate: new Date("2024/5/6"), technologies: ["Transactions"] },
    { name: "WebDev", level: 10, icon: faCode, startDate: new Date("2025/1/1"), technologies: ["React", "Vite", "PhP", "Springboot"] }
  ];

  const experiences = [
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

  const projects = [
    {
      img: "api/assets/gradle.png",
      title: "Gradle SFTP Upload Plugin",
      description: "Plugin to automate deployment of builds to servers via SFTP",
      technologies: ["Kotlin", "Gradle"],
      link: "https://github.com/kamiql/sftp-upload"
    },
    {
      img: "api/assets/economy.png",
      title: "Minecraft Economy System",
      description: "Custom economy plugin with multi-currency support",
      technologies: ["Kotlin", "MySQL"],
      link: "https://github.com/Kamiql/KqlEconomy"
    }
  ];

  const roadmap = [
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

  const calculateAge = () => {
    const today = new Date();
    const birthDate = personalInfo.birthDate;
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="portfolio">
      {isLoading && (
        <div className="loader">
          <div className="loader-spinner"></div>
          <div className="loader-text">Loading portfolio...</div>
        </div>
      )}
      
      <div className={`content ${isLoading ? 'loading' : ''}`}>
        {/* Header */}
        <header className="header">
          <div className="container">
            <div className="brand">
              <img src='api/assets/kamiql.png' className="brand-icon"/>
              <div className="brand-name">kamiql</div>
            </div>
            
            <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
              <ul>
                {sections.map((section) => (
                  <li key={section}>
                    <a 
                      href={`#${section}`} 
                      className={activeSection === section ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(section);
                      }}
                    >
                      {section.charAt(0).toUpperCase() + section.slice(1)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            
            <button 
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="hero" id="hero">
          <div className="container">
            <div className="hero-content">
              <div className="avatar-container">
                <img className="avatar" src="api/assets/kamiql.png" alt="Avatar" />
                <div className="status-indicator"></div>
              </div>
              
              <h1 className="name-heading">
                {personalInfo.name}
              </h1>
              
              <div className="specialization-badge">
                <FontAwesomeIcon icon={faCode} />
                <span>{personalInfo.specialization}</span>
              </div>
              
              <p className="bio">
                {personalInfo.bio}
              </p>
              
              <div className="cta-buttons">
                <button 
                  className="btn btn-primary"
                  onClick={() => scrollToSection('contact')}
                >
                  Contact Me
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => scrollToSection('projects')}
                >
                  View Projects
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="section" id="about">
          <div className="container">
            <div className="section-header">
              <h2>About Me</h2>
              <div className="divider"></div>
            </div>
            
            <div className="about-grid">
              <div className="about-card">
                <h3>Personal Information</h3>
                
                <ul className="info-list">
                  <li>
                    <FontAwesomeIcon icon={faUserTag} />
                    <div>
                      <span>Name</span>
                      <strong>{personalInfo.name}</strong>
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCalendar} />
                    <div>
                      <span>Age</span>
                      <strong>{calculateAge()} years</strong>
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faMapMarkerAlt} />
                    <div>
                      <span>Location</span>
                      <strong>{personalInfo.location}</strong>
                    </div>
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faCode} />
                    <div>
                      <span>Specialization</span>
                      <strong>{personalInfo.specialization}</strong>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="about-card">
                <h3>Background</h3>
                <p>
                  I'm a young developer focused on backend systems and game server technologies.
                  Since starting my journey in 2022, I've specialized in Java development with
                  expertise in Minecraft plugin architecture and database optimization. My approach
                  emphasizes clean code practices and scalable solutions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="section" id="skills">
          <div className="container">
            <div className="section-header">
              <h2>Technical Skills</h2>
              <div className="divider"></div>
            </div>
            
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-card" key={index}>
                  <div className="skill-header">
                    <div className="skill-icon">
                      <FontAwesomeIcon icon={skill.icon} />
                    </div>
                    <div>
                      <h3>{skill.name}</h3>
                      <div className="skill-experience">
                        Started: {skill.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  
                  <div className="progress-container">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                    <div className="progress-text">{skill.level}%</div>
                  </div>
                  
                  <div className="technologies">
                    <h4>Technologies</h4>
                    <div className="tech-tags">
                      {skill.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="section" id="experience">
          <div className="container">
            <div className="section-header">
              <h2>Professional Experience</h2>
              <div className="divider"></div>
            </div>
            
            <div className="experience-container">
              {experiences.map((exp, index) => (
                <div className="experience-card" key={index}>
                  <div className="experience-header">
                    <h3>{exp.title}</h3>
                    <p>{exp.description}</p>
                  </div>
                  
                  <div className="achievements">
                    <h4>Key Achievements:</h4>
                    <ul>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>
                          <div className="achievement-bullet"></div>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="section" id="projects">
          <div className="container">
            <div className="section-header">
              <h2>Featured Projects</h2>
              <div className="divider"></div>
            </div>
            
            <div className="projects-grid">
              {projects.map((project, index) => (
                <div className="project-card" key={index}>
                  <img src={project.img} className="project-image"/>
                  
                  <div className="project-content">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    
                    <div className="tech-tags">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Project
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M14 12L10 8M14 12L10 16M14 12H3M21 3H15C13.8954 3 13 3.89543 13 5V7M21 21H15C13.8954 21 13 20.1046 13 19V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Roadmap Section */}
        <section className="section" id="roadmap">
          <div className="container">
            <div className="section-header">
              <h2>Development Roadmap</h2>
              <div className="divider"></div>
            </div>
            
            <div className="roadmap-container">
              <div className="roadmap-line"></div>
              
              {roadmap.map((item, index) => (
                <div className="roadmap-item" key={index}>
                  <div className="roadmap-card">
                    <div className="roadmap-year">{item.year}</div>
                    <ul>
                      {item.goals.map((goal, i) => (
                        <li key={i}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {goal}
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
        <section className="section" id="contact">
          <div className="container">
            <div className="section-header">
              <h2>Get In Touch</h2>
              <div className="divider"></div>
            </div>
            
            <div className="contact-grid">
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faEnvelope} />
                </div>
                <div>
                  <h3>Email</h3>
                  <a href='mailto:kamiql.dev@gmail.com' target="_blank" rel="noopener noreferrer">
                    kamiql.dev@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="contact-card">
                <div className="contact-icon">
                  <FontAwesomeIcon icon={faGithub} />
                </div>
                <div>
                  <h3>GitHub</h3>
                  <a href="https://github.com/kamiql" target="_blank" rel="noopener noreferrer">
                    github.com/kamiql
                  </a>
                </div>
              </div>
            </div>
            
            <div className="contact-cta">
              <p>Interested in collaboration or have questions about my work?</p>
              <a href="mailto:kamiql.dev@gmail.com" className="btn btn-primary">
                <FontAwesomeIcon icon={faEnvelope} />
                Send Message
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <div className="social-links">
              <a href="https://discord.com/" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faDiscord} />
              </a>
              <a href="https://github.com/kamiql" target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </div>
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Portfolio;