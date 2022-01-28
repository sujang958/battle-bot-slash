import BotClient from '@client'
import { GuildBan, Guild, TextChannel} from 'discord.js'
import LoggerSetting from '../schemas/LogSettingSchema'
import LogEmbed from '../utils/LogEmbed'


module.exports = {
	name: 'guildUpdate',
	async execute(client: BotClient, oldGuild: Guild, newGuild: Guild) {
		const LoggerSettingDB = await LoggerSetting.findOne({guild_id: newGuild.id})
		if(!LoggerSettingDB) return
		if(!LoggerSettingDB.useing.memberBan) return
		const logChannel = newGuild.channels.cache.get(LoggerSettingDB.guild_channel_id) as TextChannel
		if(!logChannel) return
		const embed = new LogEmbed(client, 'warn')
			.setDescription('서버 수정')
		if(oldGuild.name != newGuild.name) embed.addField('이름 수정', '`' + oldGuild.name + '`' + ' -> ' + '`' + newGuild.name + '`')
		if(oldGuild.premiumTier != newGuild.premiumTier) embed.addField(`부스트 ${oldGuild.premiumTier < newGuild.premiumTier ? '추가됨' : '차감됨'}`, '`' + oldGuild.premiumTier + '`' + ' -> ' + '`' + newGuild.premiumTier + '`')
		if (!oldGuild.banner && newGuild.banner) embed.addField('배너 수정', '`' + oldGuild.banner + '`' + ' -> ' + '`' + newGuild.banner + '`')
		if (!oldGuild.afkChannel && newGuild.afkChannel ) embed.addField('잠수 채널 수정', (oldGuild.afkChannel ? `<#${oldGuild.afkChannel.id}>` + '(`' + oldGuild.afkChannel.id + '`)' : '`없음`') + ' -> ' + (newGuild.afkChannel? `<#${newGuild.afkChannel.id}>` + '(`' + newGuild.afkChannel.id + '`)' : '`없음`'))
		if (!oldGuild.vanityURLCode && newGuild.vanityURLCode ) embed.addField('초대 링크 수정', (oldGuild.vanityURLCode ? oldGuild.vanityURLCode : '`없음`') + ' -> ' + (newGuild.vanityURLCode ? newGuild.vanityURLCode : '`없음`') )
		return await logChannel.send({embeds: [embed]})
	}
}
