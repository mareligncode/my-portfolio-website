import { useEffect, useState, useMemo } from 'react'
import {
  Layers,
  ArrowRight,
  Eye,
  Sparkles,
  ExternalLink,
  RotateCw,
  Box,
  MousePointerClick
} from 'lucide-react'
import { Github } from './Icons'
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
    title: 'Vector Advert ERP',
    subtitle: 'Enterprise Resource Planning',
    role: 'Enterprise ERP Architect',
    description:
      'Production-grade ERP platform digitizing inventory, supply chain, HR, finance, and real-time operations actively running company-wide.',
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

const Home = () => {
  const [typedText, setTypedText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)

  // Carousel interactive state
  const [activeProjectIndex, setActiveProjectIndex] = useState(0)
  const [selectedPreset, setSelectedPreset] = useState('cylinder')
  const [isDark, setIsDark] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)

  const roles = [
    'Full-Stack Developer',
    'AI Solutions Engineer',
    'Enterprise ERP Architect',
    'Problem Solver & Innovator'
  ]
  const typingSpeed = 90
  const deletingSpeed = 45
  const pauseTime = 1600

  // Detect theme dynamically
  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains('dark'))
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
  }, [])

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

  const activeProject = useMemo(
    () => PORTFOLIO_PROJECTS[activeProjectIndex] || PORTFOLIO_PROJECTS[0],
    [activeProjectIndex]
  )

  const cardWidth = windowWidth < 640 ? 170 : windowWidth < 1024 ? 200 : 220

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-24 pb-16 dark:bg-[#0a0a0a] bg-gradient-to-b from-gray-50 via-white to-indigo-50/20"
    >
      {/* Brand glowing ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 dark:from-indigo-950/20 dark:via-purple-950/15 dark:to-pink-950/10 pointer-events-none" />

      {/* Hero ambient circular glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/15 to-pink-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-slow" />

      {/* Corner brand light accents */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle tech dot matrix */}
      <div
        className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Top Hero Intro Grid */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10">
          {/* Left Column: Bio & Title */}
          <div className="lg:col-span-7 text-left space-y-5">
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-400/30 backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-semibold tracking-wide text-indigo-600 dark:text-indigo-400">
                Available for Full-Stack & AI Roles
              </span>
            </div>

            {/* Main Name Heading */}
            <div className="space-y-1">
              <span className="text-sm font-semibold tracking-widest uppercase text-gray-500 dark:text-gray-400 block">
                Software Engineer & Innovator
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                <span className="text-gray-900 dark:text-white">Marelign </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400">
                  Yimer
                </span>
              </h1>
            </div>

            {/* Typewriter text */}
            <div className="flex items-center flex-wrap gap-2 text-lg sm:text-xl">
              <span className="font-medium text-gray-500 dark:text-gray-400">I engineer as a</span>
              <span className="font-bold typing-text">{typedText}</span>
              <span className="blinking-cursor ml-0.5">|</span>
            </div>

            {/* Bio brief */}
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed">
              Architecting production-grade enterprise systems, scalable web applications, and autonomous AI agents.
              From high-performance backends to pixel-perfect interactive experiences that deliver lasting value.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-6 py-3 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white rounded-xl font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-300 hover:-translate-y-0.5 overflow-hidden flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Projects</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={openResume}
                className="px-5 py-3 rounded-xl font-medium text-sm border border-gray-300 dark:border-gray-700/80 bg-white/70 dark:bg-white/5 backdrop-blur-md text-gray-700 dark:text-gray-200 hover:border-indigo-500 dark:hover:border-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
              >
                <Eye className="w-4 h-4" />
                <span>View CV</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="px-5 py-3 rounded-xl font-medium text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>

          {/* Right Column: Key Metrics & Credibility Badges */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121218]/70 border border-gray-200/80 dark:border-indigo-500/15 backdrop-blur-md shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                  15+
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Real Projects</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121218]/70 border border-gray-200/80 dark:border-indigo-500/15 backdrop-blur-md shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  3+
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">Years Exp.</div>
              </div>

              <div className="p-4 rounded-2xl bg-white/60 dark:bg-[#121218]/70 border border-gray-200/80 dark:border-indigo-500/15 backdrop-blur-md shadow-sm text-center col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-black text-amber-500 dark:text-amber-400">
                  🏆 1st
                </div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mt-1">AI Hackathon</div>
              </div>
            </div>

            {/* Quick Specialization Highlights */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 border border-indigo-500/15 dark:border-indigo-500/20 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-300">
                  Core Engineering Capabilities
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'Enterprise ERPs',
                  'AI Agents & LLMs',
                  'Distributed Go/Kafka',
                  'Full-Stack React/Node',
                  'Microservices'
                ].map((spec) => (
                  <span
                    key={spec}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium"
                  >
                    {spec}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            CIRCULAR 3D CAROUSEL SECTION — BRAND SHOWCASE
        ═══════════════════════════════════════════════════════════════ */}
        <div className="relative mt-4 pt-6 border-t border-gray-200/60 dark:border-gray-800/80">
          {/* Header Bar for Carousel Controls */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/20">
                <Box className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                    explore my projects visit project section for more
                  </h3>
                  <span className="px-2 py-0.5 text-[10px] font-bold uppercase rounded-full bg-gradient-to-r from-indigo-500 to-pink-500 text-white tracking-wider">
                    3D Cylinder
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-0.5">
                  <MousePointerClick className="w-3.5 h-3.5 text-indigo-500" />
                  Drag or scroll to rotate • Click any card to inspect role & tech
                </p>
              </div>
            </div>

            {/* 3D Shape Preset Buttons */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-gray-100 dark:bg-[#14141d] border border-gray-200 dark:border-gray-800 self-start md:self-auto">
              {[
                { id: 'cylinder', label: 'Cylinder' },
                { id: 'orbit', label: 'Orbit' },
                { id: 'panorama', label: 'Panorama' },
                { id: 'wheel', label: 'Wheel' }
              ].map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPreset(preset.id)}
                  className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    selectedPreset === preset.id
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3D Carousel Stage */}
          <div
            style={{ width: '100%', height: '560px', position: 'relative' }}
            className="rounded-3xl overflow-hidden bg-gradient-to-b from-transparent via-indigo-950/5 to-purple-950/5 dark:via-black/40 dark:to-[#0c0c14] border border-gray-200/70 dark:border-indigo-500/15 shadow-2xl"
          >
            {/* Ambient Background Grid in Carousel */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />

            <CircularCarousel
              items={PORTFOLIO_PROJECTS}
              preset={selectedPreset}
              intro="rise"
              cardWidth={cardWidth}
              aspectRatio={1}
              speed={14}
              captions={true}
              gap={25}
              tilt={-5}
              curve={1}
              perspective={2500}
              autoplay="drift"
              interval={3}
              direction="left"
              momentum={0.6}
              snap
              pauseOnHover
              focusOnClick
              draggable
              parallax={0.3}
              stretch={0.5}
              fadeColor={isDark ? '#0a0a0a' : '#ffffff'}
              depthFade={0.55}
              innerShade={isDark ? 0.6 : 0.3}
              cornerRadius={12}
              onChange={(index) => setActiveProjectIndex(index)}
              onItemClick={(item) => scrollToProject(item.id)}
            />
          </div>

          {/* Active Project Synchronized Spotlight Bar */}
          <div className="mt-4 p-4 sm:p-5 rounded-2xl bg-white/80 dark:bg-[#11111a]/90 backdrop-blur-xl border border-gray-200 dark:border-indigo-500/20 shadow-xl transition-all duration-300">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-sm">
                    {activeProject.badge || 'Project Spotlight'}
                  </span>
                  <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                    Role: {activeProject.role}
                  </span>
                </div>
                <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">
                  {activeProject.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 max-w-3xl leading-relaxed">
                  {activeProject.description}
                </p>
                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {activeProject.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons for Active Project */}
              <div className="flex items-center gap-2.5 shrink-0 self-start lg:self-center">
                <button
                  onClick={() => scrollToProject(activeProject.id)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all hover:-translate-y-0.5 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Full Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {activeProject.live && (
                  <a
                    href={activeProject.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:border-indigo-500 transition-colors"
                    title="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}

                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-white/5 text-gray-700 dark:text-gray-300 hover:text-indigo-500 hover:border-indigo-500 transition-colors"
                    title="GitHub Repository"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.35; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0.55; transform: translate(-50%, -50%) scale(1.08); }
        }
        .animate-pulse-slow {
          animation: pulse-slow 9s ease-in-out infinite;
        }

        .typing-text {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
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
