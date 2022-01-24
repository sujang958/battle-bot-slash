const { Message } = require('discord.js')
const { LoggerSetting } = require('../schemas/LogSettingSchema')
const Embed = require('../utils/LogEmbed')

module.exports = {
  name: 'messageUpdate',
  /**
   * @param {import('../structures/BotClient')} client 
   * @param {Message} oldMessage
   * @param {Message} newMessage
   */
  async execute(client, oldMessage, newMessage) {
    let LoggerSettingDB = await LoggerSetting.findOne({guild_id: newMessage.guild.id})
    let logChannel = oldMessage?.guild.channels.cache.get(LoggerSettingDB.guild_channel_id)
    let oldContent = oldMessage.content
    let newContent = newMessage.content
    if(!oldMessage.guild) return
    if(oldMessage.partial) await oldMessage.fetch()
    if(newMessage.partial) await newMessage.fetch()
    if(oldMessage.content == newMessage.content || !newMessage.content || !oldMessage.content) return
    if(!LoggerSettingDB) return
    if(!LoggerSettingDB.useing.memberBan) return
    
    if(!logChannel) return
    if (newContent.length > 500) {
        let moreNewContentSize = newContent.length - 500
        newContent = newContent.slice(0, 500) + `... +${moreNewContentSize}`;
    }
    if (oldContent.length > 500) {
        let moreOldContentSize = newContent.length - 500
        oldContent = newContent.slice(0, 500) + `... +${moreOldContentSize}`;
    }
    // 이럴때 타입이면 참좋은데...
    return
    //let embed = new Embed(client, 'warn')
    //  .setTitle('메시지 수정')
    //  .addField("채널", `<#${oldMessage.channel.id}>` + "(`" + oldMessage.channel.id + "`)")
    //  .addField("메시지", `[메시지](${oldMessage.url})`)
    //
    //return await logChannel.send({embeds: [embed]})
  }
}