import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState({
    loading: false,
    success: false,
    error: false,
    message: '',
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please enter your name',
      })
      return false
    }
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please enter a valid email address',
      })
      return false
    }
    if (!formData.message.trim()) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Please enter your message',
      })
      return false
    }
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus({ loading: true, success: false, error: false, message: '' })

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          loading: false,
          success: true,
          error: false,
          message: 'Message sent successfully! I will get back to you soon.',
        })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({
          loading: false,
          success: false,
          error: true,
          message: data.message || 'Failed to send message. Please try again.',
        })
      }
    } catch (error) {
      setStatus({
        loading: false,
        success: false,
        error: true,
        message: 'Network error. Please check if the backend server is running.',
      })
    }
  }

  return (
    <section
      id="contact"
      className="py-24 md:py-32 dark:bg-[#0f0f0f] bg-white"
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 scroll-reveal">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 dark:text-white text-gray-900 tracking-tight">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <div className="section-divider scroll-reveal-scale"></div>
            <p className="mt-8 text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed scroll-reveal">
              Have a project in mind? Let's discuss how we can work together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="scroll-reveal-left">
              <h3 className="text-3xl font-bold mb-10 dark:text-white text-gray-900">
                Contact Information
              </h3>
              <div className="space-y-8">
                <div className="flex items-start space-x-5 stagger-item hover-glow group">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 pulse-glow">
                    <i className="fas fa-envelope text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white text-gray-900 text-lg">
                      Email
                    </h4>
                    <a
                      href="mailto:your.email@example.com"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      your.email@example.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5 stagger-item hover-glow group">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 pulse-glow">
                    <i className="fas fa-phone text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white text-gray-900 text-lg">
                      Phone
                    </h4>
                    <a
                      href="tel:+1234567890"
                      className="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-5 stagger-item hover-glow group">
                  <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 pulse-glow">
                    <i className="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div>
                    <h4 className="font-bold mb-2 dark:text-white text-gray-900 text-lg">
                      Location
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Available for remote work worldwide
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="font-bold mb-6 dark:text-white text-gray-900 text-lg">
                  Follow Me
                </h4>
                <div className="flex space-x-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 group"
                  >
                    <i className="fab fa-github group-hover:scale-110 transition-transform"></i>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 group"
                  >
                    <i className="fab fa-linkedin group-hover:scale-110 transition-transform"></i>
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 glass-card rounded-xl flex items-center justify-center hover:bg-indigo-500 hover:text-white dark:hover:bg-indigo-500 transition-all duration-300 group"
                  >
                    <i className="fab fa-twitter group-hover:scale-110 transition-transform"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="scroll-reveal-right">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2.5 dark:text-gray-200 text-gray-700"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border dark:border-gray-700/50 border-gray-300 dark:bg-gray-800/50 bg-white dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all glass-card"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2.5 dark:text-gray-200 text-gray-700"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 rounded-xl border dark:border-gray-700/50 border-gray-300 dark:bg-gray-800/50 bg-white dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all glass-card"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2.5 dark:text-gray-200 text-gray-700"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-5 py-3.5 rounded-xl border dark:border-gray-700/50 border-gray-300 dark:bg-gray-800/50 bg-white dark:text-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none glass-card"
                    placeholder="Your message..."
                  ></textarea>
                </div>

                {/* Status Message */}
                {status.message && (
                  <div
                    className={`p-4 rounded-xl ${
                      status.success
                        ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                        : status.error
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                        : ''
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.loading}
                  className="w-full btn-primary magnetic-btn ripple px-8 py-4 text-white rounded-xl font-semibold text-base shadow-lg hover-glow disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none group"
                >
                  {status.loading ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact

