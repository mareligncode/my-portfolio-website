import { useState, useRef, useEffect } from 'react'
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
  Maximize2,
  Trash2,
  ExternalLink,
  ChevronDown,
  Loader2,
  HelpCircle,
} from 'lucide-react'
import { askPortfolioAI } from '../utils/ragEngine'

const SUGGESTED_PROMPTS = [
  '🚀 Tell me about the Vector ERP project',
  '💻 What is Marelign’s full tech stack?',
  '🏆 Tell me about the 1st Place Hackathon win',
  '🎓 What is his education & CGPA?',
  '📬 How can I hire or contact Marelign?',
]

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [hasOpenedBefore, setHasOpenedBefore] = useState(false)
  const [showNotificationBadge, setShowNotificationBadge] = useState(true)

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      role: 'assistant',
      text: "👋 Hi! I'm **Marelign AI**, personal assistant to Marelign Yimer.\n\nAsk me anything about his **3+ years experience**, **enterprise ERP**, **1st Place AI Hackathon project**, **tech stack**, or **education**!",
      sources: ['About & Background'],
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ])

  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom()
      inputRef.current?.focus()
    }
  }, [messages, isOpen, isMinimized])

  const handleOpen = () => {
    setIsOpen(true)
    setIsMinimized(false)
    setShowNotificationBadge(false)
    setHasOpenedBefore(true)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        role: 'assistant',
        text: "Chat cleared! How else can I assist you with Marelign's portfolio?",
        sources: [],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ])
  }

  const handleSend = async (textToSend) => {
    const query = (textToSend || input).trim()
    if (!query || loading) return

    const userMessageId = 'msg-' + Date.now()
    const userMsg = {
      id: userMessageId,
      role: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const historyPayload = messages.map((m) => ({
        role: m.role,
        text: m.text,
      }))

      const response = await askPortfolioAI(query, historyPayload)

      const botMessageId = 'bot-' + Date.now()
      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          role: 'assistant',
          text: response.reply,
          sources: response.sources || [],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } catch (err) {
      console.error('Chat processing error:', err)
      setMessages((prev) => [
        ...prev,
        {
          id: 'err-' + Date.now(),
          role: 'assistant',
          text: "I encountered a minor issue answering that. Please feel free to reach out directly to Marelign at [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com)!",
          sources: ['Contact & Hiring'],
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const renderFormattedText = (text) => {
    // Basic Markdown formatting helper for bold, lists, and links
    const lines = text.split('\n')
    return lines.map((line, idx) => {
      let formatted = line

      // Check for headers
      if (formatted.startsWith('### ')) {
        return (
          <h4 key={idx} className="font-bold text-base text-indigo-600 dark:text-indigo-400 mt-2 mb-1">
            {formatted.replace('### ', '')}
          </h4>
        )
      }

      // Check for markdown links [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
      const parts = []
      let lastIndex = 0
      let match

      while ((match = linkRegex.exec(formatted)) !== null) {
        if (match.index > lastIndex) {
          parts.push(formatted.substring(lastIndex, match.index))
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold underline hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors"
          >
            {match[1]} <ExternalLink className="w-3 h-3 ml-0.5 inline" />
          </a>
        )
        lastIndex = match.index + match[0].length
      }
      if (lastIndex < formatted.length) {
        parts.push(formatted.substring(lastIndex))
      }

      // Format bold text **word**
      const processBold = (content) => {
        if (typeof content !== 'string') return content
        const boldParts = content.split(/(\*\*[^*]+\*\*)/g)
        return boldParts.map((bPart, bIdx) => {
          if (bPart.startsWith('**') && bPart.endsWith('**')) {
            return (
              <strong key={bIdx} className="font-semibold text-gray-900 dark:text-gray-100">
                {bPart.slice(2, -2)}
              </strong>
            )
          }
          return bPart
        })
      }

      return (
        <p key={idx} className={`${line.trim() === '' ? 'h-2' : 'min-h-[1.25rem]'} leading-relaxed`}>
          {parts.map((p, pIdx) => (typeof p === 'string' ? processBold(p) : p))}
        </p>
      )
    })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* ── Trigger Button (When Closed) ── */}
      {!isOpen && (
        <div className="relative group">
          {/* Tooltip on hover */}
          <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gray-900/90 dark:bg-white/90 text-white dark:text-gray-900 text-xs font-semibold whitespace-nowrap shadow-xl backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none translate-x-2 group-hover:translate-x-0">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 dark:text-indigo-600" />
            <span>Ask Marelign's AI Assistant</span>
          </div>

          <button
            onClick={handleOpen}
            aria-label="Open AI Assistant"
            className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 group-hover:shadow-indigo-500/50 hover:shadow-2xl"
          >
            {/* Glowing background ring */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500 to-pink-500 opacity-60 blur group-hover:opacity-100 animate-pulse transition duration-1000 group-hover:duration-200" />

            {/* Inner button surface */}
            <div className="relative flex items-center justify-center w-full h-full rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500">
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 group-hover:rotate-12 transition-transform duration-300" />
              
              {/* Notification Badge */}
              {showNotificationBadge && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-pink-500 text-[9px] font-bold text-white items-center justify-center">
                    1
                  </span>
                </span>
              )}
            </div>
          </button>
        </div>
      )}

      {/* ── Main Chat Modal ── */}
      {isOpen && (
        <div
          className={`flex flex-col bg-white dark:bg-[#121214] border border-gray-200/80 dark:border-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-16'
              : 'w-[92vw] sm:w-[420px] md:w-[450px] h-[600px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white flex-shrink-0 shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-inner">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 border-2 border-indigo-600 rounded-full" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm tracking-tight">Marelign AI</h3>
                  <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-white/20 text-white/90">
                    RAG
                  </span>
                </div>
                <p className="text-[11px] text-indigo-100/90 flex items-center gap-1">
                  <span>Verified Portfolio Intelligence</span>
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Clear Chat History"
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                title={isMinimized ? 'Expand' : 'Minimize'}
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-1.5 rounded-lg hover:bg-white/20 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body (Hidden if minimized) */}
          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 dark:bg-[#0d0d0f]/50 text-sm">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`max-w-[85%] space-y-1.5`}>
                      <div
                        className={`p-3.5 rounded-2xl text-xs sm:text-sm shadow-sm ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-br-none'
                            : 'bg-white dark:bg-gray-800/90 text-gray-800 dark:text-gray-200 border border-gray-200/70 dark:border-gray-700/60 rounded-bl-none'
                        }`}
                      >
                        {renderFormattedText(msg.text)}
                      </div>

                      {/* Source grounding tag */}
                      {msg.sources && msg.sources.length > 0 && (
                        <div className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400 px-1">
                          <Sparkles className="w-3 h-3 text-indigo-500" />
                          <span>Grounded in: {msg.sources.join(', ')}</span>
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <div className="w-7 h-7 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 flex-shrink-0 mt-1">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading indicator */}
                {loading && (
                  <div className="flex gap-2.5 items-center">
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                      <Bot className="w-4 h-4" />
                    </div>
                    <div className="px-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-none flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400 shadow-sm">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
                      <span>Retrieving portfolio data &amp; generating answer...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Suggestions Chips */}
              <div className="px-3.5 py-2 bg-gray-100/70 dark:bg-gray-900/60 border-t border-gray-200/50 dark:border-gray-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                <span className="text-[11px] font-semibold text-gray-400 whitespace-nowrap pl-1">
                  💡 Suggested:
                </span>
                {SUGGESTED_PROMPTS.map((prompt, idx) => (
                  <button
                    key={idx}
                    disabled={loading}
                    onClick={() => handleSend(prompt.replace(/^[^\w]+/, ''))}
                    className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-indigo-400 whitespace-nowrap transition-all shadow-2xs hover:scale-105 active:scale-95 flex-shrink-0"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              {/* Chat Input Bar */}
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSend()
                }}
                className="p-3 bg-white dark:bg-[#121214] border-t border-gray-200 dark:border-gray-800 flex items-center gap-2 flex-shrink-0"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Marelign's skills, ERP, projects..."
                  disabled={loading}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-gray-100 dark:bg-gray-800/80 text-gray-900 dark:text-white rounded-xl border border-transparent focus:border-indigo-500 focus:bg-white dark:focus:bg-gray-900 outline-none transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || loading}
                  aria-label="Send message"
                  className="w-10 h-10 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white flex items-center justify-center hover:opacity-90 active:scale-95 disabled:opacity-40 disabled:scale-100 transition-all shadow-md flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default AIChatBot
