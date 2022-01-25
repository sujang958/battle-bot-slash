import BotClient from '@client'
import { EmbedType } from '@types'
import { MessageEmbed, MessageEmbedOptions } from 'discord.js'

export default class Embed extends MessageEmbed {
	private client: BotClient

	constructor(client: BotClient, type: EmbedType) {
		if (!client.user) throw new Error('user not found')
		let EmbedJSON: MessageEmbedOptions = {
			timestamp: new Date(),
			title: '로그',
			color: '#fff',
			footer: {
				text: client.user.username,
				icon_url: client.user.avatarURL() ?? undefined,
			},
		}

		if (type === 'success') {
			EmbedJSON.color = '#57F287'
		} else if (type === 'error') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#ED4245',
			}
		} else if (type === 'warn') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#FEE75C',
			}
		} else if (type === 'info') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#5865F2',
			}
		} else if (type === 'default') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#5865F2',
			}
		}

		super(EmbedJSON)
		this.client = client
	}

	public setType(type: EmbedType) {
		if (type === 'success') this.setColor('#57F287')
		else if (type === 'error') this.setColor('#ED4245')
		else if (type === 'warn') this.setColor('#FEE75C')
		else if (type === 'info') this.setColor('#5865F2')
		else if (type === 'default') this.setColor('#5865F2')
	}
}
