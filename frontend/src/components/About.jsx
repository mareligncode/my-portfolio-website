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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section Header ── */}
        <div className="text-center mb-20 about-fade-up">
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-indigo-500 mb-2">
            About Me
          </p>
         
        </div>

        {/* ── Two-Column Layout ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">

          {/* ── Left — Profile Card + Stats ── */}
          <div className="space-y-8 about-slide-right">

            {/* Profile Card – big soft rectangle with inner photo card, like template */}
            <div className="relative rounded-[28px] sm:rounded-[32px] bg-gradient-to-br from-cyan-50 via-sky-50 to-white dark:from-sky-900 dark:via-slate-900 dark:to-slate-950 shadow-2xl overflow-hidden px-4 sm:px-8 md:px-10 py-6 sm:py-8">
              {/* Top-right dots */}
              <div
                className="pointer-events-none hidden sm:block absolute -top-10 right-4 w-52 h-32 opacity-60 text-sky-300 dark:text-sky-500"
                style={{
                  backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
                  backgroundSize: '12px 12px',
                  borderBottomLeftRadius: '999px',
                }}
              />
              {/* Bottom-left dots */}
              <div
                className="pointer-events-none hidden sm:block absolute bottom-0 left-10 w-52 h-28 opacity-50 text-sky-200 dark:text-sky-600"
                style={{
                  backgroundImage: 'radial-gradient(currentColor 2px, transparent 2px)',
                  backgroundSize: '12px 12px',
                  borderTopRightRadius: '999px',
                }}
              />

              {/* Content row: BIG photo on the left, empty space on the right (like template) */}
              <div className="relative flex items-end md:items-stretch min-h-[290px] sm:min-h-[360px] md:min-h-[420px]">
                {/* Glow accents behind image */}
                <div className="pointer-events-none absolute -top-10 left-6 w-36 sm:w-44 h-36 sm:h-44 rounded-[48px] bg-cyan-100/70 blur-3xl" />
                <div className="pointer-events-none absolute bottom-8 left-24 sm:left-44 w-44 sm:w-56 h-36 sm:h-44 rounded-[56px] bg-sky-100/70 blur-3xl" />

                {/* Image block – balanced width/height (no "thin" look) */}
                <div className="relative w-full sm:w-[86%] md:w-[72%] lg:w-[68%] max-w-none translate-x-0 md:-translate-x-6 self-end">
                  <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[34px] shadow-[0_28px_70px_rgba(15,23,42,0.18)]">
                    <img
                      src={photo}
                      alt="Marelign Yimer — Full-Stack Developer"
                      className="absolute inset-0 w-full h-full object-cover object-[50%_18%]"
                    />
                  </div>
                </div>

                {/* Right side left empty so background shows, matching template composition */}
                <div className="hidden md:block flex-1" />
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
                  and spent four years mastering algorithms, data structures, and full-stack application development. That
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

                {/* Simple philosophy pills */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="flex items-start gap-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 px-4 py-3 border border-indigo-100 dark:border-indigo-800">
                    <div className="mt-0.5 h-8 w-8 rounded-xl bg-indigo-500 text-white flex items-center justify-center text-sm">
                      <i className="fas fa-bolt" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Fast &amp; Scalable</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Apps engineered for performance and future growth.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 dark:bg-slate-900/30 px-4 py-3 border border-slate-100 dark:border-slate-800">
                    <div className="mt-0.5 h-8 w-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-sm">
                      <i className="fas fa-code" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">Clean Code</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        Maintainable, readable solutions teams enjoy working with.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
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