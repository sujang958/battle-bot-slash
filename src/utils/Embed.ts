import { BotClient } from '../../types/index'
import { MessageEmbed } from 'discord.js'
import { APIEmbed } from 'discord-api-types/v9'
type Type = 'success'|'error'|'warn'|'info'|'default'

export default class Embed extends MessageEmbed {
	private client: BotClient
	constructor(client: BotClient, type: Type) {
		let EmbedJSON: APIEmbed = {
			timestamp: String(new Date()),
			footer : {
				text: client.user?.username,
				icon_url: client.user?.avatarURL()
			}
		}
  
		if(type === 'success') {
			EmbedJSON = {
				...EmbedJSON,
				color: '57F287',
			}
		} else if(type === 'error') {
			EmbedJSON = {
				...EmbedJSON,
				color: 'ED4245',
			}
		} else if(type === 'warn') {
			EmbedJSON = {
				...EmbedJSON,
				color: 'FEE75C',
			}
		} else if(type === 'info') {
			EmbedJSON = {
				...EmbedJSON,
				color: '5865F2',
			}
		} else if(type === 'default') {
			EmbedJSON = {
				...EmbedJSON,
				color: '5865F2',
			}
		}
    

		super(EmbedJSON)
		this.client = client
    
	}

	public setType(type: Type) {
		if(type === 'success') {
			this.color = '57F287'
		} else if(type === 'error') {
			this.color = 'ED4245'
		} else if(type === 'warn') {
			this.color = 'FEE75C'
		} else if(type === 'info') {
			this.color = '5865F2'
		} else if(type === 'default') {
			this.color = '5865F2'
		}
	}
}