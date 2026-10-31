/**
 * Helper script to find your Telegram Chat ID and verify your Bot.
 *
 * HOW TO USE:
 * 1. Open Telegram on your phone or desktop.
 * 2. Search for your Bot (or find the username shown below).
 * 3. Click "START" or send any message like "hello" to the bot.
 * 4. Run: node get-chat-id.js
 *
 * This script will display your numeric Chat ID and can automatically
 * save it to your .env and frontend/.env files!
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '9072435047:AAG1wRKyqsapofbnHyejQvPGlEE-tEvreac'

async function checkTelegram() {
  console.log('\n🤖 Checking Telegram Bot status...\n')

  try {
    // 1. Verify Bot
    const meRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getMe`)
    const meData = await meRes.json()

    if (!meData.ok) {
      console.error('❌ Invalid Telegram Bot Token!')
      console.error('Error details:', meData.description)
      return
    }

    const bot = meData.result
    console.log(`✅ Bot Connected: ${bot.first_name} (@${bot.username})`)
    console.log(`🔗 Bot Link: https://t.me/${bot.username}\n`)

    // 2. Fetch Updates to find user Chat ID
    console.log('🔍 Checking for incoming messages to get your Chat ID...')
    const updatesRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getUpdates`)
    const updatesData = await updatesRes.json()

    if (!updatesData.ok || !updatesData.result || updatesData.result.length === 0) {
      console.log('⚠️  No messages received yet!')
      console.log('👉 ACTION REQUIRED:')
      console.log(`   1. Open Telegram: https://t.me/${bot.username}`)
      console.log('   2. Click "START" or send "hi" to the bot')
      console.log('   3. Run this script again: node get-chat-id.js\n')
      console.log('💡 Alternatively: Send /start to @userinfobot on Telegram to see your User ID immediately.\n')
      return
    }

    // Get the latest message
    const latest = updatesData.result[updatesData.result.length - 1]
    const chat = latest.message?.chat || latest.channel_post?.chat

    if (!chat) {
      console.log('⚠️  Could not determine chat from recent updates.')
      return
    }

    const chatId = chat.id
    const sender = chat.first_name || chat.username || 'User'

    console.log(`\n🎉 Found your Chat ID!`)
    console.log(`👤 Name/Username: ${sender}`)
    console.log(`🆔 Chat ID: ${chatId}\n`)

    // Update .env files
    updateEnvFile(path.join(__dirname, '.env'), chatId)
    updateEnvFile(path.join(__dirname, 'frontend', '.env'), chatId)

    console.log(`✅ Successfully updated .env and frontend/.env with TELEGRAM_CHAT_ID=${chatId}`)
    console.log('🚀 You are ready to receive contact form submissions directly in Telegram!\n')
  } catch (err) {
    console.error('❌ Network error while contacting Telegram API:', err.message)
    console.log('If you are offline or behind a proxy, make sure internet access is active.')
  }
}

function updateEnvFile(filePath, chatId) {
  if (!fs.existsSync(filePath)) return

  let content = fs.readFileSync(filePath, 'utf8')

  if (content.includes('TELEGRAM_CHAT_ID=')) {
    content = content.replace(/TELEGRAM_CHAT_ID=.*/g, `TELEGRAM_CHAT_ID=${chatId}`)
  } else {
    content += `\nTELEGRAM_CHAT_ID=${chatId}`
  }

  if (content.includes('VITE_TELEGRAM_CHAT_ID=')) {
    content = content.replace(/VITE_TELEGRAM_CHAT_ID=.*/g, `VITE_TELEGRAM_CHAT_ID=${chatId}`)
  } else {
    content += `\nVITE_TELEGRAM_CHAT_ID=${chatId}`
  }

  fs.writeFileSync(filePath, content.trim() + '\n')
}

checkTelegram()

