import { GuildChannel, TextChannel } from 'discord.js'
import LogEmbed from '@utils/LogEmbed'
import BotClient from '@client'

module.exports = {
	name: 'channelCreate',
	async execute(client: BotClient, channel: GuildChannel) {
		const LoggerSetting = client.schemas.get('LoggerSetting')
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: channel.guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.createChannel) return
		const logChannel = channel.guild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel

		if(!logChannel) return
		const embed = new LogEmbed(client, 'success')
			.setDescription('채널 생성')
			.addField('채널', `<#${channel.id}>` + '(`' + channel.id + '`)')
      .addField('카테고리', channel.parent?.name as string)
		return await logChannel.send({embeds: [embed]})
	}
}
