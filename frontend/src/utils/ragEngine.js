import { PORTFOLIO_KNOWLEDGE } from '../data/portfolioKnowledge'
import { GoogleGenerativeAI } from '@google/generative-ai'

const DATA = PORTFOLIO_KNOWLEDGE || []

const STOP_WORDS = new Set([
  'what', 'whats', 'who', 'whos', 'how', 'when', 'where', 'which', 'why',
  'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'from', 'up', 'about', 'into', 'over', 'after',
  'tell', 'me', 'give', 'show', 'explain', 'can', 'you', 'please', 'know',
  'his', 'him', 'he', 'her', 'she', 'they', 'them', 'their',
  'marelign', 'yimer', 'mareligns', 'profile', 'complete', 'each', 'all', 'every'
])

/**
 * Tokenizes text into normalized keywords while filtering stopwords
 */
export function tokenize(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((word) => word.length > 1 && !STOP_WORDS.has(word))
}

/**
 * RAG Retrieval: Finds the top relevant knowledge chunks based on query
 */
export function retrieveContext(query, topK = 4) {
  const queryTokens = tokenize(query)
  const qLower = query.toLowerCase()

  // Intent classification shortcuts
  const isSkillsQuery = /\b(skill|skills|stack|tech|technologies|languages|frameworks|tools|proficiency|frontend|backend|database)\b/i.test(query)
  const isExperienceQuery = /\b(experience|career|work|job|role|company|companies|history|positions|rama)\b/i.test(query)
  const isErpQuery = /\b(erp|vector advert|vector|manufacturing|business operations)\b/i.test(query)
  const isHackathonQuery = /\b(hackathon|award|awards|1st place|winner|farmlink|competition)\b/i.test(query)
  const isEducationQuery = /\b(education|university|degree|cgpa|gpa|exit exam|bdu|bahir dar|school|college|academic)\b/i.test(query)
  const isContactQuery = /\b(contact|hire|email|phone|telegram|linkedin|github|reach|location|availability)\b/i.test(query)

  const scored = DATA.map((chunk) => {
    let score = 0
    const contentLower = chunk.content.toLowerCase()
    const catLower = chunk.category.toLowerCase()
    const keywords = (chunk.keywords || []).map((k) => k.toLowerCase())

    // Boost by intent
    if (isSkillsQuery && chunk.id.startsWith('skills')) score += 35
    if (isErpQuery && chunk.id === 'project_erp') score += 50
    if (isHackathonQuery && chunk.id === 'project_ai_hackathon') score += 50
    if (isExperienceQuery && chunk.id === 'experience') score += 40
    if (isEducationQuery && chunk.id === 'education') score += 45
    if (isContactQuery && chunk.id === 'contact') score += 45

    // Direct token matching
    queryTokens.forEach((token) => {
      // Keyword matching
      if (keywords.includes(token)) score += 15
      else if (keywords.some((kw) => kw.includes(token))) score += 8

      // Category matching
      if (catLower.includes(token)) score += 10

      // Content whole-word matches
      const regex = new RegExp(`\\b${token}\\b`, 'gi')
      const matches = contentLower.match(regex)
      if (matches) {
        score += Math.min(matches.length * 3, 18)
      }
    })

    return { ...chunk, score }
  })

  scored.sort((a, b) => b.score - a.score)
  const topMatches = scored.filter((item) => item.score > 0)
  return (topMatches.length > 0 ? topMatches : scored).slice(0, topK)
}

/**
 * Constructs the Augmented System Prompt for Gemini
 */
export function buildPrompt(query, retrievedChunks) {
  const contextText = retrievedChunks
    .map((chunk, i) => `[Context Item ${i + 1} - ${chunk.category}]:\n${chunk.content}`)
    .join('\n\n')

  return `You are "Marelign AI", the official intelligent portfolio assistant for Marelign Yimer (Full-Stack Software Engineer & AI Developer).

YOUR MISSION:
Represent Marelign Yimer accurately, professionally, and enthusiastically using structured, clean, and detailed responses.

RESPONSE GUIDELINES:
1. Directly answer the user's specific question using the verified portfolio knowledge below.
2. Structure your response with clear headings, bullet points, and highlight his key strengths:
   - 3+ years professional experience.
   - Full-Stack Developer at RAMA Software and IT Solutions (2026 June – Present).
   - Architected the production-grade Vector Advert Enterprise ERP system.
   - BSc Computer Science from Bahir Dar University (CGPA 3.65 / 4.00, Exit Exam 78%).
   - 1st Place Winner at BDU Computing Association AI Hackathon (2026).
3. If asked about contact or hiring, provide his email (yimermarelign@gmail.com), Telegram (@marelignY), and LinkedIn.

--- VERIFIED PORTFOLIO KNOWLEDGE ---
${contextText}
-----------------------------------

User Query: ${query}`
}

