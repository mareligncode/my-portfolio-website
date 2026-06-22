import logo from '../assets/codedeva.png'
import demera from '../assets/demera-mern.png'
import codedeva from '../assets/code.png'

const Certificates = () => {
  // Placeholder certificates - replace with your actual certificates
  const certificates = [
    {
      id: 1,
      title: 'Full Stack Development Certification',
      issuer: 'Placeholder Issuer',
      date: 'January 2026',
      description: 'Successfully completed a comprehensive bootcamp in modern web development, covering React.js, Node.js, and database technologies.',
      image: logo,
      link: '#', // Replace with the actual link to the certificate if available
    },
    {
      id: 2,
      title: 'Advanced AI and Machine Learning',
      issuer: 'Placeholder Issuer',
      date: 'December 2025',
      description: 'Earned certification for completing advanced modules in AI, machine learning algorithms, and deep learning.',
      image: demera,
      link: '#',
    },
    {
      id: 3,
      title: 'Cloud Computing Fundamentals',
      issuer: 'Placeholder Issuer',
      date: 'November 2025',
      description: 'Demonstrated proficiency in core cloud computing concepts and infrastructure management.',
      image: codedeva,
      link: '#',
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
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-800 mt-auto">
                    {cert.link && cert.link !== '#' ? (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors group/link"
                      >
                        <i className="fas fa-external-link-alt mr-2 group-hover/link:scale-110 transition-transform"></i>
                        View Certificate
                      </a>
                    ) : (
                      <span className="text-sm font-medium text-gray-400 dark:text-gray-500 italic">
                         Link not available
                      </span>
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

export default Certificates
