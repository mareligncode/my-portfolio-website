import { useState, useEffect } from 'react'

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? darkMode
            ? 'glass shadow-xl'
            : 'glass shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div
            onClick={() => scrollToSection('home')}
            className="cursor-pointer flex items-center space-x-3 group"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
              <span className="text-white font-bold text-lg">FS</span>
            </div>
            <span
              className={`text-xl font-bold tracking-tight ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Full-Stack Dev
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative group ${
                  darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-2 p-2.5 rounded-xl transition-all duration-300 magnetic-btn hover-glow ${
                darkMode
                  ? 'bg-white/10 text-amber-400 hover:bg-white/15'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {darkMode ? (
                <i className="fas fa-sun text-sm group-hover:rotate-180 transition-transform duration-500"></i>
              ) : (
                <i className="fas fa-moon text-sm group-hover:rotate-12 transition-transform duration-300"></i>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleDarkMode}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                darkMode
                  ? 'bg-white/10 text-amber-400'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              {darkMode ? (
                <i className="fas fa-sun text-sm"></i>
              ) : (
                <i className="fas fa-moon text-sm"></i>
              )}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2.5 rounded-xl transition-all duration-200 ${
                darkMode
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              <i
                className={`fas text-lg ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}
              ></i>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-6 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`block w-full text-left py-3 px-4 rounded-xl transition-all duration-200 ${
                  darkMode
                    ? 'text-gray-300 hover:bg-white/5 hover:text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header

