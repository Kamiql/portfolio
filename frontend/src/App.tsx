import { useState, useEffect } from 'react';
import { faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCode, faDatabase, faBars, faXmark, faCalendar, faMapMarkerAlt, faUserTag } from '@fortawesome/free-solid-svg-icons';

type Skill = {
  name: string;
  level: number;
  icon: any;
  startDate: Date;
  technologies?: string[];
};

type Experience = {
  title: string;
  period: [Date, Date | null];
  description: string;
  achievements: string[];
};

type Project = {
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

  const personalInfo: PersonalInfo = {
    name: "Kilian (kamiql)",
    birthDate: new Date(2010, 8, 30),
    specialization: "Java Development",
    location: "Germany",
    bio: "Passionate Java developer specializing in Paper/Bukkit plugins. Focused on creating efficient, scalable backend solutions with clean code architecture."
  };

  const skills: Skill[] = [
    {
      name: "Java/Kotlin",
      level: 90,
      icon: faCode,
      startDate: new Date(2022, 0, 1),
      technologies: ["Spring Boot", "Gradle"]
    },
    {
      name: "Discord API",
      level: 30,
      icon: faDiscord,
      startDate: new Date(2023, 3, 1),
      technologies: ["JDA", "Webhooks", "OAuth2"]
    },
    {
      name: "MongoDB",
      level: 80,
      icon: faDatabase,
      startDate: new Date(2024, 5, 1),
      technologies: ["Atlas", "Aggregation", "Sharding"]
    },
    {
      name: "MySQL",
      level: 65,
      icon: faDatabase,
      startDate: new Date(2023, 2, 1),
      technologies: ["SQL Optimization", "Indexing", "Transactions"]
    },
  ];

  const experiences: Experience[] = [
    {
      title: "Java Developer",
      period: [new Date(2021, 0, 1), null],
      description: "Development of backend systems and APIs using Java ecosystem technologies",
      achievements: [
        "Created RESTful APIs with Spring Boot for game server integrations",
        "Implemented secure authentication systems with JWT",
        "Optimized database queries improving performance by 40%"
      ]
    },
    {
      title: "Discord Bot Developer",
      period: [new Date(2021, 5, 1), null],
      description: "Built custom Discord bots for community management and engagement",
      achievements: [
        "Developed moderation tools with dynamic role management",
        "Created interactive dashboards with real-time metrics",
        "Integrated with external game APIs for data synchronization"
      ]
    }
  ];

  const projects: Project[] = [
    {
      title: "Gradle SFTP Upload Plugin",
      description: "Plugin to automate deployment of builds to servers via SFTP",
      technologies: ["Kotlin", "Gradle", "JSch"],
      link: "https://github.com/kamiql/sftp-upload"
    },
    {
      title: "Minecraft Economy System",
      description: "Custom economy plugin with multi-currency support",
      technologies: ["Java", "HikariCP", "MySQL"],
      link: "#"
    }
  ];

  const roadmap: RoadmapItem[] = [
    {
      year: 2025,
      goals: [
        "Learn Fabric API for mod development",
        "Master full-stack web development"
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

  const formatExperienceDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'skills', 'experience', 'projects', 'roadmap', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const element = document.getElementById(section);
        if (element) {
          const { top, height } = element.getBoundingClientRect();
          const sectionTop = top + window.scrollY;

          if (i === sections.length - 1) {
            if (scrollPosition >= sectionTop) {
              setActiveSection(section);
              break;
            }
          } 
          else if (scrollPosition >= sectionTop && scrollPosition < sectionTop + height) {
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex justify-center">
      {/* Main Content */}
      <div className="flex-1 max-w-6xl">
        {/* Mobile Navigation */}
        <nav className="lg:hidden fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur z-30">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <div className="flex items-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8 mr-2" />
              <div className="text-xl font-bold text-blue-400">kamiql</div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-xl p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition"
            >
              <FontAwesomeIcon icon={mobileMenuOpen ? faXmark : faBars} />
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="bg-gray-800/90 backdrop-blur py-2 border-t border-gray-700">
              {['about', 'skills', 'experience', 'projects', 'roadmap', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`#${section}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(section);
                  }}
                  className={`block px-6 py-3 text-center ${activeSection === section
                    ? 'text-blue-400 bg-gray-700/50'
                    : 'text-gray-300 hover:bg-gray-700/30'
                    }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-32 pb-20 lg:py-28 flex flex-col items-center text-center">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="bg-gray-200 border-2 border-dashed rounded-full w-32 h-32 mb-6" />
              <div className="absolute bottom-6 right-4 w-6 h-6 rounded-full bg-green-500 border-2 border-gray-900"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              {personalInfo.name}
            </h1>
            <div className="text-xl mb-6 flex items-center justify-center">
              <span className="px-4 py-1.5 bg-gray-800/50 backdrop-blur rounded-full flex items-center border border-gray-700">
                <FontAwesomeIcon icon={faCode} className="text-blue-400 mr-2" />
                <span>{personalInfo.specialization}</span>
              </span>
            </div>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-8">
              {personalInfo.bio}
            </p>
            <div className="flex space-x-4">
              <a
                href="#contact"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 rounded-full font-medium transition shadow-lg shadow-blue-500/20"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact Me
              </a>
              <a
                href="#projects"
                className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-full font-medium transition border border-gray-700"
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                About Me
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 md:p-8 shadow-xl border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-blue-400">Personal Information</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faUserTag} className="text-blue-400 mt-1 mr-3" />
                      <div>
                        <div className="text-gray-400 text-sm">Name</div>
                        <div>{personalInfo.name}</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCalendar} className="text-blue-400 mt-1 mr-3" />
                      <div>
                        <div className="text-gray-400 text-sm">Age</div>
                        <div>{calculateAge()} years</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 mt-1 mr-3" />
                      <div>
                        <div className="text-gray-400 text-sm">Location</div>
                        <div>{personalInfo.location}</div>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FontAwesomeIcon icon={faCode} className="text-blue-400 mt-1 mr-3" />
                      <div>
                        <div className="text-gray-400 text-sm">Specialization</div>
                        <div>{personalInfo.specialization}</div>
                      </div>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 text-blue-400">Background</h3>
                  <p className="text-gray-300 leading-relaxed">
                    I'm a young developer focused on backend systems and game server technologies.
                    Since starting my journey in 2021, I've specialized in Java development with
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                Technical Skills
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => {
                const exp = calculateExperience(skill.startDate);
                return (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300"
                  >
                    <div className="flex items-center mb-5">
                      <div className="w-12 h-12 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-500/20">
                        <FontAwesomeIcon
                          icon={skill.icon}
                          className="text-blue-400 text-xl"
                        />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{skill.name}</h3>
                        <div className="text-sm text-gray-400">
                          {exp.years > 0 ? `${exp.years}yr ` : ''}
                          {exp.months}mo experience
                        </div>
                      </div>
                    </div>

                    <div className="w-full bg-gray-700 rounded-full h-2.5 mb-6">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2.5 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>

                    <div>
                      <h4 className="text-sm font-semibold text-gray-400 mb-3">TECHNOLOGIES</h4>
                      <div className="flex flex-wrap gap-2">
                        {skill.technologies?.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 bg-gray-700/50 backdrop-blur-sm rounded-md text-sm border border-gray-600"
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                Professional Experience
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="space-y-8">
              {experiences.map((exp, index) => {
                const start = exp.period[0];
                const end = exp.period[1] || new Date();
                const duration = calculateExperience(start);
                const startFormatted = formatExperienceDate(start);
                const endFormatted = end ? formatExperienceDate(end) : "Present";

                return (
                  <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-xl border border-gray-700">
                    <div className="flex flex-wrap justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{exp.title}</h3>
                        <p className="text-blue-400">{exp.description}</p>
                      </div>
                      <div className="text-sm bg-gray-700/50 px-3 py-1 rounded-md mt-2 md:mt-0">
                        {startFormatted} - {endFormatted}
                        <span className="ml-2 text-gray-300">
                          ({duration.years > 0 && `${duration.years}yr `}
                          {duration.months}mo)
                        </span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <h4 className="font-semibold text-gray-400 mb-3">KEY ACHIEVEMENTS:</h4>
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement, i) => (
                          <li key={i} className="flex items-start">
                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 mr-3"></div>
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                Featured Projects
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 hover:border-blue-500/30 transition-all duration-300 group">
                  <div className="mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-40 mb-4" /> {/* Image here */ }
                    <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">{project.title}</h3>
                  </div>
                  <p className="text-gray-300 mb-5">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700/50 rounded-md text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href={project.link}
                    className="text-blue-400 hover:text-blue-300 inline-flex items-center font-medium"
                    target='_blank'
                  >
                    View Project
                    <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                Development Roadmap
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="relative pl-8 border-l-2 border-blue-500/50">
              {roadmap.sort((a, b) => a.year - b.year).map((item, index) => (
                <div key={index} className="mb-12 relative">
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 shadow-lg border border-gray-700 ml-3">
                    <h3 className="text-2xl font-bold mb-4 text-blue-400">{item.year}</h3>

                    <ul className="space-y-3">
                      {item.goals.map((goal, i) => (
                        <li key={i} className="flex items-start">
                          <svg className="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          className="container mx-auto px-4 py-16"
        >
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center mb-10">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
              <h2 className="text-3xl font-bold mx-4 text-center">
                Get In Touch
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 shadow-xl border border-gray-700">
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <a href="mailto:contact@kamiql.de" className="group">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-500/20 group-hover:border-blue-500/50 transition">
                      <FontAwesomeIcon icon={faEnvelope} className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">Email</div>
                      <div className="group-hover:text-blue-400 transition">contact@kamiql.de</div>
                    </div>
                  </div>
                </a>

                <a href="https://github.com/kamiql" target="_blank" rel="noopener noreferrer" className="group">
                  <div className="flex items-center">
                    <div className="w-14 h-14 rounded-lg bg-blue-900/30 flex items-center justify-center mr-4 border border-blue-500/20 group-hover:border-blue-500/50 transition">
                      <FontAwesomeIcon icon={faGithub} className="text-blue-400 text-xl" />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">GitHub</div>
                      <div className="group-hover:text-blue-400 transition">github.com/kamiql</div>
                    </div>
                  </div>
                </a>
              </div>

              <div className="text-center pt-4 border-t border-gray-700/50">
                <p className="text-gray-400 mb-6">Interested in collaboration or have questions about my work?</p>
                <a
                  href="mailto:contact@kamiql.de"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 rounded-full font-bold transition inline-flex items-center shadow-lg shadow-blue-500/20"
                >
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  Send Message
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-gray-700/50 py-8 text-center text-gray-400 mt-10">
          <div className="container mx-auto px-4">
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://discord.com/" className="hover:text-blue-400 transition">
                <FontAwesomeIcon icon={faDiscord} size="lg" />
              </a>
              <a href="https://github.com/kamiql" className="hover:text-blue-400 transition">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
            </div>
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}