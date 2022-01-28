import BotClient from '@client'
import { Guild, Invite, TextChannel } from 'discord.js'
import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'

module.exports = {
	name: 'inviteCreate',
	async execute(client: BotClient, invite: Invite) {
		const LoggerSettingDB = await LoggerSetting.findOne({
			guild_id: invite.guild.id,
		})
		if (!LoggerSettingDB) return
		if (!LoggerSettingDB.useing.memberBan) return
		const logGuild = invite.guild as Guild
		let logChannel = logGuild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel
		if (!logChannel) return
		const embed = new LogEmbed(client, 'success').setDescription(
			[
				`초대코드 생성 ${invite.channel ? `채널: ${invite.channel}` : ''}`,
				`코드: \`${invite.code}\``,
				`사용가능 횟수: \`${
					invite.maxUses === 0 ? '무제한' : invite.maxUses
				}\``,
				`사용 가능일: ${invite.maxAge != 0 ? invite.maxAge : '무제한'}`,
				`생성자: <@${invite.inviter.id}>(\`${invite.inviter.id}\`)`,
			].join('\n')
		)
		return await logChannel.send({ embeds: [embed] })
	},
}
