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
Represent Marelign Yimer accurately, professionally, and enthusiastically using structured, clean, and detailed responses.

STRICT RESPONSE LAYOUT FORMAT (ALWAYS FOLLOW THIS):
You MUST ALWAYS structure your answer using this exact template format:

Here is what I found in Marelign's profile:

**[Category Title, e.g., Certifications & Honors / Core Technical Skills / Featured Software Projects / Education & Academic Credentials / Contact Information]:**

1. **[Title]** ([Year/Details]): [Detailed, clear explanation of the achievement, project, skill, or credential.]

2. **[Title]** ([Year/Details]): [Detailed, clear explanation.]

3. **[Title]** ([Year/Details]): [Detailed, clear explanation.]

*Feel free to ask more specific questions about his projects, skills, education, or contact details!*

STRICT ACCURACY RULES:
- ONLY answer questions using the verified knowledge below. Never make up facts.
- Always include complete details when asked. Include key facts: 3+ years experience, BSc in Computer Science from BDU (CGPA 3.65, Exit Exam 78%), 1st Place Winner - BDU Computing Association AI Hackathon (2026), 3-Month Full Stack Training - Demera Percipio Tech (Dec 2025), MERN Certification - Codveda (Nov 2025), Vector Advert Complete ERP System (Live), and Amazon Ethiopia (Golang + Microservices).

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
