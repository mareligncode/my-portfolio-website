import { useState, useRef, useEffect } from 'react'
import {
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
  Trash2,
  ExternalLink,
  Loader2,
  Zap,
  ChevronRight,
} from 'lucide-react'
import { askPortfolioAI } from '../utils/ragEngine'

const SUGGESTED_PROMPTS = [
  { icon: '⚡', text: 'ERP System project', full: 'Tell me about the Vector Advert ERP system project' },
  { icon: '💻', text: 'Full tech stack', full: 'What is Marelign\'s full tech stack and skills?' },
  { icon: '🏆', text: 'Hackathon 1st Place', full: 'Tell me about the 1st Place AI Hackathon win' },
  { icon: '🎓', text: 'Education & CGPA', full: 'What is his education background and CGPA?' },
  { icon: '🌍', text: 'Top projects', full: 'What are the most impressive projects Marelign built?' },
  { icon: '📬', text: 'Hire / Contact', full: 'How can I hire or contact Marelign?' },
  { icon: '🤖', text: 'AI experience', full: 'What AI and machine learning experience does Marelign have?' },
  { icon: '📜', text: 'Certifications', full: 'What certifications and awards does Marelign have?' },
]

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showBadge, setShowBadge] = useState(true)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Hi! I'm **Marelign AI** — your intelligent guide to Marelign Yimer's portfolio.\n\nAsk me anything about his **skills**, **enterprise ERP project**, **1st Place Hackathon**, **education** (CGPA 3.65), or how to **hire him**!",
      sources: ['About & Background'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)
  const promptsRef = useRef(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [messages, isOpen, isMinimized])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setShowBadge(false)
  }

  const handleClearChat = () => {
    setMessages([{
      id: 'reset-' + Date.now(),
      role: 'assistant',
      text: "Chat cleared! Ask me anything about Marelign's background, projects, skills, or contact info 🚀",
      sources: [],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }])
  }

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim()
    if (!query || loading) return

    const userMsg = {
      id: 'u-' + Date.now(),
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = messages.map(m => ({ role: m.role, text: m.text }))
      const response = await askPortfolioAI(query, history)
      setMessages(prev => [...prev, {
        id: 'a-' + Date.now(),
        role: 'assistant',
        text: response.reply,
        sources: response.sources || [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } catch {
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        text: "Something went wrong. Please contact Marelign directly at [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com)!",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally {
      setLoading(false)
    }
  }

  const renderText = (text) => {
    const lines = text.split('\n')
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return (
          <p key={i} className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-2 mb-0.5">
            {line.replace('### ', '')}
          </p>
        )
      }

      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const boldRegex = /\*\*([^*]+)\*\*/g
      const parts = []
      let processed = line
      let lastIdx = 0
      let m

      // First handle links
      const linkParts = []
      lastIdx = 0
      while ((m = linkRegex.exec(line)) !== null) {
        if (m.index > lastIdx) linkParts.push({ type: 'text', content: line.substring(lastIdx, m.index) })
        linkParts.push({ type: 'link', text: m[1], href: m[2] })
        lastIdx = m.index + m[0].length
      }
      if (lastIdx < line.length) linkParts.push({ type: 'text', content: line.substring(lastIdx) })

      const renderSegment = (seg, idx) => {
        if (seg.type === 'link') {
          return (
            <a key={idx} href={seg.href} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400 font-semibold underline hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors">
              {seg.text}<ExternalLink className="w-3 h-3" />
            </a>
          )
        }
        // Handle bold within text segments
        const boldParts = seg.content.split(/(\*\*[^*]+\*\*)/g)
        return boldParts.map((bp, bi) =>
          bp.startsWith('**') && bp.endsWith('**')
            ? <strong key={`${idx}-${bi}`} className="font-semibold text-gray-900 dark:text-gray-100">{bp.slice(2, -2)}</strong>
            : bp
        )
      }

      return (
        <p key={i} className={line.trim() === '' ? 'h-1.5' : 'leading-relaxed min-h-[1.25rem]'}>
          {linkParts.map((seg, si) => renderSegment(seg, si))}
        </p>
      )
    })
  }

  return (
    <>
      {/* ── Floating Trigger ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0"
            style={{ background: 'linear-gradient(135deg,#1e1b4b,#312e81)', color: '#e0e7ff' }}>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            Ask Marelign's AI Assistant
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1.5 w-2.5 h-2.5 rotate-45"
              style={{ background: '#312e81' }} />
          </div>

          <button onClick={handleOpen} aria-label="Open AI Assistant"
            className="relative w-15 h-15 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
            style={{ width: 60, height: 60, background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)' }}>
            {/* Glow */}
            <div className="absolute inset-0 rounded-2xl opacity-70 blur-md -z-10"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #ec4899)' }} />
            <Bot className="w-7 h-7 relative z-10" />
            {showBadge && (
              <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                <span className="relative flex items-center justify-center rounded-full h-5 w-5 bg-pink-500 text-[9px] font-bold text-white">AI</span>
              </span>
            )}
          </button>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${isMinimized ? 'w-80 h-16' : 'w-[92vw] sm:w-[430px] h-[620px] max-h-[88vh]'}`}
          style={{ background: 'var(--chat-bg, #fff)', border: '1px solid rgba(99,102,241,0.15)' }}
        >
          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#4f46e5 0%,#7c3aed 50%,#db2777 100%)' }}>
            {/* Decorative circles */}
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full opacity-20" style={{ background: 'rgba(255,255,255,0.3)' }} />
            <div className="absolute -bottom-8 right-16 w-28 h-28 rounded-full opacity-10" style={{ background: 'rgba(255,255,255,0.4)' }} />

            <div className="flex items-center gap-3 relative z-10">
              {/* Avatar */}
              <div className="relative">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)' }}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-indigo-700" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm tracking-tight">Marelign AI</span>
                  <span className="px-1.5 py-0.5 rounded-md text-[9px] font-extrabold tracking-widest uppercase"
                    style={{ background: 'rgba(255,255,255,0.25)', color: '#fde68a' }}>
                    RAG
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[11px] text-indigo-100">Portfolio Intelligence Active</span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1 relative z-10">
              <button onClick={handleClearChat} title="Clear chat"
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setIsMinimized(!isMinimized)} title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all">
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setIsOpen(false)} title="Close"
                className="p-2 rounded-xl text-white/70 hover:text-white hover:bg-white/20 transition-all">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 dark:bg-[#0d0d12] bg-gray-50/60">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                        <Bot className="w-4 h-4 text-white" />
                      </div>
                    )}

                    <div className="max-w-[82%] space-y-1">
                      <div className={`px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-sm ${
                        msg.role === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700/60 rounded-bl-sm'
                      }`}
                        style={msg.role === 'user' ? { background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' } : {}}>
                        <div className="space-y-0.5">{renderText(msg.text)}</div>
                      </div>

                      {/* Footer: timestamp + sources */}
                      <div className={`flex items-center gap-2 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] text-gray-400 dark:text-gray-600">{msg.timestamp}</span>
                        {msg.sources && msg.sources.length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-indigo-400 dark:text-indigo-500">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{msg.sources.slice(0, 2).join(' · ')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-200 dark:bg-gray-700">
                        <User className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {loading && (
                  <div className="flex gap-2.5 items-end">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/60 shadow-sm flex items-center gap-3">
                      <div className="flex gap-1 items-center">
                        <span className="w-2 h-2 rounded-full bg-indigo-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-pink-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500">Generating answer...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Suggested Prompts (horizontal scroll, all visible) ── */}
              <div className="flex-shrink-0 dark:bg-[#0d0d12] bg-gray-50/60 border-t border-gray-100 dark:border-gray-800/80 px-3 pt-2.5 pb-2">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-yellow-500" />
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider">Quick Questions</span>
                </div>
                <div
                  ref={promptsRef}
                  className="flex gap-2 overflow-x-auto pb-1"
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      disabled={loading}
                      onClick={() => handleSend(prompt.full)}
                      className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed border"
                      style={{
                        background: 'white',
                        color: '#4f46e5',
                        borderColor: 'rgba(99,102,241,0.25)',
                        boxShadow: '0 1px 4px rgba(99,102,241,0.08)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.borderColor = 'transparent'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.color = '#4f46e5'
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'
                      }}
                    >
                      <span>{prompt.icon}</span>
                      <span className="whitespace-nowrap">{prompt.text}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Input Bar ── */}
              <form
                onSubmit={e => { e.preventDefault(); handleSend() }}
                className="flex items-center gap-2 p-3 bg-white dark:bg-[#121218] border-t border-gray-100 dark:border-gray-800 flex-shrink-0"
              >
                <div className="flex-1 flex items-center gap-2 px-4 py-2.5 rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/60 focus-within:border-indigo-400 focus-within:bg-white dark:focus-within:bg-gray-900 transition-all duration-200 shadow-sm">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask about skills, projects, education..."
                    disabled={loading}
                    className="flex-1 text-xs sm:text-sm bg-transparent text-gray-900 dark:text-white outline-none placeholder-gray-400 dark:placeholder-gray-500"
                  />
                  {input.trim() && (
                    <ChevronRight className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                  )}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all duration-200 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}
                >
                  {loading
                    ? <Loader2 className="w-4 h-4 animate-spin" />
                    : <Send className="w-4 h-4" />
                  }
                </button>
              </form>

              {/* Branding Footer */}
              <div className="text-center pb-2 bg-white dark:bg-[#121218]">
                <span className="text-[9px] text-gray-300 dark:text-gray-700 font-medium tracking-wider uppercase flex items-center justify-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Powered by RAG + Gemini AI
                </span>
              </div>
            </>
          )}
        </div>
      )}

      {/* Dark mode variable injection */}
      <style>{`
        .dark [style*="--chat-bg"] { --chat-bg: #0d0d12; }
        [style*="--chat-bg"] { --chat-bg: #ffffff; }
        div[class*="overflow-x-auto"]::-webkit-scrollbar { display: none; }
      `}</style>
    </>
  )
}

export default AIChatBot
