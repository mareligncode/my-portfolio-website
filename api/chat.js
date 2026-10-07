import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Serverless API handler for Vercel / Netlify / Node.js
 * Endpoint: POST /api/chat (or GET /api/chat for diagnostics)
 */
export default async function handler(req, res) {
  // 1. Enable CORS for all environments
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // 2. Read and sanitize API key from any supported env variable
  const rawKey =
    process.env.GEMINI_API_KEY ||
    process.env.VITE_GEMINI_API_KEY ||
    process.env.GOOGLE_API_KEY ||
    ''

  const apiKey = rawKey.replace(/^["'\s]+|["'\s]+$/g, '').trim()
  const hasValidKey = Boolean(apiKey && apiKey !== 'your_gemini_api_key_here')

  // 3. GET request: Diagnostics & Health check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'Marelign Portfolio AI Assistant',
      apiKeyConfigured: hasValidKey,
      keyPreview: hasValidKey
        ? `${apiKey.substring(0, 4)}...${apiKey.substring(apiKey.length - 4)}`
        : 'missing',
      environment: process.env.NODE_ENV || 'production',
      message: hasValidKey
        ? 'Gemini API key is successfully connected on the server!'
        : 'GEMINI_API_KEY is not detected. Please add GEMINI_API_KEY to Vercel Environment Variables and trigger a Redeploy.',
    })
  }

  // 4. POST request: AI Chat generation
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  if (!hasValidKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY_MISSING',
      message:
        'AI is not connected. GEMINI_API_KEY is missing or empty in Vercel Environment Variables. Note: You must Redeploy on Vercel after adding the variable.',
    })
  }

  try {
    const { message, context, history = [] } = req.body

    if (!message) {
      return res.status(400).json({ error: 'Message is required' })
    }

    const contextText = (context || [])
      .map((item, i) => `[Item ${i + 1} - ${item.category}]:\n${item.content}`)
      .join('\n\n')

    const systemPrompt = `You are "Marelign AI", the official intelligent portfolio AI assistant for Marelign Yimer (Full-Stack Software Engineer & AI Developer).

YOUR MISSION:
Answer the user's SPECIFIC question in detail, accurately, dynamically, and enthusiastically based ONLY on Marelign's verified portfolio knowledge provided below.

CRITICAL INSTRUCTIONS FOR DYNAMIC & TAILORED ANSWERS:
1. DO NOT give a generic copy-pasted response. Address the user's specific prompt directly (e.g. if asked about Golang, explain his Golang microservices work; if asked about CGPA, explain his 3.65 CGPA at BDU; if asked about Hackathon, explain the 1st Place win in 2026).
2. ALWAYS structure your response using this elegant layout format:

Here is what I found in Marelign's profile:

**[Relevant Subject Title, e.g., Certifications & Honors / Golang Backend Expertise / Vector Advert ERP Details / Academic Credentials]:**

1. **[Key Point / Sub-topic]**: [In-depth, detailed explanation addressing the user's prompt]
2. **[Key Point / Sub-topic]**: [In-depth, detailed explanation]
3. **[Key Point / Sub-topic]**: [In-depth, detailed explanation]

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*

3. STRICT GROUNDING RULES:
- Use ONLY verified portfolio facts from below. Never hallucinate fake companies, dates, or grades.
- Key facts to keep handy: 3+ years experience, BSc in Computer Science from Bahir Dar University (CGPA 3.65/4.00, Exit Exam 78%), 1st Place Winner at BDU Computing Association AI Hackathon (2026), 3-Month Training at Demera Percipio Tech (Dec 2025), MERN Certification from Codveda (Nov 2025), Vector Advert ERP (Live), Amazon Ethiopia (Golang/Gin/Kafka), Ethiopian Student AI Assistant (LangChain/LangGraph), and FarmLink Ethiopia.

--- VERIFIED PORTFOLIO KNOWLEDGE ---
${contextText}
-----------------------------------

Previous Chat History:
${history.map((h) => `${h.role === 'user' ? 'User' : 'Assistant'}: ${h.text}`).join('\n')}

User Query: ${message}`

    const genAI = new GoogleGenerativeAI(apiKey)
    const modelsToTry = [
      'gemini-1.5-flash',
      'gemini-2.0-flash',
      'gemini-1.5-flash-latest',
      'gemini-1.5-pro',
      'gemini-pro',
    ]

    let reply = null
    let lastError = null

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName })
        const result = await model.generateContent(systemPrompt)
        const response = await result.response
        reply = response.text()
        if (reply) break
      } catch (err) {
        console.warn(`Model ${modelName} failed:`, err.message)
        lastError = err
      }
    }

    if (!reply) {
      throw (
        lastError ||
        new Error('Failed to generate AI response from available Gemini models.')
      )
    }

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Serverless chat handler error:', error)
    return res.status(500).json({
      error: 'GEMINI_GENERATION_FAILED',
      message: error.message || 'AI failed to generate a response from Gemini.',
    })
  }
}
