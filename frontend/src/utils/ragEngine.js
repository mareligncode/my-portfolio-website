import { PORTFOLIO_KNOWLEDGE } from '../data/portfolioKnowledge'
import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Tokenizes text into normalized keywords
 */
function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 2)
}

/**
 * RAG Retrieval: Finds the top relevant knowledge chunks based on query
 */
export function retrieveContext(query, topK = 4) {
  const queryTokens = tokenize(query)
  if (queryTokens.length === 0) {
    return PORTFOLIO_KNOWLEDGE.slice(0, topK)
  }

  const scored = PORTFOLIO_KNOWLEDGE.map((chunk) => {
    let score = 0
    const contentTokens = tokenize(chunk.content)
    const categoryTokens = tokenize(chunk.category)
    const keywords = chunk.keywords || []

    // Match keywords (high priority)
    queryTokens.forEach((qToken) => {
      if (keywords.some((kw) => kw.toLowerCase().includes(qToken) || qToken.includes(kw.toLowerCase()))) {
        score += 8
      }
      if (categoryTokens.includes(qToken)) {
        score += 5
      }
      // Content frequency match
      const occurrences = contentTokens.filter((ct) => ct === qToken).length
      score += occurrences * 2
    })

    return { ...chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)
  
  // Return topK chunks, or the top ones that scored above 0
  const topMatches = scored.filter((item) => item.score > 0)
  return (topMatches.length > 0 ? topMatches : scored).slice(0, topK)
}

/**
 * Constructs the Augmented System Prompt
 */
export function buildPrompt(query, retrievedChunks) {
  const contextText = retrievedChunks
    .map((chunk, i) => `[Context Item ${i + 1} - ${chunk.category}]:\n${chunk.content}`)
    .join('\n\n')

  const systemInstruction = `You are "Marelign AI", the official intelligent portfolio assistant for Marelign Yimer (Full-Stack Software Engineer & AI Developer).

YOUR MISSION:
Represent Marelign Yimer accurately, professionally, and enthusiastically to potential employers, recruiters, clients, and collaborators.

STRICT GROUNDING & ACCURACY RULES:
1. Ground your answers strictly in the verified knowledge provided below.
2. If asked something that is NOT in the knowledge base (e.g. personal non-career gossip or unknown facts), politely state: "I don't have that specific information in Marelign's portfolio records, but you can reach him directly at yimermarelign@gmail.com or via Telegram @marelignY."
3. Highlight his key strengths: 3+ years experience, BSc in Computer Science with distinction (CGPA 3.65, Exit Exam 78%), 1st Place Hackathon Winner, and creator of production systems like the Vector Advert Enterprise ERP.
4. Format your responses with clean Markdown (use bullet points, bold key tech names, and format links nicely).
5. Keep answers crisp, warm, and easy to read.

--- VERIFIED PORTFOLIO KNOWLEDGE ---
${contextText}
-----------------------------------

User Query: ${query}`

  return systemInstruction
}

/**
 * Intelligent Local Fallback RAG Engine (Zero API Key needed / Offline mode)
 */
export function generateLocalRAGResponse(query, retrievedChunks) {
  const q = query.toLowerCase()

  if (q.includes('skill') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('python') || q.includes('tech')) {
    return `### 💻 Marelign's Core Tech Stack:
- **Frontend:** React.js, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Bootstrap, React Native & Expo (Mobile).
- **Backend:** Node.js, Express.js, Golang (Gin), FastAPI, RESTful APIs, WebSockets.
- **Databases & ORM:** MongoDB, MySQL, PostgreSQL, GORM, Sequelize, Supabase, Vector DBs (MongoDB Atlas Vector Search).
- **DevOps & Tools:** Git/GitHub, Docker, Postman, Kafka.
- **Soft Skills:** Problem Solving, Team Mentorship (95%), Empathy, and Clean Code architecture.`;
  }

  if (q.includes('project') || q.includes('erp') || q.includes('amazon') || q.includes('work') || q.includes('app')) {
    return `### 🚀 Featured Projects by Marelign:
1. **Vector Advert Complete ERP System:** Full-scale production ERP platform with manufacturing tracking, inventory, HR, accounting, and live analytics dashboards ([Live Demo](https://vectoradvert.com/erp)).
2. **Amazon Ethiopia Platform:** Full e-commerce platform with Chapa payment, multi-tier roles, built with React, Golang Gin, MySQL, and Kafka ([GitHub](https://github.com/mareligncode/ethiopian-amazon)).
3. **Future Impact AI Tutor:** 🥇 **1st Place Winner** at the Bahir Dar University AI Hackathon! Autonomous 48-hour learning platform ([GitHub](https://github.com/mareligncode/complete_ai_tutor)).
4. **Ethiopian Student AI Assistant:** Web & Mobile AI assistant integrated with Gemini & OpenAI via LangChain ([GitHub](https://github.com/fsr-software-solution/School-eAssistant)).
5. **Car Rental System & FarmLink Ethiopia:** Production web platforms with live integrations!`;
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('gpa') || q.includes('grade')) {
    return `### 🎓 Education & Academics:
- **Degree:** Bachelor of Science (BSc) in Computer Science
- **Institution:** Bahir Dar University (BDU), Ethiopia (2023 - 2026)
- **Academic Standing:** **CGPA: 3.65 / 4.00**, National Exit Exam Score: **78%**.
- **Specialization:** Full-Stack Development, Algorithms, Software Engineering, and AI Systems.`;
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('telegram')) {
    return `### 📬 Contact & Availability:
Marelign is **open to opportunities** (Full-Time Remote, Contract, and Freelance worldwide)!
- 📧 **Email:** [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com)
- 📱 **Phone/WhatsApp:** +251 945 342 453
- 💬 **Telegram:** [@marelignY](https://t.me/marelignY)
- 💼 **LinkedIn:** [Marelign Yimer](https://www.linkedin.com/in/marelign-yimer-298635369/)
- 🐙 **GitHub:** [mareligncode](https://github.com/mareligncode)`;
  }

  if (q.includes('certificate') || q.includes('award') || q.includes('hackathon')) {
    return `### 🏆 Key Honors & Certifications:
- 🥇 **1st Place Winner:** BDU Computing Association AI Hackathon (2026) for autonomous AI tutor.
- 📜 **3-Month Dedicated Full Stack Training:** Demera Percipio Tech (Dec 2025).
- 📜 **MERN Full Stack Web Development:** Codveda (Nov 2025).
- 🎓 **BSc Computer Science:** Bahir Dar University (CGPA 3.65).`;
  }

  // Combine relevant chunks
  const primaryChunk = retrievedChunks[0]
  return `**Here is what I found in Marelign's profile:**\n\n${primaryChunk.content}\n\n*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
}

/**
 * Main RAG Query Pipeline:
 * 1. Retrieves relevant context chunks.
 * 2. Tries Serverless API route `/api/chat`.
 * 3. Falls back to direct Gemini API key (if set in Vite env).
 * 4. Falls back to smart grounded local RAG synthesizer.
 */
export async function askPortfolioAI(userMessage, conversationHistory = []) {
  const relevantChunks = retrieveContext(userMessage, 4)
  const fullPrompt = buildPrompt(userMessage, relevantChunks)

  // 1. Try Serverless Endpoint
  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message: userMessage,
        context: relevantChunks,
        history: conversationHistory.slice(-6),
      }),
    })

    if (res.ok) {
      const data = await res.json()
      if (data.reply) {
        return {
          reply: data.reply,
          sources: relevantChunks.map((c) => c.category),
        }
      }
    }
  } catch {
    // Serverless endpoint not reachable in local dev without backend runner, proceed to direct client or fallback
  }

  // 2. Try Client-side Gemini API (if VITE_GEMINI_API_KEY is configured in .env)
  const clientKey = import.meta.env?.VITE_GEMINI_API_KEY
  if (clientKey && clientKey !== 'your_gemini_api_key_here') {
    try {
      const genAI = new GoogleGenerativeAI(clientKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
      const result = await model.generateContent(fullPrompt)
      const response = await result.response
      const text = response.text()
      if (text) {
        return {
          reply: text,
          sources: relevantChunks.map((c) => c.category),
        }
      }
    } catch (geminiError) {
      console.warn('Gemini API call error:', geminiError)
    }
  }

  // 3. Resilient Grounded Local RAG response
  const fallbackReply = generateLocalRAGResponse(userMessage, relevantChunks)
  return {
    reply: fallbackReply,
    sources: relevantChunks.map((c) => c.category),
  }
}
