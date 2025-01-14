import { Invite } from 'discord.js'
import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'

export default {
  name: 'inviteDelete',
  /**
   * 
   * @param {import('../structures/BotClient')} client 
   * @param {Invite} invite
   */
  async execute(client, invite) {
    let LoggerSettingDB = await LoggerSetting.findOne({guild_id: invite.guild.id})
    if(!LoggerSettingDB) return
    if(!LoggerSettingDB.useing.memberBan) return
    let logChannel = invite.guild.channels.cache.get(LoggerSettingDB.guild_channel_id)
    if(!logChannel) return
    let embed = new LogEmbed(client, 'error')
        .setDescription('초대코드 삭제')
    embed.addField('초대코드', invite.code)
    return await logChannel.send({embeds: [embed]})
  }
}
