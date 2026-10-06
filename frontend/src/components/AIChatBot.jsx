import { useState, useRef, useEffect } from 'react'
import {
  X, Send, Bot, User, Sparkles, Minimize2, Maximize2,
  Trash2, ExternalLink, Loader2, Zap, ChevronRight,
} from 'lucide-react'
import { askPortfolioAI } from '../utils/ragEngine'

const SUGGESTED_PROMPTS = [
  { icon: '🏢', text: 'ERP project', full: 'Tell me in detail about the Vector Advert Enterprise ERP system Marelign built' },
  { icon: '💻', text: 'Tech stack', full: 'What is Marelign\'s complete technical stack and proficiency in each skill?' },
  { icon: '🏆', text: 'Hackathon win', full: 'Tell me about the 1st Place AI Hackathon win and what was built in 48 hours' },
  { icon: '🎓', text: 'Education', full: 'What is his education background, CGPA, and academic achievements at Bahir Dar University?' },
  { icon: '🤖', text: 'AI experience', full: 'What is Marelign\'s AI and machine learning experience, tools, and projects?' },
  { icon: '🚀', text: 'Top projects', full: 'What are Marelign\'s most impressive projects with tech details?' },
  { icon: '📜', text: 'Certifications', full: 'What certifications, awards, and professional training does Marelign have?' },
  { icon: '📬', text: 'Hire / Contact', full: 'How can I hire or contact Marelign? What roles is he open to?' },
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
      text: "👋 Hi! I'm **Marelign AI** — your intelligent portfolio assistant.\n\nAsk me anything about Marelign's **skills**, **ERP project**, **Hackathon win**, **education** (CGPA 3.65), **AI experience**, or how to **hire him**! Use the quick buttons below to get started.",
      sources: ['About & Identity'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isMinimized])

  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 150)
    }
  }, [isOpen, isMinimized])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setShowBadge(false)
  }

  const handleClearChat = () => {
    setMessages([{
      id: 'reset-' + Date.now(),
      role: 'assistant',
      text: "Chat cleared! ✨ Ask me anything about Marelign's background, projects, skills, or how to contact him.",
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
        text: "Something went wrong. Please reach Marelign directly at [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com) or via Telegram [@marelignY](https://t.me/marelignY).",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }])
    } finally {
      setLoading(false)
    }
  }

  const renderText = (text) => {
    return text.split('\n').map((line, i) => {
      // Section headers
      if (line.startsWith('### ')) {
        return <p key={i} className="font-bold text-indigo-600 dark:text-indigo-400 text-sm mt-3 mb-1">{line.slice(4)}</p>
      }
      if (line.startsWith('## ')) {
        return <p key={i} className="font-bold text-gray-900 dark:text-white text-sm mt-2 mb-0.5">{line.slice(3)}</p>
      }

      // Parse links and bold in the line
      const segments = []
      const combinedRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g
      let lastIdx = 0, m

      while ((m = combinedRegex.exec(line)) !== null) {
        if (m.index > lastIdx) segments.push({ type: 'text', content: line.substring(lastIdx, m.index) })
        const token = m[0]
        if (token.startsWith('**')) {
          segments.push({ type: 'bold', content: token.slice(2, -2) })
        } else {
          const linkMatch = token.match(/\[([^\]]+)\]\(([^)]+)\)/)
          if (linkMatch) segments.push({ type: 'link', text: linkMatch[1], href: linkMatch[2] })
        }
        lastIdx = m.index + m[0].length
      }
      if (lastIdx < line.length) segments.push({ type: 'text', content: line.substring(lastIdx) })

      return (
        <p key={i} className={line.trim() === '' ? 'h-1.5' : 'leading-relaxed min-h-[1.2rem] text-[12px] sm:text-[13px]'}>
          {segments.map((seg, si) => {
            if (seg.type === 'bold') return <strong key={si} className="font-semibold text-gray-900 dark:text-gray-100">{seg.content}</strong>
            if (seg.type === 'link') return (
              <a key={si} href={seg.href} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-0.5 text-indigo-500 dark:text-indigo-400 font-medium underline hover:text-indigo-700 transition-colors">
                {seg.text}<ExternalLink className="w-2.5 h-2.5 ml-0.5" />
              </a>
            )
            return seg.content
          })}
        </p>
      )
    })
  }

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50 group">
          {/* Hover tooltip */}
          <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-3 group-hover:translate-x-0"
            style={{ background: 'linear-gradient(135deg,#1e1b4b,#4c1d95)', color: '#e0e7ff' }}>
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-pulse" />
            Ask Marelign's AI Assistant
            <div className="absolute right-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45" style={{ background: '#4c1d95' }} />
          </div>

          <button onClick={handleOpen} aria-label="Open AI Portfolio Assistant"
            className="relative flex items-center justify-center rounded-2xl text-white transition-all duration-300 hover:scale-110 active:scale-95"
            style={{ width: 60, height: 60, background: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 50%,#ec4899 100%)', boxShadow: '0 8px 32px rgba(99,102,241,0.45)' }}>
            {/* Outer glow ring */}
            <div className="absolute inset-0 rounded-2xl animate-ping opacity-20" style={{ background: 'linear-gradient(135deg,#6366f1,#ec4899)' }} />
            <Bot className="w-7 h-7 relative z-10" />
            {showBadge && (
              <span className="absolute -top-2 -right-2 flex h-5 w-5 z-20">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75" />
                <span className="relative flex items-center justify-center rounded-full h-5 w-5 bg-gradient-to-r from-pink-500 to-rose-500 text-[8px] font-black text-white">AI</span>
              </span>
            )}
          </button>
        </div>
      )}

      {/* ── Chat Window ── */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 z-50 flex flex-col rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 ${
          isMinimized ? 'w-80 h-16' : 'w-[93vw] sm:w-[440px] max-h-[90vh]'
        }`}
          style={{ border: '1px solid rgba(99,102,241,0.2)', boxShadow: '0 24px 80px rgba(99,102,241,0.2), 0 0 0 1px rgba(99,102,241,0.1)' }}>

          {/* ── Header ── */}
          <div className="flex items-center justify-between px-4 py-3.5 flex-shrink-0 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg,#4338ca 0%,#7c3aed 55%,#db2777 100%)' }}>
            {/* Decorative bg elements */}
            <div className="absolute -top-8 -left-8 w-28 h-28 rounded-full opacity-15 bg-white" />
            <div className="absolute -bottom-10 right-12 w-32 h-32 rounded-full opacity-10 bg-white" />
            <div className="absolute top-1 right-24 w-16 h-16 rounded-full opacity-10 bg-pink-300" />

            <div className="flex items-center gap-3 relative z-10">
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(12px)', border: '1.5px solid rgba(255,255,255,0.35)' }}>
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-indigo-700 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm tracking-tight">Marelign AI</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md"
                    style={{ background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)' }}>
                    <Sparkles className="w-2.5 h-2.5 text-yellow-300" />
                    <span className="text-[9px] font-extrabold tracking-widest uppercase text-yellow-200">RAG</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-indigo-100 font-medium">Portfolio Intelligence • Online</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-0.5 relative z-10">
              <button onClick={handleClearChat} title="Clear chat"
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/20 transition-all">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/20 transition-all">
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/20 transition-all">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* ── Body ── */}
          {!isMinimized && (
            <>
              {/* Messages Area */}
              <div className="overflow-y-auto p-3.5 space-y-3.5 dark:bg-[#0b0b10] bg-gray-50/70"
                style={{ minHeight: 220, maxHeight: 'calc(90vh - 340px)' }}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow"
                        style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                        <Bot className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className="max-w-[83%] space-y-1">
                      <div className={`px-3.5 py-2.5 rounded-2xl shadow-sm ${
                        msg.role === 'user'
                          ? 'text-white rounded-br-sm'
                          : 'bg-white dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700/50 rounded-bl-sm'
                      }`}
                        style={msg.role === 'user' ? { background: 'linear-gradient(135deg,#6366f1,#7c3aed)' } : {}}>
                        <div className="space-y-0.5">{renderText(msg.text)}</div>
                      </div>
                      <div className={`flex items-center gap-2 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <span className="text-[10px] text-gray-400 dark:text-gray-600">{msg.timestamp}</span>
                        {msg.sources?.length > 0 && (
                          <div className="flex items-center gap-1 text-[10px] text-indigo-400">
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>{msg.sources.slice(0, 2).join(' · ')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 bg-gray-200 dark:bg-gray-700">
                        <User className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Animated typing dots */}
                {loading && (
                  <div className="flex gap-2.5 items-end">
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 shadow"
                      style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
                      <Bot className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700/50 shadow-sm flex items-center gap-3">
                      <div className="flex gap-1 items-end h-4">
                        {[0, 150, 300].map((delay, i) => (
                          <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce"
                            style={{ background: ['#6366f1','#8b5cf6','#ec4899'][i], animationDelay: `${delay}ms` }} />
                        ))}
                      </div>
                      <span className="text-[11px] text-gray-400 dark:text-gray-500 italic">Searching portfolio data...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* ── Suggested Prompts — 2-Column Grid, ALL visible ── */}
              <div className="flex-shrink-0 px-3.5 pt-3 pb-2 dark:bg-[#0b0b10] bg-gray-50/70 border-t border-gray-100/80 dark:border-gray-800/80">
                <div className="flex items-center gap-1.5 mb-2">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">Quick Questions</span>
                </div>
                {/* 2-column grid — all 8 prompts visible */}
                <div className="grid grid-cols-2 gap-1.5">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      disabled={loading}
                      onClick={() => handleSend(prompt.full)}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed group/btn border"
                      style={{
                        background: 'white',
                        borderColor: 'rgba(99,102,241,0.18)',
                        boxShadow: '0 1px 3px rgba(99,102,241,0.07)',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'linear-gradient(135deg,#6366f1,#8b5cf6)'
                        e.currentTarget.style.borderColor = 'transparent'
                        e.currentTarget.querySelectorAll('span').forEach(s => s.style.color = 'white')
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.borderColor = 'rgba(99,102,241,0.18)'
                        e.currentTarget.querySelectorAll('span').forEach(s => s.style.color = '')
                      }}
                    >
                      <span className="text-base leading-none flex-shrink-0">{prompt.icon}</span>
                      <span className="text-[11px] font-semibold text-indigo-700 dark:text-indigo-400 leading-tight truncate">
                        {prompt.text}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* ── Input Bar ── */}
              <form
                onSubmit={e => { e.preventDefault(); handleSend() }}
                className="flex items-center gap-2 px-3 py-3 bg-white dark:bg-[#0f0f14] border-t border-gray-100 dark:border-gray-800 flex-shrink-0"
              >
                <div className="flex-1 flex items-center gap-2 px-3.5 py-2.5 rounded-2xl border transition-all duration-200"
                  style={{ borderColor: 'rgba(99,102,241,0.2)', background: '#f8f8fc' }}
                  onFocus={e => e.currentTarget.style.borderColor = '#6366f1'}
                  onBlur={e => e.currentTarget.style.borderColor = 'rgba(99,102,241,0.2)'}>
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    placeholder="Ask anything about Marelign..."
                    disabled={loading}
                    className="flex-1 text-[12px] sm:text-[13px] bg-transparent text-gray-900 dark:text-white outline-none placeholder-gray-400"
                  />
                  {input.trim() && <ChevronRight className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />}
                </div>
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-40 flex-shrink-0"
                  style={{ background: loading ? '#94a3b8' : 'linear-gradient(135deg,#6366f1,#8b5cf6)', boxShadow: '0 4px 14px rgba(99,102,241,0.35)' }}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                </button>
              </form>

              {/* Footer branding */}
              <div className="py-1.5 bg-white dark:bg-[#0f0f14] text-center border-t border-gray-50 dark:border-gray-900">
                <span className="text-[9px] font-medium tracking-wider text-gray-300 dark:text-gray-700 uppercase flex items-center justify-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Powered by RAG + Gemini AI — Grounded Portfolio Intelligence
                </span>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        .dark input { background: transparent !important; color: white !important; }
        .dark .grid button { background: #1a1a24 !important; border-color: rgba(99,102,241,0.2) !important; }
        .dark .grid button span:last-child { color: #a5b4fc !important; }
        .dark .grid button:hover { background: linear-gradient(135deg,#6366f1,#8b5cf6) !important; }
        .dark .grid button:hover span { color: white !important; }
        .dark form > div:first-child { background: #1a1a24 !important; }
      `}</style>
    </>
  )
}

export default AIChatBot
