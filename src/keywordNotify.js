const { Wechaty } = require('wechaty')

const bot = new Wechaty()

const KEYWORDS = ['回春丹'];

const isIncludeKeyword = (message, keywords) => {
  return keywords.some(keyword => message.includes(keyword))
}

const onMessage = async (message) => {
  if (message.self()) { // Don't deal with message from yourself.
    return;
  }

  const room = message.room();
  if (!room) { // Don't deal with message outside a room
    return;
  }

  const messageText = message.text();

  if (isIncludeKeyword(messageText, KEYWORDS)) {
    const roomName = await room.topic();
    const self = await bot.Contact.find('又一')
    await self.say(`${roomName}: ${messageText}`)
    // await bot.say(`${roomName}: ${messageText}`)
  }
}

bot.on('scan', (qrcode, status) => {
    console.log(`Scan QR Code to login: ${status}\nhttps://wechaty.js.org/qrcode/${encodeURIComponent(qrcode)}`)
  })
  .on('login', user => {
    console.log(`User ${user} logged in`)
  })
  .on('message', onMessage)
  .start()
