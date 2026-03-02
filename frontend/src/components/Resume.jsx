const Resume = () => {
  const education = [
    {
      year: '2022- 2026',
      degree: 'Bachelor of Science in Computer Science',
      institution: 'Bahirdar University',
      description: 'Specialized in Software Engineering and Web Development',
    },
    {
      year: '2018- 2022',
      degree: 'High School Diploma',
      institution: 'High School Name',
      description: 'Focus on Mathematics and Science',
    },
  ]

  const experience = [
    {
      year: '2025- Present',
      position: ' Full-Stack Developer',
      description:
        'advance development of scalable web and mobile applications using React , Node.js,golang mysql,orm Mentoring junior developers and implementing best practices.',
    },
    {
      year: '2024- 2025',
      position: ' junior Full-Stack Developer',
      company: 'bahirdar university',
      description:
        'Developed and maintained multiple client projects. Worked with various technologies including MongoDB, Express, React, and Node.js.',
    },
    {
      year: '2022- 2023',
      position: 'algorithm,prgogramming,amchin language basics',
      company: 'bairdar university',
      description:
        'Started my professional journey building responsive websites and learning industry best practices.',
    },
  ]

  const downloadResume = () => {
    // Placeholder - replace with actual resume URL
    const resumeUrl = '/resume.pdf'
    const link = document.createElement('a')
    link.href = resumeUrl
    link.download = 'resume.pdf'
    link.click()
  }

  return (
    <section
      id="resume"
      className="py-24 md:py-32 dark:bg-[#0a0a0a] bg-[#fafafa]"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight">
              My <span className="gradient-text">Resume</span>
            </h2>
            <div className="section-divider scroll-reveal-scale"></div>
            <div className="mt-10 scroll-reveal-scale">
              <button
                onClick={downloadResume}
                className="btn-primary magnetic-btn ripple px-8 py-4 text-white rounded-xl font-semibold text-base shadow-lg hover-glow group"
              >
                <span className="flex items-center">
                  <i className="fas fa-download mr-2 group-hover:translate-y-1 transition-transform"></i>
                  Download Resume (PDF)
                </span>
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 lg:gap-20">
            {/* Education */}
            <div className="scroll-reveal-left">
              <h3 className="text-3xl font-bold mb-12 dark:text-white text-gray-900 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mr-4 shadow-lg pulse-glow hover:scale-110 transition-transform">
                  <i className="fas fa-graduation-cap text-white"></i>
                </div>
                Education
              </h3>
              <div className="space-y-10">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="relative pl-10 border-l-2 border-indigo-500/30 dark:border-indigo-400/30 stagger-item hover-glow group"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full shadow-lg group-hover:scale-150 group-hover:shadow-xl transition-all duration-300"></div>
                    <div className="mb-3">
                      <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                        {edu.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 dark:text-white text-gray-900">
                      {edu.degree}
                    </h4>
                    <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-3">
                      {edu.institution}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div className="scroll-reveal-right">
              <h3 className="text-3xl font-bold mb-12 dark:text-white text-gray-900 flex items-center">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mr-4 shadow-lg pulse-glow hover:scale-110 transition-transform">
                  <i className="fas fa-briefcase text-white"></i>
                </div>
                Experience
              </h3>
              <div className="space-y-10">
                {experience.map((exp, index) => (
                  <div
                    key={index}
                    className="relative pl-10 border-l-2 border-purple-500/30 dark:border-purple-400/30 stagger-item hover-glow group"
                  >
                    <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full shadow-lg group-hover:scale-150 group-hover:shadow-xl transition-all duration-300"></div>
                    <div className="mb-3">
                      <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                        {exp.year}
                      </span>
                    </div>
                    <h4 className="text-xl font-bold mb-2 dark:text-white text-gray-900">
                      {exp.position}
                    </h4>
                    <p className="text-purple-600 dark:text-purple-400 font-semibold mb-3">
                      {exp.company}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Resume

