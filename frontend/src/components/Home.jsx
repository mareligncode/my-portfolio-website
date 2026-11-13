import { useEffect, useState } from 'react'
import {
  Layers,
  ArrowRight,
  Eye,
  Box,
  MousePointerClick,
  Mail,
  Sparkles
} from 'lucide-react'
import { Github, Linkedin, Telegram } from './Icons'
import resume from '../assets/Marelign.pdf'
import CircularCarousel from './CircularCarousel'

// Portfolio project images
import erp from '../assets/erp.jpg'
import ai from '../assets/ai.jpg'
import logo from '../assets/logo.png'
import student from '../assets/student.jpg'
import job from '../assets/job.webp'
import car from '../assets/car.png'
import farmer from '../assets/farmer.webp'
import hotel from '../assets/r1unison.webp'
import image from '../assets/transport.webp'

// Real projects mapped with user's portfolio roles & technologies
const PORTFOLIO_PROJECTS = [
  {
    id: 10,
    src: erp,
    alt: 'Vector Advert ERP Platform',
    title: 'Vector Advert ERP Platform',
    subtitle: 'Enterprise Resource Planning',
    role: 'Enterprise ERP Architect',
    description:
      'Production-grade ERP platform digitizing inventory, supply chain, manufacturing, HR, finance, and real-time operations actively running company-wide.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'WebSockets', 'Supabase'],
    live: 'https://vectoradvert.com/erp',
    badge: 'Production ERP'
  },
  {
    id: 9,
    src: ai,
    alt: 'Future Impact AI Tutor',
    title: 'Future Impact AI Tutor',
    subtitle: '1st Place Hackathon Winner',
    role: 'AI & Full-Stack Developer',
    description:
      'Autonomous AI learning agents for study planning, course synthesis, and real-time tutoring — built in 48hrs and awarded 1st Place at BDU.',
    tags: ['FastAPI', 'React', 'LangChain', 'Socket.io', 'MySQL'],
    github: 'https://github.com/mareligncode/complete_ai_tutor',
    youtube: 'https://youtu.be/eFTHgxV-pUI',
    badge: '🏆 1st Place Winner'
  },
  {
    id: 1,
    src: logo,
    alt: 'Amazon Ethiopia Platform',
    title: 'Amazon Ethiopia Platform',
    subtitle: 'E-Commerce & Microservices',
    role: 'Distributed Systems & Go Developer',
    description:
      'High-scale e-commerce architecture with 4 distinct actor portals (admin/seller/buyer/courier), Chapa payments, and Kafka messaging queues.',
    tags: ['Go / Gin', 'Kafka', 'React', 'Docker', 'GORM'],
    github: 'https://github.com/mareligncode/ethiopian-amazon',
    badge: 'High-Scale Go'
  },
  {
    id: 3,
    src: student,
    alt: 'Ethiopian Student Assistant',
    title: 'Student AI Assistant',
    subtitle: 'Curriculum-Trained AI',
    role: 'AI Backend & Mobile Lead',
    description:
      'Curriculum-aligned AI student tutor integrating Google Gemini and ChatGPT via LangChain and LangGraph for web and mobile.',
    tags: ['LangChain', 'Gemini', 'React Native', 'Node.js', 'MongoDB Atlas'],
    github: 'https://github.com/fsr-software-solution/School-eAssistant',
    badge: 'AI + Mobile'
  },
  {
    id: 5,
    src: job,
    alt: 'AI Job Recruitment Platform',
    title: 'AI Job Recruitment',
    subtitle: 'Talent & Resume Matcher',
    role: 'Full-Stack & AI Engineer',
    description:
      'Next-gen freelance recruitment platform utilizing Gemini AI to automatically validate candidate resumes, tiers, and technical credentials.',
    tags: ['React', 'Gemini AI', 'Supabase', 'Node.js', 'Express'],
    github: 'https://github.com/mareligncode/resume-scout-pro',
    live: 'https://cve-finder-mobile-ui.lovable.app',
    badge: 'AI Recruiter'
  },
  {
    id: 2,
    src: car,
    alt: 'Car Rental Booking System',
    title: 'Car Rental System',
    subtitle: 'Fleet & Booking Platform',
    role: 'Full-Stack Web Developer',
    description:
      'Full-featured enterprise vehicle rental application with real-time availability tracking, dynamic invoicing, and Chapa payment integration.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.io', 'Chapa'],
    github: 'https://github.com/mareligncode/car-Rental-system-web-application',
    live: 'https://car-rental-system-web-application-2.onrender.com/',
    badge: 'Full-Stack Web'
  },
  {
    id: 7,
    src: farmer,
    alt: 'FarmLink Ethiopia',
    title: 'FarmLink AI Agri',
    subtitle: 'AgTech & Expert Advisor',
    role: 'AI & Full-Stack Developer',
    description:
      'AI agricultural advisor aiding Ethiopian farmers with real-time crop disease diagnosis, market pricing intelligence, and climate forecasts.',
    tags: ['React', 'Gemini AI', 'Supabase', 'Node.js', 'MongoDB'],
    github: 'https://github.com/mareligncode/farmlink-ethiopia',
    live: 'https://professor-agri.lovable.app',
    badge: 'AgTech AI'
  },
  {
    id: 4,
    src: hotel,
    alt: 'Hotel HR Management System',
    title: 'Hotel HR Management',
    subtitle: '6-Actor Digital Workflow',
    role: 'Full-Stack Systems Engineer',
    description:
      'Comprehensive hotel human resource operations system orchestrating 6 distinct user tiers, staff scheduling, payroll, and auditing.',
    tags: ['React', 'Node.js', 'Sequelize ORM', 'MySQL', 'Socket.io'],
    github: 'https://github.com/mareligncode/hr-system',
    badge: 'Enterprise HR'
  },
  {
    id: 6,
    src: image,
    alt: 'Bahir Dar Transportation System',
    title: 'Transit Ticketing System',
    subtitle: 'Digital Anti-Fraud Transit',
    role: 'Backend Systems Architect',
    description:
      'Digital public transit management system built to modernize station paper ticketing, eliminate fraud, and stream real-time passenger queues.',
    tags: ['Node.js', 'Express', 'MongoDB', 'React', 'Bootstrap'],
    github: 'https://github.com/mareligncode/bahirdar-transportsion-system',
    badge: 'Backend Architecture'
  }
]

