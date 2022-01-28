import BotClient from "@client"
import { GuildBan } from "discord.js"
import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'


module.exports = {
	name: 'guildBanAdd',
	async execute(client: BotClient, ban: GuildBan) {
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: ban.guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.memberBan) return
		const logChannel = ban.guild.channels.cache.get(LoggerSettingDB.guild_channel_id)
		if(!logChannel) return
		const embed = new LogEmbed(client, 'error')
			.setDescription('멤버 차단')
			.setAuthor(ban.user.username, ban.user.displayAvatarURL())
			.addFields({
				name: '유저',
				value: `<@${ban.user.id}>` + '(`' + ban.user.id + '`)'
			}, {
				name: '사유',
				value: ban.reason ? ban.reason : '없음'
			})
		return await logChannel.send({embeds: [embed]})
	}
}
