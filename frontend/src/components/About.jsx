import { useRef, useEffect } from 'react'
import photo from '../assets/BDU1506923.png'

const About = () => {
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('animate-in')
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  const philosophyCards = [
    {
      icon: 'fa-bolt',
      title: 'Fast & Scalable',
      desc: 'Performance-first development without sacrificing maintainability.',
      gradient: 'from-indigo-100 to-purple-100 dark:from-indigo-950 dark:to-purple-950',
      text: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      icon: 'fa-heart',
      title: 'User-Focused',
      desc: 'Every design decision prioritizes the real humans using the product.',
      gradient: 'from-rose-100 to-pink-100 dark:from-rose-950 dark:to-pink-950',
      text: 'text-rose-600 dark:text-rose-400',
    },
    {
      icon: 'fa-code',
      title: 'Clean Code',
      desc: 'Readable, tested, and documented — code that teams enjoy working with.',
      gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-950 dark:to-teal-950',
      text: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      icon: 'fa-lightbulb',
      title: 'Problem Solver',
      desc: 'Finding elegant, efficient solutions to complex engineering challenges.',
      gradient: 'from-amber-100 to-orange-100 dark:from-amber-950 dark:to-orange-950',
      text: 'text-amber-600 dark:text-amber-400',
    },
  ]

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 overflow-hidden bg-white dark:bg-[#0a0a0a] transition-colors duration-500"
    >
      {/* Ambient background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.07] animate-blob" />
        <div className="absolute top-0 -right-4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.07] animate-blob animation-delay-2000" />
        <div className="absolute bottom-32 left-20 w-96 h-96 bg-rose-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.07] animate-blob animation-delay-4000" />
      </div>

      {/* Dot grid */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 1px)`,
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-20 about-fade-up">
     

       

          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
            Passionate about crafting and developing scalable software that solves real problems and delights users.
          </p>
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-start">

          {/* ── Left — Profile Photo + Stats ── */}
          <div className="space-y-8 about-slide-right">

            {/* Profile Photo */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl">
              <div className="relative aspect-[4/5] w-full">
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent z-10 opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

                <img
                  src={photo}
                  alt="Marelign Yimer — Full-Stack Developer"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Name Badge */}
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <div className="inline-block px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-xl border border-white/20 mb-2">
                      <span className="text-sm font-medium text-white">Full-Stack Developer</span>
                    </div>
                    <h3 className="text-3xl font-bold text-white leading-tight drop-shadow-lg">
                      Hi, I'm Marelign
                    </h3>
                    <p className="text-white/80 text-base mt-1 drop-shadow italic">
                      "Code with purpose, build with heart"
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-5 right-5 z-20">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl rotate-12 opacity-90 group-hover:rotate-45 transition-all duration-500 shadow-lg" />
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              {[
                { value: '15+', label: 'Projects', icon: 'fa-code-branch' },
                { value: '3+',  label: 'Years Exp.', icon: 'fa-calendar-alt' },
              ].map((stat) => (
                <div key={stat.label} className="text-center group flex-1">
                  <div className="text-base text-gray-400 dark:text-gray-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    <i className={`fas ${stat.icon}`} />
                  </div>
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Bio + Philosophy ── */}
          <div className="space-y-8 about-slide-left">

            {/* Bio Card */}
            <div className="bg-white dark:bg-gray-800/30 rounded-3xl p-8 backdrop-blur-sm border border-gray-200 dark:border-gray-700/50 shadow-xl">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg flex-shrink-0">
                  <i className="fas fa-quote-right" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    My Background
                  </h4>
                  <div className="w-20 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" />
                </div>
              </div>

              <div className="space-y-5 text-gray-600 dark:text-gray-400">
             

                <p className="text-base leading-relaxed">
                  I hold a{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">
                    BSc in Computer Science at bairdar uiversity,
                  </span>{' '}
                  and spent four years mastering algorithms, data structures, . That
                  foundation  combined with real-world project experience  lets me architect solutions that are
                  both technically sound and user-centric.
                </p>

                {/* Pull quote */}
                <div className="relative pl-5 border-l-4 border-indigo-500 dark:border-indigo-400 py-1">
                  <p className="text-base italic text-gray-700 dark:text-gray-300">
                    "I don't just write code I solve problems, lead with empathy, and build with the end-user always in mind."
                  </p>
                </div>

                <p className="text-base leading-relaxed">
                  My passion lies in bridging{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">design</span> and{' '}
                  <span className="text-indigo-600 dark:text-indigo-400 font-semibold">developing</span>  turning
                  complex requirements into clean, maintainable systems that scale.
                </p>
              </div>
            </div>

            {/* Philosophy Cards */}
            <div className="grid grid-cols-2 gap-4">
              {philosophyCards.map((card) => (
                <div
                  key={card.title}
                  className="bg-white dark:bg-gray-800/30 p-6 rounded-2xl border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm group hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.gradient} flex items-center justify-center ${card.text} mb-3 group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${card.icon} text-base`} />
                  </div>
                  <h5 className="font-bold text-gray-900 dark:text-white mb-1.5 text-sm">{card.title}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex gap-4 pt-2">
            

           
            </div>
          </div>
        </div>
      </div>

      {/* Decorative blobs */}
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-br from-indigo-200 to-purple-200 dark:from-indigo-950 dark:to-purple-950 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-gradient-to-br from-cyan-200 to-blue-200 dark:from-cyan-950 dark:to-blue-950 rounded-full blur-3xl opacity-20 -z-10 pointer-events-none" />

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -50px) scale(1.1); }
          66%       { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob            { animation: blob 7s infinite; }
        .animation-delay-2000    { animation-delay: 2s; }
        .animation-delay-4000    { animation-delay: 4s; }

        @keyframes fadeUp    { from { opacity:0; transform:translateY(28px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideRight{ from { opacity:0; transform:translateX(-36px); } to { opacity:1; transform:translateX(0); } }
        @keyframes slideLeft { from { opacity:0; transform:translateX(36px); }  to { opacity:1; transform:translateX(0); } }

        .about-fade-up     { animation: fadeUp    0.9s ease-out both; }
        .about-slide-right { animation: slideRight 0.9s ease-out 0.15s both; }
        .about-slide-left  { animation: slideLeft  0.9s ease-out 0.25s both; }
      `}</style>
    </section>
  )
}

export default About