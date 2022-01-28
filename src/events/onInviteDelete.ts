import BotClient from '@client'
import { Guild, Invite, InviteGuild, TextChannel } from 'discord.js'

import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'

module.exports = {
	name: 'inviteDelete',
	async execute(client: BotClient, invite: Invite) {
		if (!invite.guild) return
		const LoggerSettingDB = await LoggerSetting.findOne({
			guild_id: invite.guild.id,
		})
		if (!LoggerSettingDB) return
		if (!LoggerSettingDB.useing.memberBan) return
		const logGuild = invite.guild as Guild
		let logChannel = logGuild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel

		if (!logChannel) return
		const embed = new LogEmbed(client, 'error').setDescription('초대코드 삭제')
		embed.addField('초대코드', invite.code)
		return await logChannel.send({ embeds: [embed] })
	},
}
