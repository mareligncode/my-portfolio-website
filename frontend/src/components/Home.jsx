import { useEffect, useState } from 'react'

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  const roles = ['Full-Stack Developer', 'Problem Solver', 'Tech Innovator']
  const typingSpeed = 100
  const deletingSpeed = 50
  const pauseTime = 1500

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

      setTimeout(() => {
        setTextIndex(isDeleting ? textIndex - 1 : textIndex + 1)
      }, isDeleting ? deletingSpeed : typingSpeed)
    }

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed)
    return () => clearTimeout(timer)
  }, [textIndex, isDeleting, loopNum])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) element.scrollIntoView({ behavior: 'smooth' })
  }

  const downloadResume = () => {
    const link = document.createElement('a')
    link.href = '/src/assets/Blue and Gray Simple Web Developer Resume.pdf'
    link.download = 'resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section
      id="home"
      className="relative min-h-[450px] md:min-h-[500px] flex items-center justify-center overflow-hidden py-6 dark:bg-[#0a0a0a] bg-gradient-to-br from-gray-50 via-white to-indigo-50/30"
    >
      {/* Simplified background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-purple-500/5 dark:from-indigo-900/10 dark:via-[#0a0a0a] dark:to-purple-900/10" />

      {/* Single, larger gradient orb for cleaner look */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl animate-pulse-slow" />

      {/* Subtle corner accents */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-full blur-2xl" />

      {/* Minimal grid overlay */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-3"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.2) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column - Introduction */}
          <div className="text-left space-y-4">
            {/* Greeting with refined styling */}
            <div className="flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-indigo-400" />
              <span className="text-xs font-semibold tracking-wider uppercase text-indigo-500 dark:text-indigo-400">
                Hello, I'm
              </span>
            </div>

            {/* Name with subtle hover effect */}
            <div className="group">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight">
                <span className="block text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                  Marelign
                </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Yimer
                </span>
              </h1>
            </div>

            {/* Typewriter with enhanced styling */}
            <div className="flex items-center flex-wrap gap-1.5">
              <span className="text-base md:text-lg font-medium text-gray-500 dark:text-gray-400">
                I craft as a
              </span>
              <span className="text-base md:text-lg font-bold typing-text">
                {typedText}
                <span className="blinking-cursor ml-0.5">|</span>
              </span>
            </div>

         
          </div>

          {/* Right Column - Buttons and Stats */}
          <div className="space-y-6">
            {/* Action Buttons with refined design */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-medium text-sm shadow-md hover:shadow-indigo-500/30 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <i className="fas fa-layer-group text-xs" />
                  View Projects
                  <i className="fas fa-arrow-right text-xs opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button
                onClick={downloadResume}
                className="group relative px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-indigo-500 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5"
              >
                <span className="flex items-center gap-1.5">
                  <i className="fas fa-file-arrow-down text-xs" />
                  Download CV
                </span>
              </button>
                <p className="text-sm text-gray-500 dark:text-gray-400 max-w-md leading-relaxed">
              Building scalable, high-performance applications from sleek UIs to robust back-ends 
              that solve real problems and leave a lasting impression.
            </p>
            </div>

            {/* Stats with cleaner presentation */}
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Projects
                </div>
              </div>
              <div className="w-px h-8 bg-gray-200 dark:bg-gray-800" />
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  3+
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  Years Exp.
                </div>
              </div>
            </div>
         
          </div>
          
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.5; transform: translate(-50%, -50%) scale(1.05); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 8s ease-in-out infinite;
        }

        .typing-text {
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .blinking-cursor {
          display: inline-block;
          width: 2px;
          height: 1.2em;
          background: linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899);
          animation: blink 1s step-end infinite;
          vertical-align: middle;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}

export default Home