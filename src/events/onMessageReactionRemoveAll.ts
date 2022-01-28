import BotClient from '@client'
import { MessageReaction, Message,TextChannel } from 'discord.js'
import LoggerSetting from '../schemas/LogSettingSchema'
import Embed from '../utils/LogEmbed'

module.exports = {
	name: 'messageReactionRemoveAll',
	async execute(client: BotClient, message: Message, reactions: MessageReaction) {
		const { guild } = message
		if(!guild) return
		if(message.partial) await message.fetch()

		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.memberBan) return

		const logChannel = guild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel
		if(!logChannel) return

		const embed = new Embed(client, 'error')
			.setTitle('모든 반응 삭제')
			.addField('채널', `<#${message.channel.id}>` + '(`' + message.channel.id + '`)')
			.addField('메시지', `[메시지](${message.url})`)

    
		return await logChannel.send({embeds: [embed]})
	}
}