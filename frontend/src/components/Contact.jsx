import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const response = await fetch("https://formsubmit.co/ajax/mareligny@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            ...formData,
            _subject: `New Contact Form Submission from ${formData.name}`
        })
      })
      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => setStatus(''), 5000)
      } else {
        setStatus('error')
      }
    } catch (err) {
      setStatus('error')
    }
  }
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
    { icon: 'fa-github', href: 'https://github.com/mareligncode', fab: true, label: 'GitHub' },
    { icon: 'fa-linkedin', href: 'https://www.linkedin.com/in/marelign-yimer-298635369/', fab: true, label: 'LinkedIn' },
    { icon: 'fa-facebook', href: 'https://www.facebook.com/profile.php?id=100070214702976&mibextid=rS40aB7S9Ucbxw6v', fab: true, label: 'Facebook' },
    { icon: 'fa-telegram', href: 'https://t.me/marelignY', fab: true, label: 'Telegram' },
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

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800/30 rounded-2xl p-8 border border-gray-200 dark:border-gray-700/50 backdrop-blur-sm shadow-xl mb-14 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">Send me a message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
                  placeholder="+1 234 567 890"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  name="message"
                  required
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>

              <div className="text-center pt-2">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-1 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full md:w-auto min-w-[200px]"
                >
                  {status === 'sending' ? (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-spinner fa-spin"></i> Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <i className="fas fa-paper-plane"></i> Send Message
                    </span>
                  )}
                </button>
              </div>

              {status === 'success' && (
                <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 text-center font-medium mt-4">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-600 dark:text-red-400 text-center font-medium mt-4">
                  Failed to send message. Please try again or use the email link.
                </div>
              )}
            </form>
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
