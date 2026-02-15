import { useState, useRef, useEffect } from 'react'

// Import your images from assets
import photo1 from'../assets/photo_2025-08-16_09-17-16.jpg'
import photo2 from '../assets/OIP.webp'
import photo3 from '../assets/download.webp'
import photo4 from '../assets/OIPP.webp'

const About = () => {
  const [activeSection, setActiveSection] = useState(null)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef(null)
  const sectionRef = useRef(null)

  const personalPhotos = [photo1, photo2, photo3, photo4]

  const sections = [
    { 
      id: 'profile', 
      label: 'Profile', 
      icon: 'fa-user',
      description: 'Who I am',
      color: 'from-blue-600 to-cyan-500',
      quote: 'Building digital experiences with purpose and precision'
    },
    { 
      id: 'passion', 
      label: 'Passion', 
      icon: 'fa-heart',
      description: 'What drives me',
      color: 'from-rose-500 to-pink-600',
      quote: 'Transforming complex problems into elegant solutions'
    },
    { 
      id: 'journey', 
      label: 'Journey', 
      icon: 'fa-road',
      description: 'How I got here',
      color: 'from-amber-500 to-orange-600',
      quote: 'Every challenge is an opportunity to grow'
    },
    { 
      id: 'vision', 
      label: 'Vision', 
      icon: 'fa-eye',
      description: 'Where I\'m going',
      color: 'from-purple-600 to-indigo-600',
      quote: 'Creating technology that makes a difference'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleSectionHover = (index) => {
    setActiveSection(index)
    setIsHovering(true)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  const handleSectionLeave = () => {
    setActiveSection(null)
    setIsHovering(false)
  }

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-32 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
    >
      {/* Premium Background Elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-50">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header Section - Minimal & Elegant */}
        <div className="text-center mb-20 opacity-0 translate-y-8 animate-fade-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/50 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Creative Developer
          </div>
          
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              About Marelign
            </span>
            <br />
          
          </h3>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* Left Column - Visual Storytelling */}
          <div className="space-y-8 opacity-0 translate-x-[-30px] animate-slide-right">
            
            {/* Hero Image with Dynamic Overlay */}
            <div 
              className="relative group rounded-3xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <div className="relative aspect-[4/5] w-full">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent z-10 opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                
                {/* Dynamic Image Display */}
                <img
                  src={activeSection !== null ? personalPhotos[activeSection] : photo1}
                  alt="Personal moments"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110"
                />
                
                {/* Floating Labels */}
                <div className="absolute bottom-6 left-6 z-20 max-w-[80%]">
                  <div className="transform transition-all duration-500 translate-y-0 group-hover:-translate-y-2">
                    <div className="inline-block px-4 py-2 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 mb-3">
                      <span className="text-sm font-medium text-white">
                        {activeSection !== null ? sections[activeSection].description : 'Welcome to my world'}
                      </span>
                    </div>
                    <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight drop-shadow-lg">
                      {activeSection !== null ? sections[activeSection].label : 'Hi, I\'m Alex Chen'}
                    </h3>
                    <p className="text-white/90 text-lg mt-2 drop-shadow italic">
                      "{activeSection !== null ? sections[activeSection].quote : 'Creating code with purpose'}"
                    </p>
                  </div>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-6 right-6 z-20">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-90 group-hover:rotate-45 transition-all duration-500"></div>
                </div>
              </div>
            </div>

            {/* Section Navigation - Horizontal Story Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {sections.map((section, index) => (
                <button
                  key={section.id}
                  onMouseEnter={() => handleSectionHover(index)}
                  onMouseLeave={handleSectionLeave}
                  className={`group relative p-4 rounded-2xl transition-all duration-500 ${
                    activeSection === index
                      ? `bg-gradient-to-br ${section.color} text-white shadow-xl scale-105`
                      : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700/50'
                  }`}
                >
                  <div className={`text-2xl mb-2 transition-all duration-300 ${
                    activeSection === index 
                      ? 'text-white scale-110' 
                      : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                  }`}>
                    <i className={`fas ${section.icon}`}></i>
                  </div>
                  <div className={`font-semibold text-sm transition-colors duration-300 ${
                    activeSection === index 
                      ? 'text-white' 
                      : 'text-gray-700 dark:text-gray-300'
                  }`}>
                    {section.label}
                  </div>
                  {activeSection === index && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Personal Stats - Minimal */}
            <div className="flex items-center justify-between pt-4">
              {[
                { value: '50+', label: 'Projects', icon: 'fa-code-branch' },
                { value: '3+', label: 'Years', icon: 'fa-calendar' },
                { value: '∞', label: 'Coffee', icon: 'fa-mug-hot' }
              ].map((stat, index) => (
                <div key={index} className="text-center group flex-1">
                  <div className="text-xl text-gray-400 dark:text-gray-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${stat.icon}`}></i>
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Story & Philosophy */}
          <div className="space-y-8 opacity-0 translate-x-[30px] animate-slide-left">
            
            {/* Main Bio - Premium Card */}
            <div className="bg-white dark:bg-gray-800/30 rounded-3xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg">
                  <i className="fas fa-quote-right"></i>
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    My Story
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></div>
                </div>
              </div>

              <div className="space-y-6 text-gray-600 dark:text-gray-400">
                <p className="text-lg leading-relaxed">
                  I'm a <span className="text-indigo-600 dark:text-indigo-400 font-semibold">full-stack developer</span> who believes that great software is born at the intersection of technical excellence and human empathy. My journey into coding started with a simple curiosity about how things work, and evolved into a mission to build digital experiences that truly matter.
                </p>
                
                <p className="text-lg leading-relaxed">
                  What sets me apart is my background in <span className="text-indigo-600 dark:text-indigo-400 font-semibold">design thinking</span> and <span className="text-indigo-600 dark:text-indigo-400 font-semibold">user psychology</span>. Before diving deep into code, I spent years understanding what makes users tick — their frustrations, their joys, and their unmet needs. This perspective shapes every line of code I write.
                </p>

                <div className="relative pl-6 border-l-4 border-indigo-500 dark:border-indigo-400 my-8">
                  
                </div>

             
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm group hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-bolt text-lg"></i>
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">Fast & Scalable</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Performance-first development without compromising on quality
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm group hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-950 dark:to-pink-950 flex items-center justify-center text-rose-600 dark:text-rose-400 mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-heart text-lg"></i>
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">User-Focused</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Every decision starts with the end-user in mind
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm group hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-code text-lg"></i>
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">Clean Code</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Maintainable, tested, and documented solutions
                </p>
              </div>
              
              <div className="bg-white dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm group hover:border-indigo-500 dark:hover:border-indigo-500 transition-all duration-300">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950 flex items-center justify-center text-amber-600 dark:text-amber-400 mb-3 group-hover:scale-110 transition-transform">
                  <i className="fas fa-lightbulb text-lg"></i>
                </div>
                <h5 className="font-bold text-gray-900 dark:text-white mb-2">Problem Solver</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Finding elegant solutions to complex challenges
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="flex gap-4 pt-4">
              <a 
                href="#contact" 
                className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 flex-1 text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Let's Work Together
                  <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </a>
              <a 
                href="#projects" 
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-2xl font-semibold text-gray-700 dark:text-gray-300 transition-all duration-300 border border-gray-200 dark:border-gray-700/50 flex items-center gap-2"
              >
                <i className="fas fa-folder"></i>
                Projects
              </a>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-950 dark:to-purple-950 rounded-full blur-3xl opacity-20 -z-10"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-cyan-950 dark:to-blue-950 rounded-full blur-3xl opacity-20 -z-10"></div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-fade-up {
          animation: fadeUp 0.8s ease-out forwards;
        }
        .animate-slide-right {
          animation: slideRight 0.8s ease-out forwards;
        }
        .animate-slide-left {
          animation: slideLeft 0.8s ease-out forwards;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </section>
  )
}

export default About