const Home = ({ darkMode }) => {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  // Carousel interactive preset state
  const [selectedPreset, setSelectedPreset] = useState('cylinder')
  const [internalDark, setInternalDark] = useState(() => {
    if (typeof darkMode === 'boolean') return darkMode
    if (typeof document !== 'undefined') return document.documentElement.classList.contains('dark')
    return false
  })
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  const roles = [
    'Full-Stack Developer',
    'MERN Stack Architect',
    'Software Engineer',
    'AI Solutions Developer',
    'Enterprise ERP Architect'
  ]
  const typingSpeed = 90
  const deletingSpeed = 45
  const pauseTime = 1600

  // Detect theme dynamically
  useEffect(() => {
    if (typeof darkMode === 'boolean') {
      setInternalDark(darkMode)
      return
    }

    const checkDark = () => {
      setInternalDark(document.documentElement.classList.contains('dark'))
    }
    checkDark()

    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)

    return () => {
      observer.disconnect()
      window.removeEventListener('resize', handleResize)
    }
  }, [darkMode])

  const isThemeDark = typeof darkMode === 'boolean' ? darkMode : internalDark

  // Typewriter effect
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

  const scrollToProject = (projectId) => {
    const el = document.getElementById(`project-${projectId}`) || document.getElementById('projects')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      el.classList.add('ring-2', 'ring-indigo-500', 'ring-offset-4')
      setTimeout(() => {
        el.classList.remove('ring-2', 'ring-indigo-500', 'ring-offset-4')
      }, 2000)
    }
  }

  const openResume = () => {
    window.open(resume, '_blank')
  }

  // Adaptive card width tailored for the right-hand side hero column
  const cardWidth = windowWidth < 640 ? 145 : windowWidth < 1024 ? 165 : 185

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-12 transition-colors duration-500"
      style={{
        backgroundColor: isThemeDark ? '#07070c' : '#ffffff',
        backgroundImage: isThemeDark
          ? 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(7, 7, 12, 0) 70%)'
          : 'linear-gradient(to bottom, #f8fafc 0%, #ffffff 50%, rgba(238, 242, 255, 0.35) 100%)'
      }}
    >
      {/* Crisp background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/[0.04] via-transparent to-purple-500/[0.04] dark:from-indigo-600/[0.08] dark:via-transparent dark:to-purple-600/[0.07] pointer-events-none" />

      {/* Subtle tech dot matrix */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.35) 1px, transparent 1px)`,
          backgroundSize: '28px 28px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Balanced 2-Column Hero: Left Intro + Right 3D Circular Carousel */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center">

          {/* ── Left Column: Personal Introduction ── */}
          <div className="lg:col-span-6 text-left space-y-4">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/[0.08] dark:bg-emerald-500/15 border border-emerald-500/25 dark:border-emerald-500/35 backdrop-blur-md shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-emerald-700 dark:text-emerald-300">
                Available for Hire &bull; Addis Ababa &bull; Remote
              </span>
            </div>

            {/* Name Heading */}
            <div className="space-y-1">
              <span className="text-xs font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 block">
                Full-Stack Developer &bull; MERN Architect &bull; AI Engineer
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-5xl font-black tracking-tight leading-tight">
                <span className="text-gray-950 dark:text-white">Marelign </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Yimer
                </span>
              </h1>
            </div>

            {/* Dynamic Typewriter */}
            <div className="flex items-center flex-wrap gap-2 text-base sm:text-lg font-medium">
              <span className="text-gray-700 dark:text-gray-200">Engineering as a</span>
              <span className="font-extrabold typing-text">{typedText}</span>
              <span className="blinking-cursor ml-0.5">|</span>
            </div>

            {/* Clean Professional Bio */}
            <p className="text-sm sm:text-base text-gray-700 dark:text-gray-200 max-w-xl leading-relaxed font-normal">
              Software Engineer based in Addis Ababa with 3+ years delivering production-grade enterprise systems, scalable web applications, and autonomous AI agents. Specializing in high-performance backends, modern React architectures, and robust cloud services.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-5 py-2.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white rounded-xl font-bold text-xs sm:text-sm shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Projects</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={openResume}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm border border-gray-300 dark:border-white/15 bg-white/90 dark:bg-white/[0.05] backdrop-blur-md text-gray-800 dark:text-gray-100 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>View CV</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-gray-100/90 dark:hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-gray-200 dark:hover:border-white/10"
              >
                Contact Me
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-2.5 pt-2 max-w-lg">
              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-gray-200/90 dark:border-white/10 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">Projects</div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-gray-200/90 dark:border-white/10 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  3+ Years
                </div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">Experience</div>
              </div>

              <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-900/70 border border-gray-200/90 dark:border-white/10 text-center shadow-xs">
                <div className="text-xl sm:text-2xl font-black text-amber-500 dark:text-amber-400">
                  🏆 1st
                </div>
                <div className="text-[11px] font-semibold text-gray-600 dark:text-gray-300">AI Hackathon</div>
              </div>
            </div>

            {/* Direct Social Links */}
            <div className="flex items-center gap-2 pt-1 text-gray-600 dark:text-gray-300">
              <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mr-1">
                Connect:
              </span>
              <a
                href="https://github.com/mareligncode"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-gray-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors shadow-xs cursor-pointer"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/marelign-yimer-298635369/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-gray-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors shadow-xs cursor-pointer"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/marelignY"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg border border-gray-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors shadow-xs cursor-pointer"
                title="Telegram"
              >
                <Telegram className="w-4 h-4" />
              </a>
              <a
                href="mailto:yimermarelign@gmail.com"
                className="p-2 rounded-lg border border-gray-200/90 dark:border-white/10 bg-white/80 dark:bg-slate-900/70 text-gray-700 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors shadow-xs cursor-pointer"
                title="Email Marelign"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* ── Right Column: Interactive 3D Circular Carousel ── */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="rounded-2xl border border-gray-200/90 dark:border-white/10 bg-white/80 dark:bg-[#0c0d18]/90 backdrop-blur-xl shadow-xl dark:shadow-2xl dark:shadow-black/60 overflow-hidden p-3 sm:p-4">
              
              {/* Top Controls Bar */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-200/70 dark:border-white/[0.08] mb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-xs">
                    <Box className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs sm:text-sm font-bold text-gray-900 dark:text-white block leading-tight">
                      Project Showcase
                    </span>
                    <span className="text-[10px] text-gray-600 dark:text-gray-300 flex items-center gap-1 font-medium">
                      <MousePointerClick className="w-3 h-3 text-indigo-500 dark:text-indigo-400" />
                      Drag to rotate &bull; Click to open
                    </span>
                  </div>
                </div>

                {/* Shape Preset Switcher */}
                <div className="flex items-center gap-1 p-0.5 rounded-lg bg-gray-100 dark:bg-white/[0.06] border border-gray-200/80 dark:border-white/10">
                  {[
                    { id: 'cylinder', label: 'Cylinder' },
                    { id: 'orbit', label: 'Orbit' },
                    { id: 'wheel', label: 'Wheel' }
                  ].map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => setSelectedPreset(preset.id)}
                      className={`px-2.5 py-1 text-[11px] font-bold rounded-md transition-all cursor-pointer ${
                        selectedPreset === preset.id
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-xs'
                          : 'text-gray-600 dark:text-gray-300 hover:text-gray-950 dark:hover:text-white'
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3D Carousel Stage */}
              <div
                style={{ width: '100%', height: '440px', position: 'relative' }}
                className="rounded-xl overflow-hidden bg-gradient-to-b from-indigo-50/50 via-purple-50/20 to-white/60 dark:from-[#090a14] dark:via-[#07080f] dark:to-[#05060b] border border-gray-200/50 dark:border-white/[0.05]"
              >
                <CircularCarousel
                  items={PORTFOLIO_PROJECTS}
                  preset={selectedPreset}
                  intro="rise"
                  cardWidth={cardWidth}
                  aspectRatio={1}
                  speed={14}
                  captions={true}
                  gap={20}
                  tilt={-4}
                  curve={1}
                  perspective={2200}
                  autoplay="drift"
                  interval={3}
                  direction="left"
                  momentum={0.6}
                  snap
                  pauseOnHover
                  focusOnClick
                  draggable
                  parallax={0.25}
                  stretch={0.4}
                  fadeColor={isThemeDark ? '#07080f' : '#f1f5f9'}
                  depthFade={0.5}
                  innerShade={isThemeDark ? 0.45 : 0.2}
                  cornerRadius={10}
                  onItemClick={(item) => scrollToProject(item.id)}
                />
              </div>

              {/* Bottom Quick Tip */}
              <div className="pt-2.5 flex items-center justify-between text-[11px] text-gray-600 dark:text-gray-300 border-t border-gray-200/70 dark:border-white/[0.08] mt-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-500 dark:text-indigo-400" />
                  Showing 9 Real Production Systems
                </span>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  View All Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style>{`
        .typing-text {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .blinking-cursor {
          display: inline-block;
          width: 2.5px;
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
