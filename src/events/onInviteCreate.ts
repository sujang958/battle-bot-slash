const { Invite } = require('discord.js')
const { LoggerSetting } = require('../schemas/LogSettingSchema')
const LogEmbed = require('../utils/LogEmbed')

module.exports = {
	name: 'inviteCreate',
	/**
   *
   * @param {import('../structures/BotClient')} client
   * @param {Invite} invite
   */
	async execute(client, invite) {
		const LoggerSettingDB = await LoggerSetting.findOne({
			guild_id: invite.guild.id,
		})
		if (!LoggerSettingDB) return
		if (!LoggerSettingDB.useing.memberBan) return
		const logChannel = invite.guild.channels.cache.get(
			LoggerSettingDB.guild_channel_id
		)
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