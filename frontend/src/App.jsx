import { useState, useEffect } from 'react'
import Header from './components/Header'
import Home from './components/Home'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Resume from './components/Resume'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AIChatBot from './components/AIChatBot'
import { Analytics } from '@vercel/analytics/react'
import './App.css'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or default to light mode
    try {
      const saved = localStorage.getItem('darkMode')
      const initial = saved !== null ? JSON.parse(saved) : false
      if (typeof document !== 'undefined') {
        if (initial) {
          document.documentElement.classList.add('dark')
        } else {
          document.documentElement.classList.remove('dark')
        }
      }
      return initial
    } catch {
      return false
    }
  })

  useEffect(() => {
    // Apply dark mode class to html element
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
  }, [darkMode])

  // Scroll reveal animation
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, observerOptions)

    // Observe all scroll-reveal elements
    const elements = document.querySelectorAll(
      '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale'
    )
    elements.forEach((el) => observer.observe(el))

    return () => {
      elements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  // Stagger animation for lists
  useEffect(() => {
    const staggerElements = document.querySelectorAll('.stagger-item')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible')
            }, index * 100)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )

    staggerElements.forEach((el) => observer.observe(el))

    return () => {
      staggerElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-[#07070c] text-gray-100' : 'bg-white text-gray-900'} transition-colors duration-300`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Home darkMode={darkMode} />
      <About />
      <Skills />
      <Projects />
      <Resume />
      <Certificates />
      <Contact />
      <Footer />
      <AIChatBot />
      <Analytics />
    </div>
  )
}

export default App
