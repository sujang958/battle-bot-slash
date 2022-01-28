import BotClient from '@client'
import { GuildMember, GuildScheduledEvent, TextChannel } from 'discord.js'
import { value } from 'mongoose/lib/options/propertyOptions'
import LoggerSetting from '../schemas/LogSettingSchema'
import DateFormatting from '../utils/DateFormatting'
import LogEmbed from '../utils/LogEmbed'


module.exports = {
	name: 'guildScheduledEventDelete',
	async execute(client: BotClient, guildScheduledEvent: GuildScheduledEvent) {
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: guildScheduledEvent.guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.memberJoin) return
		const logChannel = guildScheduledEvent.guild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel
		if(!logChannel) return
		const embed = new LogEmbed(client, 'error')
			.setDescription('이벤트 삭제')
			.addFields({
				name: '이름',
				value: guildScheduledEvent.name
			},
			{
				name: '생성자',
				value: `<@${guildScheduledEvent.creator.id}>` + '(`' + guildScheduledEvent.creator.id + '`)'
			},
			{
				name: '장소',
				value: guildScheduledEvent.channel ? `<#${guildScheduledEvent.channel.id}>` + '(`' + guildScheduledEvent.channel.id + '`)' : guildScheduledEvent.entityMetadata.location
			})
		return await logChannel.send({embeds: [embed]})
	}
}
