const Skills = () => {
  const skillCategories = [
    {
      title: 'Frontend',
      icon: 'fa-code',
      skills: [
        { name: 'React', level: 95 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 95 },
        { name: 'Tailwind CSS', level: 95 },
        { name: 'Bootstrap', level: 80 },
      ],
    },
    {
      title: 'Backend',
      icon: 'fa-server',
      skills: [
        { name: 'Node.js', level: 95 },
        { name: 'Express.js', level: 95 },
        { name: 'REST APIs', level: 90 },
        { name: 'go', level: 75 },
        { name: 'golang gin', level: 80 },
      ],
    },
    {
      title: 'Database',
      icon: 'fa-database',
      skills: [
        { name: 'MongoDB', level: 90 },
        { name: 'MySQL', level: 90 },
        { name: 'orm  and gorm', level: 85 },
      ],
    },
    {
      title: 'Tools & DevOps',
      icon: 'fa-tools',
      hideIcon: true,
      skills: [
        { name: 'Git', level: 90 },
        { name: 'Docker', level: 80 },
        { name: 'Postman', level: 75 },
        { name: 'Soft Skills', isHeader: true },
        { name: 'Communication', level: 90 },
        { name: 'Teamwork', level: 95 },
        { name: 'Problem Solving', level: 90 },
      ],
    },
  ]

  return (
    <section
      id="skills"
      className="py-12 md:py-16 dark:bg-[#0a0a0a] bg-[#fafafa]"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight">
              My <span className="gradient-text">Skills</span>
            </h2>
            <div className="section-divider scroll-reveal-scale"></div>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed scroll-reveal">
              A comprehensive overview of the technologies and tools I work with
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className="hover-lift glass-card card-tilt p-8 rounded-2xl stagger-item hover-glow"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-center mb-8">
                  {!category.hideIcon && (
                    <div className="w-20 h-20 mx-auto mb-5 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <i className={`fas ${category.icon} text-white text-3xl`}></i>
                    </div>
                  )}
                  <h3 className="text-xl font-bold dark:text-white text-gray-900">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-5">
                  {category.skills.map((skill, sIdx) => (
                    skill.isHeader ? (
                      <h4 key={`header-${sIdx}`} className="text-sm font-bold uppercase tracking-wider text-indigo-500 dark:text-indigo-400 mt-6 mb-2">
                        {skill.name}
                      </h4>
                    ) : (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2.5">
                          <span className="text-sm font-semibold dark:text-gray-200 text-gray-700">
                            {skill.name}
                          </span>
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200/50 dark:bg-gray-800/50 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Skills

