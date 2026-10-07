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
  if (!retrievedChunks || retrievedChunks.length === 0) {
    return `Here is what I found in Marelign's profile:

Portfolio Summary:

1. **Identity & Role**: Full-Stack Software Engineer & AI Developer with 3+ years professional experience.

2. **Education**: BSc in Computer Science from Bahir Dar University (CGPA 3.65 / 4.00, Exit Exam 78%).

3. **Key Highlights**: 🥇 1st Place AI Hackathon Winner (2026), Vector Advert ERP creator, and MERN/Golang developer.

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  const queryTokens = query
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 2)

  // Gather relevant lines across top retrieved chunks
  const extractedItems = []
  const categoryHeader = retrievedChunks[0].category || "Profile Details"

  retrievedChunks.forEach((chunk) => {
    const rawLines = chunk.content
      .split('\n')
      .map((l) => l.trim())
      .filter((l) => l.length > 5)

    rawLines.forEach((line) => {
      const lineLower = line.toLowerCase()
      const isRelevant = queryTokens.some((token) => lineLower.includes(token))
      
      // Clean leading bullet markers
      const cleanLine = line.replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim()
      
      if (isRelevant && cleanLine && !extractedItems.includes(cleanLine)) {
        extractedItems.push(cleanLine)
      }
    })
  })

  // If specific lines matching query tokens were found
  if (extractedItems.length > 0) {
    const topItems = extractedItems.slice(0, 5)
    const formattedList = topItems
      .map((item, index) => {
        // Ensure bold title format if colon exists
        if (item.includes(':')) {
          const parts = item.split(':')
          const title = parts[0].replace(/\*\*/g, '').trim()
          const rest = parts.slice(1).join(':').trim()
          return `${index + 1}. **${title}**: ${rest}`
        }
        return `${index + 1}. ${item.startsWith('**') ? item : `**Detail**: ${item}`}`
      })
      .join('\n\n')

    return `Here is what I found in Marelign's profile:

${categoryHeader}:

${formattedList}

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*`
  }

  // General dynamic fallback using top chunk lines
  const primaryChunk = retrievedChunks[0]
  const lines = primaryChunk.content
    .split('\n')
    .map((l) => l.trim().replace(/^[-•*]\s*/, '').replace(/^\d+\.\s*/, '').trim())
    .filter((l) => l.length > 10)
    .slice(0, 4)

  const formattedLines = lines
    .map((l, i) => `${i + 1}. ${l.startsWith('**') ? l : `**Fact ${i + 1}**: ${l}`}`)
    .join('\n\n')

  return `Here is what I found in Marelign's profile:

${primaryChunk.category}:

${formattedLines}

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
      
      // If server explicitly reports missing API key
      if (errorData.error === 'GEMINI_API_KEY_MISSING' || (errorData.error && errorData.error.includes('not connected'))) {
        return {
          reply: `⚠️ **AI is not connected.**\n\nIf you already added \`GEMINI_API_KEY\` in your Vercel Dashboard, **you must REDEPLOY** for Vercel to inject the variable:\n\n1. Go to **Vercel Dashboard → Deployments**\n2. Click the three dots **(...)** next to the latest deployment\n3. Click **Redeploy**\n\n*Also verify you selected all environments: **Production, Preview, and Development**.*`,
          sources: [],
        }
      }

      // If Gemini returned an active API error (e.g. invalid key or quota)
      if (errorData.message) {
        return {
          reply: `⚠️ **Gemini Error:** ${errorData.message}\n\nPlease check your API key at [Google AI Studio](https://aistudio.google.com/) and ensure your key has not expired or exceeded quota.`,
          sources: [],
        }
      }

      // If server returned 404 or other HTTP error
      if (res.status === 404) {
        return {
          reply: `⚠️ **Endpoint /api/chat returned 404 Not Found.**\n\nPlease redeploy your project on Vercel to ensure the serverless function is published.`,
          sources: [],
        }
      }
    }
  } catch (netErr) {
    console.warn('Serverless endpoint fetch error:', netErr)
  }

  // 2. Try Client-side Gemini API key (if set in Vite env)
  const clientKey = import.meta.env?.VITE_GEMINI_API_KEY
  if (clientKey && clientKey !== 'your_gemini_api_key_here') {
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
      'gemini-pro',
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

  // 3. Fallback when AI is unreachable
  return {
    reply: `⚠️ **AI is not connected.**\n\nIf you already added \`GEMINI_API_KEY\` in your Vercel Dashboard, **you must REDEPLOY** for Vercel to inject the variable:\n\n1. Go to **Vercel Dashboard → Deployments**\n2. Click the three dots **(...)** next to the latest deployment\n3. Click **Redeploy**\n\n*Also verify you selected all environments: **Production, Preview, and Development**.*`,
    sources: [],
  }
}
