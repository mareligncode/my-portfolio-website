import logo from '../assets/logo.png'
import car from '../assets/car.png'
const Projects = () => {
  // Placeholder projects - easy to replace with real projects
  const projects = [
    {
      id: 1,
      title: 'Amazon ethiopia Platform',
      description:
        'A full cloned amazon e-commerce platform with user authentication, payment integration with chapa , and admin,seller,buyer,delivery dashboard. Built with React, golang with gin, and mysql with gorm',
      image:logo,
      techStack: ['React', 'golang,gin', 'mysql,gorm', 'chapa', 'rest api'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 2,
      title: 'car rental system',
      description:
        'A cpmplet car rental system for  for company that have car rent service  can give service based on tis full fetured system with payment integration.',
      image: car,
      techStack: ['React,boostatrap', 'Socket.io', 'Node.js', 'express', 'chapa'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 3,
      title: 'ethiopian student assitant',
      description:
        'A comprehensive AI-powered Student Assistant project integrating Google Gemini and OpenAI ChatGPT using LangChain and LangGraph. The system includes both web and mobile applications designed to support Ethiopian students, trained based on the Ethiopian curriculum. This was a team project, and I contributed 50% across backend development, web frontend, and mobile app development.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
      techStack: ['node.js', 'express', 'react', 'Tailwind CSS', 'react native','expo','rest-API','langchain','mongo databse','vector databse using mongodb atlas'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 4,
      title: 'Real-Time Chat Application',
      description:
        'AI Advisor An AI-powered advisory system designed to support Ethiopian farmers. It is trained on Ethiopian climate, geography, crop production, seasonal patterns, and market data to provide accurate, practical advice for improving productivity and decision-making.',

      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=800',
      techStack: ['React', 'express', 'Node.js', 'MongoDB', 'socket.io','lovable cloude supabase'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 5,
      title: 'job recruitment',
      description:
        'A feature-rich blogging platform with markdown support, SEO optimization, and comment system.',
      image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
      techStack: ['Next.js', 'MDX', 'Prisma', 'PostgreSQL', 'Vercel'],
      github: 'https://github.com',
      live: 'https://example.com',
    },
    {
      id: 6,
      title: 'transportaion system',
      description:
        'A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.',
      image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800',
      techStack: ['React', 'OpenWeather API', 'Chart.js', 'Geolocation API'],
      github: 'https://github.com',
      live: 'https://example.com',
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
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                    >
                      <i className="fab fa-github mr-2 group-hover/link:scale-110 transition-transform"></i>
                      Code
                    </a>
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors group/link"
                    >
                      <i className="fas fa-external-link-alt mr-2 group-hover/link:scale-110 transition-transform"></i>
                      Live Demo
                    </a>
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

