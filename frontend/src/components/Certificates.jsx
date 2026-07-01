import logo from '../assets/hackaton.jpg'
import demera from '../assets/demera-mern.png'
import codedeva from '../assets/code.png'
import tempo from '../assets/tempo.jpg'

const Certificates = () => {
  // Placeholder certificates - replace with your actual certificates
  const certificates = [
    {
      id: 1,
      title: 'AI Hackaton',
      issuer: 'BDU computing assocation and partners',
      date: ' 2026',
      description: 'Winner of 1st Place at the Bahir Dar University Computing Association AI Hackathon. Collaborated with a team to build an autonomous AI-powered learning system during an intensive and highly competitive hackathon.',
      image: logo
    },
    {
      id: 2,
      title: '3-Month Dedicated Full Stack Development Training',
      issuer: 'Demera Percipio Tech',
      date: 'December 2025',
      description: 'Earned certification for completing the full path 3-month dedicated full stack development training.',
      image: demera
    },
    {
      id: 3,
      title: 'MERN full stack web development ',
      issuer: 'codveda',
      date: 'November 2025',
      description: 'Successfully completed a comprehensive bootcamp and projects in modern web development, covering React.js, Node.js, and database technologies.',
      image: codedeva,
    },
     {
      id: 4,
      title: 'Bachlor of Computer Science ',
      issuer: 'Bahirdar University',
      date: 'june 2026',
      description: 'Successfully completed a Bachelor of Science in Computer Science from Bahir Dar University with a CGPA of 3.65 and an Exit Exam score of 78%. Throughout my studies, I gained strong theoretical knowledge and extensive hands-on practical experience in software development, data structures and algorithms, database systems, operating systems, computer networks, software engineering, web and mobile application development, and problem-solving through real-world academic and personal projects.',
      image: tempo,
    },
  ]

  return (
    <section
      id="certificates"
      className="py-12 md:py-16 dark:bg-[#0f0f0f] bg-white"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight">
              My <span className="gradient-text">Certificates</span>
            </h2>
            <div className="section-divider scroll-reveal-scale"></div>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed scroll-reveal">
              A collection of my professional certifications and achievements
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={cert.id}
                className="hover-lift glass-card card-tilt rounded-2xl overflow-hidden group stagger-item hover-glow flex flex-col"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Certificate Image */}
                <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <div className="absolute inset-0 shimmer"></div>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-auto transition-transform duration-700 group-hover:scale-110 scale-on-hover object-center block"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90"></div>
                </div>

                {/* Certificate Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-2">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                        {cert.title}
                     </h3>
                  </div>
                  <div className="mb-4">
                     <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                        {cert.issuer}
                     </span>
                     <span className="mx-2 text-gray-300 dark:text-gray-600">•</span>
                     <span className="text-sm text-gray-500 dark:text-gray-500">
                        {cert.date}
                     </span>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm leading-relaxed flex-grow">
                    {cert.description}
                  </p>

                  {/* Links */}
                  {cert.link && cert.link !== '#' && (
                    <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link"
                      >
                        <i className="fas fa-external-link-alt mr-2 group-hover/link:scale-110 transition-transform"></i>
                        View Certificate
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Certificates
