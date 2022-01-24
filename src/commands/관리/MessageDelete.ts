import { SlashCommandBuilder } from '@discordjs/builders'
import Discord, { Message } from 'discord.js'
import Embed from '@utils/Embed'
import BotClient from "@classes/BotClient"

module.exports = {
  name: 'clear',
  description: '메시지를 삭제합니다',
  aliases: ['청소', '삭제', 'delmsg', '클리어', 'cjdth'],
  isSlash: false,
  async execute(client: BotClient, message: Message, args: string[]) {
    let number = Number(args[0])
    if(typeof number !== 'number')
      return message.reply('삭제할 메시지의 번호를 입력해주세요')
    
    if(number <= 100) {
      if(message.channel.type === "GUILD_TEXT") {
        message.channel.bulkDelete(number)
      }
    } else {
      let fetched = await message.channel.messages.fetch({ limit: 99 })
      let count = 0
      try {
        if(message.channel.type === "GUILD_TEXT") {
          message.channel.bulkDelete(fetched).then((x) => {
            count =+ x.size
          })
        }
      } finally {
        message.channel.send('asdf')
      }
    }
  }
}