/**
 * Intelligent Local Fallback RAG Engine (Zero API Key needed / Offline mode)
 */
export function generateLocalRAGResponse(query, retrievedChunks) {
  const qLower = query.toLowerCase()

  // 1. Tech Stack & Skills Query
  if (/\b(skill|skills|stack|tech|technologies|languages|frameworks|proficiency)\b/i.test(qLower)) {
    return `Here is a complete breakdown of Marelign's technical stack and proficiencies:

**Core Technical Stack:**

1. **Frontend & Mobile Development**:
   - **Languages & Frameworks**: React.js, Next.js, React Native (Expo), JavaScript (ES6+), TypeScript, HTML5, CSS3.
   - **Styling & UI**: Tailwind CSS, CSS Modules, Framer Motion, Responsive & Mobile-first Design.

2. **Backend & Distributed Systems**:
   - **Languages & Frameworks**: Node.js, Express.js, Go (Golang / Gin), Python (FastAPI).
   - **Architectures**: RESTful APIs, Microservices, WebSockets (real-time), JWT & Role-Based Access Control (RBAC).

3. **Databases, ORM & Cloud**:
   - **Databases**: PostgreSQL, Supabase, MySQL, MongoDB Atlas (with Vector Search), Redis.
   - **Data Layer**: Prisma, Sequelize, GORM, Mongoose.

4. **Artificial Intelligence & LLMs**:
   - **Frameworks & Models**: LangChain, LangGraph, Google Gemini, OpenAI GPT-4.
   - **Techniques**: RAG (Retrieval-Augmented Generation), Vector Embeddings, Semantic Search, Autonomous AI Agents.

5. **DevOps & Engineering Best Practices**:
   - Git, GitHub, Docker, Postman, Vercel, CI/CD pipelines, Agile workflows.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 2. Education & Academic Background
  if (/\b(education|university|degree|cgpa|gpa|exit exam|bdu|bahir dar|school|college|academic)\b/i.test(qLower)) {
    return `Here are Marelign's verified education and academic credentials:

**Education & Academic Credentials:**

1. **Degree & Institution**:
   - **BSc in Computer Science** from **Bahir Dar University (BDU)** (Graduated 2026).
   - Specialized in Full-Stack Web/Mobile Systems, Distributed Architectures, and AI Solutions.

2. **Outstanding Academic Performance**:
   - **Cumulative GPA (CGPA)**: **3.65 / 4.00** (Top tier academic standing).
   - **National Exit Exam**: **78%** score, demonstrating strong mastery across all core computer science disciplines.

3. **Academic Achievements & Leadership**:
   - Active researcher and developer in university technical initiatives.
   - Recognized for academic excellence and practical software engineering leadership.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 3. Vector Advert ERP System
  if (/\b(erp|vector advert|vector|manufacturing)\b/i.test(qLower)) {
    return `Here are the details on Marelign's flagship Enterprise ERP system:

**Vector Advert & Manufacturing - Enterprise ERP System:**

1. **System Overview & Business Impact**:
   - A complete, production-grade ERP system built for **Vector Advert & Manufacturing Company**.
   - Fully digitizes end-to-end business operations including manufacturing, inventory, warehouse, HR, payroll, finance, and CRM.

2. **Technical Architecture & Stack**:
   - **Frontend**: React.js with interactive data visualization dashboards.
   - **Backend**: Node.js, Express.js, Supabase, PostgreSQL, ORM, RESTful APIs, and role-based access control (RBAC).
   - **Real-Time Layer**: WebSockets for live inventory tracking and instant notifications.

3. **Operational Status**:
   - Successfully deployed and actively used in daily enterprise operations.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 4. Hackathon & Awards
  if (/\b(hackathon|award|awards|1st place|winner|farmlink|competition)\b/i.test(qLower)) {
    return `Here are the details on Marelign's hackathon achievements:

**Hackathon Wins & Recognitions:**

1. **1st Place Winner — BDU Computing Association AI Hackathon (2026)**:
   - Built **FarmLink Ethiopia** in an intensive 48-hour competitive hackathon.
   - An AI-powered agricultural advisory platform helping farmers identify crop diseases, get localized weather forecasts, and access market prices.

2. **Technology Built in 48 Hours**:
   - React.js frontend, Node.js backend, Google Gemini API for multimodal crop diagnostics, and bilingual support (Amharic & English).

3. **Recognition**:
   - Awarded 1st Place for technical innovation, speed of execution, and real-world socioeconomic impact.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 5. Contact & Hiring
  if (/\b(contact|hire|reach|email|phone|telegram|linkedin|github|interview|availability)\b/i.test(qLower)) {
    return `Here is how you can contact and hire Marelign:

**Contact & Professional Availability:**

1. **Direct Communication**:
   - **Email**: [yimermarelign@gmail.com](mailto:yimermarelign@gmail.com)
   - **Telegram**: [@marelignY](https://t.me/marelignY)
   - **Phone**: +251 945 342 453

2. **Profiles & Portfolio**:
   - **GitHub**: [github.com/mareligncode](https://github.com/mareligncode)
   - **LinkedIn**: [linkedin.com/in/marelign-yimer-298635369](https://www.linkedin.com/in/marelign-yimer-298635369/)

3. **Roles & Availability**:
   - Open to Full-Stack Developer, Frontend/Backend Engineer, AI Developer, and ERP Consultant roles (Full-time, Contract, or Remote worldwide).

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 6. Experience & Career Timeline
  if (/\b(experience|career|work|job|role|company|companies|history|positions|rama)\b/i.test(qLower)) {
    return `Here is Marelign's verified professional experience timeline:

**Professional Experience:**

1. **Full-Stack Developer** — *RAMA Software and IT Solutions* (2026 June – Present):
   - Architected and developed a production-grade ERP system with a team for Vector Advert & Manufacturing Company, digitizing manufacturing, inventory, HR, finance, CRM, and business operations.
   - Built scalable frontend and backend services using React.js, Node.js, Express.js, PostgreSQL, and ORM, with REST APIs and role-based access control.
   - Implemented real-time analytics and system updates using WebSockets, Supabase, and microservices-based backend architecture.
   - Deployed and supported the system for real-world daily business operations, from development through testing and production use.

2. **Full-Stack Developer** — *Web & Mobile Production Projects* (2025 – 2026):
   - Delivered scalable web and mobile applications using React, React Native (Expo), Node.js, Express, Golang (Gin), MySQL, and GORM.
   - Mentored junior engineers and instituted code review and CI/CD best practices.

3. **Junior Full-Stack Developer** — *Bahir Dar University Projects* (2024 – 2025):
   - Developed and maintained multiple institutional web applications with MERN stack across 5+ projects.
   - Contributed to the Ethiopian Student AI Assistant platform.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // 7. Dynamic fallback using highest scoring retrieved chunk
  if (retrievedChunks && retrievedChunks.length > 0) {
    const primaryChunk = retrievedChunks[0]
    const lines = primaryChunk.content
      .split('\n')
      .map((l) => l.trim().replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
      .filter((l) => l.length > 8 && !l.toLowerCase().includes('timeline:'))
      .slice(0, 5)

    const formattedLines = lines
      .map((l, i) => {
        if (l.includes(':')) {
          const [head, ...tail] = l.split(':')
          return `${i + 1}. **${head.trim()}**: ${tail.join(':').trim()}`
        }
        return `${i + 1}. **Highlight**: ${l}`
      })
      .join('\n\n')

    return `Here is what I found in Marelign's profile:

**${primaryChunk.category}:**

${formattedLines}

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  return `Here is what I found in Marelign's profile:

**Profile Summary:**

1. **Role**: Full-Stack Software Engineer & AI Developer with 3+ years professional experience.
2. **Education**: BSc Computer Science from Bahir Dar University (CGPA 3.65 / 4.00, Exit Exam 78%).
3. **Key Highlight**: Architected the Vector Advert ERP system and won 1st Place at BDU AI Hackathon (2026).

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

  // 1. Try Serverless Endpoint (/api/chat)
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
    } else {
      const errorData = await res.json().catch(() => ({}))
      console.warn('Serverless endpoint notice:', errorData.message || res.statusText)
    }
  } catch (netErr) {
    console.warn('Serverless endpoint fetch error:', netErr)
  }

  // 2. Try Client-side Gemini API key (if set in Vite env)
  const clientKey = import.meta.env?.VITE_GEMINI_API_KEY
  if (clientKey && clientKey.startsWith('AIzaSy')) {
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
    ]
    try {
      const genAI = new GoogleGenerativeAI(clientKey)
      for (const modelName of modelsToTry) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName })
          const result = await model.generateContent(fullPrompt)
          const response = await result.response
          const text = response.text()
          if (text) {
            return {
              reply: text,
              sources: relevantChunks.map((c) => c.category),
            }
          }
        } catch (mErr) {
          console.warn(`Client model ${modelName} failed:`, mErr.message)
        }
      }
    } catch (geminiError) {
      console.warn('Gemini API call error:', geminiError)
    }
  }

  // 3. Intelligent Local RAG Fallback
  const localReply = generateLocalRAGResponse(userMessage, relevantChunks)
  return {
    reply: localReply,
    sources: relevantChunks.map((c) => c.category),
  }
}
