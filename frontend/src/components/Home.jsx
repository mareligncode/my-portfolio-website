import { useEffect, useState } from 'react'

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  
  const roles = ['Full-Stack Developer', 'Problem Solver', 'UI/UX Designer', 'Tech Innovator']
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 1500

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length]
      const updatedText = isDeleting 
        ? currentRole.substring(0, textIndex - 1)
        : currentRole.substring(0, textIndex + 1)

      setTypedText(updatedText)

      if (!isDeleting && updatedText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
        setTextIndex(0)
        return
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed
      setTimeout(() => {
        setTextIndex(isDeleting ? textIndex - 1 : textIndex + 1)
      }, speed)
    }

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [textIndex, isDeleting, loopNum])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadResume = () => {
    const resumeUrl = '/resume.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'Marelign_Yimer_Resume.pdf'
    link.click()
  }

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16 dark:bg-[#0a0a0a] bg-gradient-to-br from-gray-50 via-white to-indigo-50/30"
    >
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-900/10 dark:via-[#0a0a0a] dark:to-purple-900/10"></div>
      
      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-10 dark:opacity-5"
        style={{
          backgroundImage: `linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }}
      ></div>

      {/* Gradient Orbs - Static with subtle pulse */}
      <div className="absolute top-20 left-10 w-[600px] h-[600px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-r from-pink-500/10 to-orange-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow-delayed"></div>

      {/* Subtle Corner Gradients */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-transparent rounded-full blur-2xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl"></div>

      {/* Glowing Accent Lines */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Name and Title */}
            <div className="text-left animate-fade-in-up">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 mb-6">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Available for opportunities</span>
                </div>
                
                <h6 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-4 tracking-wider uppercase letter-spacing">
                  Hello, I'm
                </h6>
                
                <h6 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-none tracking-tighter">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 text-stroke">
                    Marelign   Yimer
                  </span>
                </h6>
              </div>

              <div className="mb-10">
                <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 h-16">
                  <span className="text-gray-600 dark:text-gray-400 mr-2">I'm a</span>
                  <span className="gradient-text typing-text">
                    {typedText}
                    <span className="blinking-cursor">|</span>
                  </span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-lg leading-relaxed">
                Crafting exceptional digital experiences with cutting-edge technologies. 
                Transforming ideas into scalable, high-performance applications that make an impact.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-16">
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold text-base shadow-2xl hover:shadow-indigo-500/30 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <i className="fas fa-code text-lg group-hover:rotate-12 transition-transform duration-300"></i>
                    <span>View Projects</span>
                    <i className="fas fa-arrow-right text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"></i>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={downloadResume}
                  className="group relative px-8 py-4 bg-transparent text-gray-800 dark:text-gray-200 rounded-xl font-semibold text-base border-2 border-indigo-500/30 hover:border-indigo-500 transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    <i className="fas fa-download text-lg group-hover:translate-y-1 transition-transform duration-300"></i>
                    <span>Download CV</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <button
                  onClick={() => scrollToSection('contact')}
                  className="group relative p-4 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10 transition-all duration-300"
                >
                  <i className="fas fa-envelope text-lg text-gray-600 dark:text-gray-400 group-hover:text-indigo-500 transition-colors"></i>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold gradient-text">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Projects</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold gradient-text">3+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Years Exp</div>
                </div>
                <div className="text-center p-4 rounded-2xl bg-gradient-to-br from-white/50 to-transparent dark:from-gray-900/50 border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
                  <div className="text-3xl font-bold gradient-text">100%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative hidden lg:block">
              <div className="relative h-[600px]">
                {/* Floating Card Elements */}
                <div className="absolute top-10 right-20 w-64 h-64 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 shadow-2xl backdrop-blur-sm transform rotate-6 animate-float"></div>
                <div className="absolute bottom-20 left-10 w-72 h-72 rounded-3xl bg-gradient-to-br from-pink-500/20 to-orange-500/20 border border-pink-500/30 shadow-2xl backdrop-blur-sm transform -rotate-12 animate-float-delayed"></div>
                
                {/* Center Glowing Orb */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-2xl animate-pulse"></div>
                
                {/* Code Snippet Floating Card */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900/90 backdrop-blur-lg rounded-2xl p-6 border border-gray-800 shadow-2xl">
                  <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <pre className="text-sm font-mono text-gray-300">
                    <code>
{`const developer = {
  name: "Marelign Yimer",
  role: "Full-Stack Developer",
  skills: ["React", "Node.js", "TypeScript"],
  passion: "Building digital solutions",
  motto: "Code with purpose"
};`}
                    </code>
                  </pre>
                </div>

                {/* Floating Tech Icons */}
                <div className="absolute top-10 left-10 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
                  <i className="fab fa-react text-2xl text-cyan-400"></i>
                </div>
                <div className="absolute top-32 right-32 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float-delayed">
                  <i className="fab fa-node-js text-2xl text-green-500"></i>
                </div>
                <div className="absolute bottom-32 left-32 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float">
<i className="fas fa-database text-2xl text-blue-600"></i>
                </div>
                <div className="absolute bottom-20 right-20 w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center animate-float-delayed">
                  <i className="fab fa-golang text-2xl text-orange-500"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-fade-in">
            <button
              onClick={() => scrollToSection('about')}
              className="group flex flex-col items-center text-gray-400 dark:text-gray-600 hover:text-indigo-500 dark:hover:text-indigo-400 transition-all duration-300"
            >
              <span className="text-xs font-medium mb-2 opacity-0 group-hover:opacity-100 transition-opacity tracking-wider">EXPLORE</span>
              <div className="relative">
                <div className="w-6 h-10 rounded-full border-2 border-gray-300 dark:border-gray-700 group-hover:border-indigo-500 transition-colors flex items-start justify-center p-2">
                  <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 group-hover:bg-indigo-500 rounded-full animate-bounce transition-colors"></div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.05); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float 7s ease-in-out infinite 1s;
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }
        .animate-pulse-slow-delayed {
          animation: pulse-slow 10s ease-in-out infinite 2s;
        }
        .letter-spacing {
          letter-spacing: 0.2em;
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(99, 102, 241, 0.3);
        }
        .typing-text {
          background: linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        .blinking-cursor {
          display: inline-block;
          margin-left: 2px;
          animation: blink 1s infinite;
          color: #6366f1;
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default Home