const Discord = require('discord.js')
const request = require('request')
const getURLs = require('get-urls')
const http = require('http')

const client = new Discord.Client()

const emoji = [{
  url: 'https://i.imgur.com/n1Ve4P8.png',
  name: 'songlink'
}, {
  url: 'https://i.imgur.com/pNnHCoe.png',
  name: 'spotify'
}, {
  url: 'https://i.imgur.com/AT53OFk.png',
  name: 'itunes'
}, {
  url: 'https://i.imgur.com/S4G0d9G.png',
  name: 'google'
}, {
  url: 'https://i.imgur.com/OGTsvNR.png',
  name: 'deezer'
}, {
  url: 'https://i.imgur.com/Oe5nbE9.png',
  name: 'youtube'
}]

const services = [
  'spotify.com',
  'itun.es',
  'youtube.com',
  'youtu.be',
  'play.google.com/music',
  'deezer.com'
]

const transformURLs = (service, content) => {
  let urls = getURLs(content)
  if (urls.size == 0) {
    return
  }
  urls = [...urls].filter(url => services.filter(service => url.includes(service)).length > 0)
  if (service == 'songlink') {
    return urls.map(url => 'https://song.link/' + url)
  }
  return urls.map(url => `https://song.link/redirect?url=${encodeURI(url)}&to=${service}&web=true`)
}

client.on('ready', () => {
  console.log('Discord client ready')
  client.user.setActivity('@Songlink for help')
})

client.on('guildCreate', (guild) => {
  emoji.map(({ url, name }) => guild.createEmoji(url, name))
})

client.on('message', async (message) => {
  try {
    if (message.author.id == client.user.id) {
      return
    }

    if (message.channel.type != 'text') {
      message.channel.send(`This bot doesn't respond to DMs.`)
      return
    }

    if (message.content.startsWith(`<@${process.env.CLIENT_ID}>`)) {
      let command = message.content.replace(`<@${process.env.CLIENT_ID}> `, '')
      let [service, content] = command.split(/ (.+)/)
      let names = emoji.map(emoji => emoji.name)
      if (names.includes(service) && content) {
        console.log(service, content)
        let urls = transformURLs(service, content)
        if (urls) {
          message.reply(urls.join())
        }
      } else {
        let urls = transformURLs('songlink', command)
        if (urls) {
          message.reply(urls.join())
        } else {
          message.reply(`
React with a music service emoji to receive a link in DM for that service.
"<@${process.env.CLIENT_ID}> <service> <links>" to receive a link in channel
          `)
        }
      }
    }
  } catch (e) {
    console.log(e)
  }
})

client.on('messageReactionAdd', async (messageReaction, user) => {
  let { message: { content }, emoji: { name } } = messageReaction
  let names = emoji.map(emoji => emoji.name)
  if (names.includes(name)) {
    console.log(name, content)
    let dm = await client.users.get(user.id).createDM()
    let urls = transformURLs(name, content)
    if (urls) {
      dm.send(urls.join())
    }
  }
})

client.on('error', console.log)

client.login(process.env.TOKEN)

if (process.env.PORT) {
  http.createServer().listen(process.env.PORT)
  setInterval(() => {
    request(`http://localhost:${process.env.PORT}`)
  }, 600000)
}
