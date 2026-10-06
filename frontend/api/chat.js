import { GoogleGenerativeAI } from '@google/generative-ai'

/**
 * Serverless API handler for Vercel / Netlify / Node.js
 * Endpoint: POST /api/chat
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY environment variable is not configured on the server.',
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
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

    const result = await model.generateContent(systemPrompt)
    const response = await result.response
    const reply = response.text()

    return res.status(200).json({ reply })
  } catch (error) {
    console.error('Serverless chat handler error:', error)
    return res.status(500).json({
      error: error.message || 'Internal Server Error while generating AI response.',
    })
  }
}
