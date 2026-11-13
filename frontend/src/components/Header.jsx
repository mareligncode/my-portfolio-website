import { useState, useEffect } from 'react'
import { Sun, Moon, Menu, X, Sparkles } from 'lucide-react'

const Header = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('home')

  // Scroll progress + backdrop trigger
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
      setIsScrolled(scrolled > 20)

      // Highlight active nav link
      const sections = ['home', 'about', 'skills', 'projects', 'resume', 'certificates', 'contact']
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && scrolled >= el.offsetTop - 120) {
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
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'shadow-lg backdrop-blur-xl bg-white/95 dark:bg-[#0a0a12]/95 border-b border-indigo-100/70 dark:border-indigo-500/20 py-2.5'
          : 'backdrop-blur-md bg-white/80 dark:bg-[#0a0a12]/85 border-b border-gray-200/50 dark:border-white/[0.08] py-3.5'
      }`}
    >
      {/* ── Scroll-progress bar ── */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-100 z-50 shadow-sm shadow-indigo-500/50"
        style={{ width: `${scrollProgress}%` }}
      />

      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">

          {/* ── Logo ── */}
          <div
            onClick={() => scrollToSection('home')}
            className="cursor-pointer flex items-center gap-3 group select-none"
          >
            {/* Animated gradient square */}
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-md group-hover:shadow-indigo-500/40 transition-shadow duration-300 ring-1 ring-white/20">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 group-hover:from-indigo-400 group-hover:to-pink-400 transition-all duration-500" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white font-black text-sm tracking-tight">MY</span>
              </div>
              {/* Shine sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-12" />
            </div>

            {/* Name */}
            <div className="leading-tight">
              <span className={`block text-[15px] font-black tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Marelign Yimer
              </span>
              <span className="block text-[11px] font-semibold tracking-wider uppercase bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Full-Stack Dev
              </span>
            </div>
          </div>

          {/* ── Desktop Nav ── */}
          <div className="hidden md:flex items-center gap-2">
            {/* Navigation Island */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border transition-colors duration-200 ${
              darkMode
                ? 'bg-white/[0.04] border-white/10'
                : 'bg-gray-100/70 border-gray-200/70'
            }`}>
              {navLinks.map((link) => {
                const isActive = activeSection === link.id
                return (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className={`relative px-3.5 py-1.5 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 cursor-pointer ${
                      isActive
                        ? darkMode
                          ? 'bg-indigo-600/25 text-indigo-300 border border-indigo-500/30 shadow-sm'
                          : 'bg-white text-indigo-600 border border-indigo-100 shadow-sm'
                        : darkMode
                          ? 'text-gray-200 hover:text-white hover:bg-white/[0.08]'
                          : 'text-gray-700 hover:text-gray-950 hover:bg-white/60'
                    }`}
                  >
                    <span className="relative z-10 flex items-center gap-1.5">
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                      )}
                      {link.label}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Hire Me pill */}
            <button
              onClick={() => scrollToSection('contact')}
              className="relative ml-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold text-white overflow-hidden group shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 group-hover:from-indigo-500 group-hover:to-pink-500 transition-all duration-300" />
              {/* Shimmer */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12" />
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Hire Me
              </span>
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className={`ml-1 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300 border cursor-pointer ${
                darkMode
                  ? 'bg-gray-800/90 border-gray-700 text-amber-300 hover:bg-gray-700 hover:text-amber-200 shadow-sm'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:text-gray-950 shadow-sm'
              }`}
              aria-label="Toggle dark mode"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? (
                <Sun className="w-4 h-4 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="w-4 h-4 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>
          </div>

          {/* ── Mobile Controls ── */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-amber-300'
                  : 'bg-white border-gray-200 text-gray-700'
              }`}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 border cursor-pointer ${
                darkMode
                  ? 'bg-gray-800 border-gray-700 text-white'
                  : 'bg-white border-gray-200 text-gray-800'
              }`}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ── Mobile Menu Dropdown ── */}
        {isMobileMenuOpen && (
          <div className={`md:hidden mt-3 p-3 rounded-2xl border backdrop-blur-2xl shadow-xl space-y-1 transition-all ${
            darkMode
              ? 'bg-[#0f1019]/95 border-white/10'
              : 'bg-white/95 border-gray-200/80'
          }`}>
            {navLinks.map((link) => {
              const isActive = activeSection === link.id
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center justify-between w-full text-left py-2.5 px-3.5 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? darkMode
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                      : darkMode
                        ? 'text-gray-200 hover:text-white hover:bg-white/[0.06]'
                        : 'text-gray-700 hover:text-gray-950 hover:bg-gray-100'
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  )}
                </button>
              )
            })}

            {/* Mobile Hire Me */}
            <button
              onClick={() => scrollToSection('contact')}
              className="w-full mt-2 py-2.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
              Hire Me
            </button>
          </div>
        )}
      </nav>
    </header>
  )
}

export default Header
