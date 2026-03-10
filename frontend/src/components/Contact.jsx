const Contact = () => {
  const contactDetails = [
    {
      icon: 'fa-envelope',
      label: 'Email',
      value: 'yimermarelign@gmail.com',
      href: 'mailto:yimermarelign@gmail.com',
    },
    {
      icon: 'fa-phone',
      label: 'Phone',
      value: '+251 945 342 453',
      href: 'tel:+251912345678',
    },
    {
      icon: 'fa-map-marker-alt',
      label: 'Location',
      value: ' Ethiopia:Available for remote work worldwide',
      href: null,
    },
  ]

  const socials = [
    { icon: 'fa-github',   href: 'https://github.com/mareligncode',   fab: true,  label: 'GitHub' },
    { icon: 'fa-instagram', href: 'https://www.instagram.com/ma.y4534', fab: true,  label: 'LinkedIn' },
    { icon: 'fa-facebook',  href: 'https://www.facebook.com/profile.php?id=100070214702976&mibextid=rS40aB7S9Ucbxw6v',  fab: true,  label: 'Twitter' },
    { icon: 'fa-telegram', href: 'https://t.me/marelignY',        fab: true,  label: 'Telegram' },
  ]

  return (
    <section
      id="contact"
      className="py-12 md:py-16 dark:bg-[#0f0f0f] bg-white relative overflow-hidden"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.06]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.06]" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800/60 text-sm font-medium text-gray-600 dark:text-gray-400 mb-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Open to Opportunities
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 dark:text-white text-gray-900 tracking-tight">
              Get In{' '}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Touch
              </span>
            </h2>

            <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed">
              Have a project in your mind or want to collaborate? Reach out through any of the channels below  I'd love to make real solution for your idea.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-14">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="bg-white dark:bg-gray-800/30 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm shadow-md hover:shadow-xl hover:border-indigo-400 dark:hover:border-indigo-500 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <i className={`fas ${item.icon} text-white`} />
                </div>
                <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                  {item.label}
                </h4>
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors break-all"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-10">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            <span className="text-sm text-gray-400 dark:text-gray-600 font-medium tracking-wider uppercase">
              Find me on
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group w-14 h-14 rounded-2xl border border-gray-200 dark:border-gray-700/50 bg-white dark:bg-gray-800/30 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gradient-to-br hover:from-indigo-500 hover:to-purple-600 hover:text-white hover:border-transparent hover:shadow-lg hover:scale-110 transition-all duration-300"
              >
                <i className={`${s.fab ? 'fab' : 'fas'} ${s.icon} text-xl group-hover:scale-110 transition-transform`} />
              </a>
            ))}
          </div>

          {/* CTA note */}
          <p className="text-center text-sm text-gray-400 dark:text-gray-600 mt-10">
            I typically respond within <span className="text-indigo-500 font-semibold">24 hours</span>.
          </p>
        </div>
      </div>
    </section>
  )
}

export default Contact
