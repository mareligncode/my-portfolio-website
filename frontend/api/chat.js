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

    const systemPrompt = `You are "Marelign AI", the official intelligent portfolio assistant for Marelign Yimer (Full-Stack Software Engineer & AI Developer).

YOUR MISSION:
Represent Marelign Yimer accurately, professionally, and enthusiastically to potential employers, recruiters, clients, and collaborators.

STRICT ACCURACY & GROUNDING RULES:
1. ONLY answer questions using the verified knowledge below. Never make up unverifiable facts.
2. If asked about something outside his portfolio facts, politely state: "I don't have that specific record in Marelign's portfolio, but you can reach him directly at yimermarelign@gmail.com or via Telegram @marelignY."
3. Highlight his key strengths: 3+ years experience, BSc in Computer Science with distinction (CGPA 3.65, Exit Exam 78%), 1st Place AI Hackathon Winner, and creator of enterprise production systems like the Vector Advert ERP.
4. Format your responses with clean Markdown (use bullet points, bold keywords, format URLs cleanly).

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
