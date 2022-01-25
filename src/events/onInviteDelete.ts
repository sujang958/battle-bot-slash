import BotClient from '@client'
import { Invite, InviteGuild } from 'discord.js'

const { LoggerSetting } = require('../schemas/LogSettingSchema')
const LogEmbed = require('../utils/LogEmbed')

module.exports = {
	name: 'inviteDelete',
	/**
   * @param {import('../structures/BotClient')} client
   * @param {Invite} invite
   */
	async execute(client: BotClient, invite: Invite) {
		if (!invite.guild) return
		const LoggerSettingDB = await LoggerSetting.findOne({
			guild_id: invite.guild.id,
		})
		if (!LoggerSettingDB) return
		if (!LoggerSettingDB.useing.memberBan) return
		const logChannel = invite.guild.channels.cache.get(
			LoggerSettingDB.guild_channel_id
		)
		if (!logChannel) return
		const embed = new LogEmbed(client, 'error').setDescription('초대코드 삭제')
		embed.addField('초대코드', invite.code)
		return await logChannel.send({ embeds: [embed] })
	},
}
