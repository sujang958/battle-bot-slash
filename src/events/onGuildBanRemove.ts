import { GuildBan } from "discord.js"
import LoggerSetting from "../schemas/LogSettingSchema"
import LogEmbed from "../utils/LogEmbed"

export default {
  name: "guildBanRemove",
  /**
   *
   * @param {import('../structures/BotClient')} client
   * @param {GuildBan} ban
   */
  async execute(client, ban) {
    let LoggerSettingDB = await LoggerSetting.LoggerSetting.findOne({
      guild_id: ban.guild.id,
    })
    if (!LoggerSettingDB) return
    if (!LoggerSettingDB.useing.memberBan) return
    let logChannel = ban.guild.channels.cache.get(
      LoggerSettingDB.guild_channel_id
    )
    if (!logChannel) return
    let embed = new LogEmbed(client, "warn")
      .setDescription("멤버 멤버 차단 해제")
      .setAuthor(ban.user.username, ban.user.displayAvatarURL())
      .addFields({
        name: "유저",
        value: `<@${ban.user.id}>` + "(`" + ban.user.id + "`)",
      })
    return await logChannel.send({ embeds: [embed] })
  },
}
