import { useState, useEffect } from 'react'

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled]         = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection]   = useState('home')

  // Scroll progress + backdrop trigger
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total   = document.body.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setIsScrolled(scrolled > 20)

      // Highlight active nav link
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrolled >= el.offsetTop - 100) {
          setActiveSection(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  const navLinks = [
    { id: 'home',     label: 'Home' },
    { id: 'about',    label: 'About' },
    { id: 'skills',   label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume',   label: 'Resume' },
    { id: 'contact',  label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'shadow-lg backdrop-blur-xl bg-gradient-to-r from-indigo-50/95 via-white/95 to-indigo-50/95 dark:bg-gradient-to-r from-indigo-950/95 via-gray-950/95 to-indigo-950/95 border-b border-indigo-200/60 dark:border-indigo-800/40'
          : 'bg-transparent'
      }`}
    >
      {/* ── Scroll-progress bar ── */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 z-50"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[68px]">

          {/* ── Logo ── */}
          <div
            onClick={() => scrollToSection('home')}
            className="cursor-pointer flex items-center gap-3 group"
          >
            {/* Animated gradient square */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-lg group-hover:shadow-indigo-400/40 transition-shadow duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">MY</span>
              </div>
              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
            </div>

            {/* Name */}
            <div className="leading-none">
              <span className="block text-[15px] font-black tracking-tight text-gray-900 dark:text-white">
                Marelign
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.15em] uppercase text-indigo-600 dark:text-indigo-300 md:bg-gradient-to-r md:from-indigo-500 md:to-purple-500 md:bg-clip-text md:text-transparent">
                Full-Stack Dev
              </span>
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 group ${
                    isActive
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {/* Active/hover background pill */}
                  <span
                    className={`absolute inset-0 rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-indigo-50 dark:bg-indigo-500/10'
                        : 'bg-transparent group-hover:bg-gray-100 dark:group-hover:bg-white/5'
                    }`}
                  />
                  <span className="relative z-10">{link.label}</span>

                  {/* Active dot indicator */}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />
                  )}

                  {/* Hover underline */}
                  {!isActive && (
                    <span className="absolute bottom-0.5 left-0 w-0 h-[1.5px] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full group-hover:w-full transition-all duration-300" />
                  )}
                </button>
              )
            })}

            {/* Hire Me pill */}
            <button
              onClick={() => scrollToSection('contact')}
              className="relative ml-3 px-4 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden group shadow-md hover:shadow-indigo-500/40 transition-shadow duration-300"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 group-hover:from-indigo-500 group-hover:to-pink-500 transition-all duration-300" />
              {/* Shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
              <span className="relative z-10 flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
                </span>
                Hire Me
              </span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-2 w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-amber-400 hover:bg-gray-700'
                  : 'bg-gray-100 border-gray-200 text-gray-500 hover:bg-gray-200'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode
                ? <i className="fas fa-sun text-sm" />
                : <i className="fas fa-moon text-sm" />}
            </button>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-amber-400'
                  : 'bg-gray-100 border-gray-200 text-gray-600'
              }`}
            >
              {darkMode ? <i className="fas fa-sun text-sm" /> : <i className="fas fa-moon text-sm" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-gray-100 border-gray-200 text-gray-800'
              }`}
            >
              <i className={`fas text-base ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 pt-1 space-y-1 border-t border-gray-100 dark:border-white/[0.06] bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl rounded-b-2xl">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center w-full text-left py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                      : 'text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-white/10'
                  }`}
                >
                  {isActive && (
                    <span className="mr-2 w-1 h-1 rounded-full bg-indigo-500 inline-block" />
                  )}
                  {link.label}
                </button>
              )
            })}

            {/* Mobile Hire Me */}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center gap-2"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-80" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
              </span>
              Hire Me
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
