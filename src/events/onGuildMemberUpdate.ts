import BotClient from '@client'
import { GuildMember, TextChannel } from 'discord.js'
import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'


module.exports = {
	name: 'guildMemberUpdate',
	async execute(client: BotClient, oldMember: GuildMember, newMember: GuildMember) {
		if (oldMember.partial) return
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: newMember.guild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.memberBan) return
		const logChannel = newMember.guild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel
		if(!logChannel) return
		const embed = new LogEmbed(client, 'warn')
			.setDescription('멤버 수정')
		if(oldMember.nickname !== newMember.nickname) embed.addField('닉네임 수정', '`' + oldMember.nickname + '`' + ' ->' + '`' + newMember.nickname + '`')
		if(!oldMember.premiumSince && newMember.premiumSince) embed.addField('서버 부스트', `<@${newMember.user.id}>` + '(`' + newMember.user.id + '`)' + ' 님이 서버를 부스트 했습니다')
		if(oldMember.premiumSince && !newMember.premiumSince) embed.addField('서버 부스트', `<@${newMember.user.id}>` + '(`' + newMember.user.id + '`)' + ' 님이 서버를 부스트 해제 했습니다')
		if(oldMember.roles.cache.size > newMember.roles.cache.size) {
			oldMember.roles.cache.forEach(role => {
				if (!newMember.roles.cache.has(role.id)) {
					embed.addField('역할 삭제', role.name + '(`' + role.id + '`)')
				}
			})
		} else if (oldMember.roles.cache.size < newMember.roles.cache.size) {
			newMember.roles.cache.forEach(role => {
				if (!oldMember.roles.cache.has(role.id)) {
					embed.addField('역할 추가', role.name + '(`' + role.id + '`)')
				}
			})
		}

		return await logChannel.send({embeds: [embed]})
	}
}
