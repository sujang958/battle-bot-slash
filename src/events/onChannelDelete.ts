import BotClient from '@client'
import { GuildChannel } from 'discord.js'
import { LoggerSetting } from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'


module.exports = {
	name: 'channelDelete',
	async execute(client: BotClient, channel: GuildChannel) {
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: channel.guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.deleteChannel) return
		const logChannel = channel.guild.channels.cache.get(LoggerSettingDB.guild_channel_id)
		if(!logChannel) return
		const embed = new LogEmbed(client, 'error')
			.setDescription('채널 삭제')
			.addFields({
				name: '채널',
				value: `${channel.name}` + '(`' + channel.id + '`)'
			}, {
				name: '카테고리',
				value: channel.parent.name
			})
		return await logChannel.send({embeds: [embed]})
	}
}
