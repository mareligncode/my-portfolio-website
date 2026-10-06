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
Represent Marelign Yimer accurately, professionally, and enthusiastically using structured, clean, and detailed responses.

STRICT RESPONSE LAYOUT FORMAT (ALWAYS FOLLOW THIS):
You MUST ALWAYS structure your answer using this exact template format:

Here is what I found in Marelign's profile:

**[Category Title, e.g., Certifications & Honors / Core Technical Skills / Featured Software Projects / Education & Academic Credentials / Contact Information]:**

1. **[Title]** ([Year/Details]): [Detailed, clear explanation of the achievement, project, skill, or credential.]

2. **[Title]** ([Year/Details]): [Detailed, clear explanation.]

3. **[Title]** ([Year/Details]): [Detailed, clear explanation.]

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*

STRICT GROUNDING & ACCURACY RULES:
1. Ground your answers strictly in the verified knowledge provided below.
2. If asked something that is NOT in the knowledge base, politely state: "I don't have that specific information in Marelign's profile records, but you can reach him directly at yimermarelign@gmail.com or via Telegram @marelignY."
3. Highlight his key strengths: 3+ years experience, BSc in Computer Science from BDU (CGPA 3.65, Exit Exam 78%), 1st Place Winner - BDU Computing Association AI Hackathon (2026), Demera Percipio Tech 3-Month Training (Dec 2025), Codveda MERN Certification (Nov 2025), Vector Advert Complete ERP System (Live), and Amazon Ethiopia (Golang + Microservices).

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

  if (q.includes('certif') || q.includes('award') || q.includes('honor') || q.includes('hackathon') || q.includes('achievement')) {
    return `Here is what I found in Marelign's profile:

Certifications & Honors:

1. **1st Place Winner - BDU Computing Association AI Hackathon (2026)**: Honored for developing an autonomous AI-driven educational platform in 48 hours.

2. **3-Month Dedicated Full Stack Development Training - Demera Percipio Tech (Dec 2025)**: Specialized professional training in modern enterprise development and software engineering best practices.

3. **MERN Full Stack Web Development Certification - Codveda (Nov 2025)**: Mastery in React, Node.js, Express, MongoDB, and modern DB systems.

4. **BSc in Computer Science with Distinction - Bahir Dar University (June 2026)**: CGPA 3.65 / 4.00, National Exit Exam Score 78%.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  if (q.includes('skill') || q.includes('stack') || q.includes('react') || q.includes('node') || q.includes('python') || q.includes('tech') || q.includes('language')) {
    return `Here is what I found in Marelign's profile:

Core Technical Skills & Stack:

1. **Frontend & Mobile Development**: Master of React.js, JavaScript (ES6+), HTML5/CSS3, Tailwind CSS, Bootstrap, and cross-platform React Native & Expo for iOS/Android apps.

2. **Backend Engineering**: Expert in Node.js, Express.js, RESTful API architecture, Golang (Gin framework), FastAPI (Python), WebSockets, and Apache Kafka microservices.

3. **Databases & Cloud**: Proficient in MongoDB Atlas Vector Search (RAG), PostgreSQL, MySQL (Sequelize/GORM ORMs), Supabase, and Docker containerization.

4. **AI & Machine Learning**: Specialized in Google Gemini, OpenAI GPT, LangChain, LangGraph multi-agent workflows, vector embeddings, and autonomous RAG systems.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  if (q.includes('project') || q.includes('erp') || q.includes('amazon') || q.includes('work') || q.includes('app') || q.includes('portfolio')) {
    return `Here is what I found in Marelign's profile:

Featured Software Projects:

1. **Vector Advert Complete ERP System (Live in Production)**: Architected and deployed a full-scale enterprise ERP managing manufacturing tracking, inventory, HR portal, accounting, supply chain, and live executive analytics dashboards ([Live ERP Demo](https://vectoradvert.com/erp)).

2. **Amazon Ethiopia E-Commerce Platform**: Multi-role online marketplace with Chapa payment gateway, real-time order tracking, and decoupled microservices powered by React, Golang Gin, MySQL, and Kafka ([GitHub Repository](https://github.com/mareligncode/ethiopian-amazon)).

3. **Future Impact Autonomous AI Tutor (1st Place Hackathon Winner)**: AI platform built in 48 hours providing autonomous study planning, course generation, and quiz building ([GitHub Repository](https://github.com/mareligncode/complete_ai_tutor)).

4. **Ethiopian Student AI Assistant**: Web & Mobile AI application integrated with Gemini & OpenAI via LangChain/LangGraph trained on national curriculum ([GitHub Repository](https://github.com/fsr-software-solution/School-eAssistant)).

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  if (q.includes('education') || q.includes('degree') || q.includes('university') || q.includes('cgpa') || q.includes('gpa') || q.includes('grade') || q.includes('exit')) {
    return `Here is what I found in Marelign's profile:

Education & Academic Background:

1. **BSc in Computer Science (Distinction)**: Graduated from Bahir Dar University (BDU), Ethiopia (2023 - 2026).

2. **Academic Standing**: Maintained an outstanding **CGPA of 3.65 / 4.00**, placing in the top tier of his cohort.

3. **National Exit Exam Score**: Achieved a high score of **78%** on the National Exit Examination.

4. **Core Focus**: Algorithms, Distributed Systems, Software Engineering, Database Systems, and Artificial Intelligence.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  if (q.includes('contact') || q.includes('hire') || q.includes('email') || q.includes('phone') || q.includes('reach') || q.includes('telegram') || q.includes('linkedin')) {
    return `Here is what I found in Marelign's profile:

Contact Information & Direct Channels:

1. **Email Address**: [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com)

2. **Telegram Direct Message**: [@marelignY](https://t.me/marelignY)

3. **Phone & WhatsApp**: +251 945 342 453

4. **Professional Profiles**: [LinkedIn Profile](https://www.linkedin.com/in/marelign-yimer-298635369/) | [GitHub Portfolio](https://github.com/mareligncode)

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // Fallback using retrieved context chunk
  const primaryChunk = retrievedChunks[0]
  return `Here is what I found in Marelign's profile:

${primaryChunk.category}:

1. **Overview**: ${primaryChunk.content.split('\n')[0] || primaryChunk.content}

2. **Key Details**: ${primaryChunk.content.slice(0, 300).replace(/\n/g, ' ')}...

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
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
