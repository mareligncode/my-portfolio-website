import logo from '../assets/logo.png'
import car from '../assets/car.png'
import student from '../assets/student.jpg'
import job from '../assets/job.webp'
import image from '../assets/transport.webp'
import hotel from '../assets/r1unison.webp'
import farmer from '../assets/farmer.webp'
import ai from '../assets/ai.jpg'
import erp from '../assets/erp.jpg'
const Projects = () => {
  // Placeholder projects - easy to replace with real projects
  const projects = [
    {
      id: 10,
      title: 'Vector Advert & Manufacturing – Complete ERP System',
      description:
        'A full-scale Enterprise Resource Planning (ERP) system I built and deployed with my team for Vector Advert & Manufacturing Company. The platform digitizes the entire business workflow  from manufacturing production tracking, inventory & warehouse management, and supply chain operations to advertising campaign management, employee HR, finance & accounting, CRM, and real-time analytics dashboards. This was one of my proudest achievements: architecting and delivering a production-grade enterprise system that is actively used by the company to run their day-to-day operations.',
      image: erp,
      techStack: ['React', 'Node.js', 'Express', 'postgress with orm', 'REST API', 'Role-Based Access', 'Real-Time Analytics','web sockets','supbase','micro services with supabase and node backend service'],
      live: 'https://vectoradvert.com/erp',
    },
    {
      id: 1,
      title: 'Amazon ethiopia Platform',
      description:
        'A full cloned amazon e-commerce platform with user authentication, payment integration with chapa , and admin,seller,buyer,delivery dashboard. Built with React, golang with gin, and mysql with gorm',
      image: logo,
      techStack: ['React', 'golang,gin', 'mysql,gorm', 'chapa', 'rest api','kafka','docker-container'],
      github: 'https://github.com/mareligncode/ethiopian-amazon',
      //live: 'https://example.com',
    },
    {
      id: 2,
      title: 'car rental system',
      description:
        'A cpmplet car rental system for  for company that have car rent service  can give service based on tis full fetured system with payment integration.',
      image: car,
      techStack: ['React,boostatrap', 'Socket.io', 'Node.js', 'express', 'monogdb', 'REST-API', 'chapa'],
      github: 'https://github.com/mareligncode/car-Rental-system-web-application',
      live: 'https://car-rental-system-web-application-2.onrender.com/',
    },
    {
      id: 3,
      title: 'ethiopian student assitant',
      description:
        'A comprehensive AI-powered Student Assistant project integrating Google Gemini and OpenAI ChatGPT using LangChain and LangGraph. The system includes both web and mobile applications designed to support Ethiopian students, trained based on the Ethiopian curriculum. This was a team project, and I contributed 50% across backend development, web frontend, and mobile app development.',
      image: student,
      techStack: ['node.js', 'express', 'react', 'Tailwind CSS', 'react native', 'expo', 'rest-API', 'langchain', 'mongo databse', 'vector databse using mongodb atlas'],
      github: 'https://github.com/fsr-software-solution/School-eAssistant',
      // live: 'https://expo.dev/artifacts/eas/7wviiZNRRXBuqqpcCiQAP5.apk',
    },
    {
      id: 9,
      title: 'future impact ai tutore ',
      description:
        'Our 3-member team built a fully anonymous AI-powered learning platform from scratch in 48 hours and won first place at the Bahir Dar University AI Hackathon. The system uses AI agents for study planning, course creation, presentations, learning materials, and web/YouTube search. My role included frontend development, backend support, system design, version control, and payment integration.',

      image: ai,
      techStack: ['React', 'fast api', 'mysql with sequelize orm', 'socket.io', 'REST-API', 'tailwind css'],
      github: 'https://github.com/mareligncode/complete_ai_tutor',
      youtube: 'https://youtu.be/eFTHgxV-pUI',
      //  live: 'https://example.com',
    },
    {
      id: 4,
      title: 'hotel human resource management(hr)',
      description:
        'This is a hotel Human Resource Management System with six distinct actors, each having their own roles and responsibilities. The system manages the entire HR process digitally, improving organization and efficiency within hotel operations.',

      image: hotel,
      techStack: ['React', 'express', 'Node.js', 'mysql with sequelize orm', 'socket.io', 'REST-API', 'tailwind css'],
      github: 'https://github.com/mareligncode/hr-system',
      //  live: 'https://example.com',
    },
    {
      id: 5,
      title: 'job recruitment',
      description:
        'A real AI-powered job recruitment platform that connects clients and freelancers in Ethiopia. The AI performs job and skill validation and evaluates freelancers based on their tier, profile, and CV.',
      image: job,
      techStack: ['react', 'supabse ', 'express', 'nodejs', 'gemini', 'REST-API'],
      github: 'https://github.com/mareligncode/resume-scout-pro',
      live: 'https://cve-finder-mobile-ui.lovable.app',
    },
    {
      id: 6,
      title: 'transportaion system',
      description:
        'This is a Computer Science graduating project that is almost complete. The project is a real transportation system for Ethiopia designed to replace the manual ticketing system used in stations. It helps store data securely, reduce passenger queues, prevent ticket scams, and save time for both passengers and transport operators. The project includes both a mobile app and a web application. My role was developing the entire backend.',
      image: image,
      techStack: ['React', 'nodejs', 'express', 'REST-API', 'MONGODB', 'bootstarp'],
      github: 'https://github.com/mareligncode/bahirdar-transportsion-system',
      //  live: 'https://example.com',
    },
    {
      id: 7,
      title: 'farmer',
      description:
        ' A real AI-powered farmer platform that assist sessionally  farmers  as agriculture expert.to prevent crop disease and pests and to increase crop yield. it also provide market price information and weather information.',
      image: farmer,
      techStack: ['react', 'supabse ', 'express', 'nodejs', 'gemini', 'REST-API', 'monogdb'],
      github: 'https://github.com/mareligncode/farmlink-ethiopia',
      live: 'https://professor-agri.lovable.app',
    },
  ]

  return (
    <section
      id="projects"
      className="py-12 md:py-16 dark:bg-[#0f0f0f] bg-white"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <div className="section-divider scroll-reveal-scale"></div>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed scroll-reveal">
              A collection of projects showcasing my skills and experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="hover-lift glass-card card-tilt rounded-2xl overflow-hidden group stagger-item hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <div className="absolute inset-0 shimmer"></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 scale-on-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                  <div className="absolute bottom-4 left-4 right-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {project.title}
                    </h3>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-5 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800/50"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-6 pt-4 border-t border-gray-200 dark:border-gray-800">
                    {project.github && project.github !== '#' && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                      >
                        <i className="fab fa-github mr-2 group-hover/link:scale-110 transition-transform"></i>
                        Code
                      </a>
                    )}
                    {project.youtube && (
                      <a
                        href={project.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                      >
                        <i className="fab fa-youtube mr-2 group-hover/link:scale-110 transition-transform text-red-600"></i>
                        Video
                      </a>
                    )}
                    {project.live && project.live !== '#' && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                      >
                        <i className="fas fa-external-link-alt mr-2 group-hover/link:scale-110 transition-transform"></i>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Projects

