/**
 * Serverless API handler for Telegram Contact Notifications
 * Endpoint: POST /api/contact (or GET /api/contact for diagnostics)
 */

export default async function handler(req, res) {
  // 1. Enable CORS for all environments
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  // 2. Read Bot Token and Chat ID (with verified defaults)
  const botToken =
    process.env.TELEGRAM_BOT_TOKEN ||
    process.env.VITE_TELEGRAM_BOT_TOKEN ||
    '9072435047:AAG1wRKyqsapofbnHyejQvPGlEE-tEvreac'

  const chatId =
    process.env.TELEGRAM_CHAT_ID ||
    process.env.VITE_TELEGRAM_CHAT_ID ||
    '7571493566'

  // 3. Diagnostics & Health check endpoint
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'online',
      service: 'Portfolio Telegram Contact API',
      botConfigured: Boolean(botToken),
      chatIdConfigured: Boolean(chatId),
      chatIdPreview: chatId ? `${String(chatId).substring(0, 4)}...` : 'missing',
      instruction: 'Telegram Contact API is fully configured and ready.',
    })
  }

  // 4. Handle POST message submission
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' })
  }

  try {
    const { name, email, phone, message } = req.body || {}

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required.' })
    }

    if (!chatId) {
      return res.status(500).json({
        error: 'TELEGRAM_CHAT_ID_MISSING',
        message: 'Telegram Chat ID is not configured.',
      })
    }

    // Helper to escape HTML characters for Telegram HTML parse_mode
    const escapeHtml = (text) =>
      String(text || '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')

    const formattedMessage = [
      '📬 <b>New Portfolio Message</b>',
      '────────────────────────────',
      `👤 <b>Sender:</b> ${escapeHtml(name)}`,
      `📧 <b>Email:</b> ${escapeHtml(email)}`,
      `📱 <b>Phone:</b> ${escapeHtml(phone || 'Not provided')}`,
      `📅 <b>Date:</b> ${new Date().toLocaleString('en-US', { timeZone: 'Africa/Addis_Ababa' })} (EAT)`,
      '────────────────────────────',
      `💬 <b>Message:</b>`,
      escapeHtml(message),
    ].join('\n')

    const telegramRes = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedMessage,
          parse_mode: 'HTML',
        }),
      }
    )

    const telegramData = await telegramRes.json()

    if (!telegramRes.ok || !telegramData.ok) {
      console.error('Telegram API error:', telegramData)
      return res.status(telegramRes.status || 500).json({
        error: 'TELEGRAM_DELIVERY_FAILED',
        details: telegramData.description || 'Failed to deliver message to Telegram',
      })
    }

    return res.status(200).json({
      success: true,
      message: 'Message delivered to Telegram successfully!',
    })
  } catch (error) {
    console.error('Contact API Error:', error)
    return res.status(500).json({
      error: 'SERVER_ERROR',
      message: error.message || 'Internal server error while sending message',
    })
  }
}

