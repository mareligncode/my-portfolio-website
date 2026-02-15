const Footer = () => {
  const currentYear = new Date().getFullYear()

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="py-16 dark:bg-[#0a0a0a] bg-gray-900 text-gray-400 border-t border-gray-800 dark:border-gray-900">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">FS</span>
                </div>
                <span className="text-white font-bold text-xl">
                  Full-Stack Dev
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">
                Building modern, scalable web applications with passion and
                precision.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => scrollToSection('home')}
                    className="text-sm hover:text-indigo-400 transition-colors duration-200"
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-sm hover:text-indigo-400 transition-colors duration-200"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('projects')}
                    className="text-sm hover:text-indigo-400 transition-colors duration-200"
                  >
                    Projects
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-sm hover:text-indigo-400 transition-colors duration-200"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-bold mb-6 text-lg">Connect</h4>
              <div className="flex space-x-4">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 group backdrop-blur-sm border border-gray-700/50 magnetic-btn hover-glow"
                >
                  <i className="fab fa-github group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 group backdrop-blur-sm border border-gray-700/50 magnetic-btn hover-glow"
                >
                  <i className="fab fa-linkedin group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 group backdrop-blur-sm border border-gray-700/50 magnetic-btn hover-glow"
                >
                  <i className="fab fa-twitter group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                </a>
                <a
                  href="mailto:your.email@example.com"
                  className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-all duration-300 group backdrop-blur-sm border border-gray-700/50 magnetic-btn hover-glow"
                >
                  <i className="fas fa-envelope group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"></i>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 dark:border-gray-900 pt-8 text-center">
            <p className="text-sm text-gray-500">
              © {currentYear} Full-Stack Developer Portfolio. All rights
              reserved.
            </p>
            <p className="text-xs mt-3 text-gray-600">
              Built with React, Node.js, and ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

