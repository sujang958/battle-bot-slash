import BotClient from '@client'
import { MessageEmbed, MessageEmbedOptions } from 'discord.js'
type Type = 'success'|'error'|'warn'|'info'|'default'

export default class Embed extends MessageEmbed {
	private client: BotClient
	
	constructor(client: BotClient, type: Type) {
		let EmbedJSON: MessageEmbedOptions = {
			timestamp: new Date(),
			footer : {
				text: client.user?.username,
				icon_url: client.user?.avatarURL()
			}
		}
  
		if(type === 'success') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#57F287',
			}
		} else if(type === 'error') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#ED4245',
			}
		} else if(type === 'warn') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#FEE75C',
			}
		} else if(type === 'info') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#5865F2',
			}
		} else if(type === 'default') {
			EmbedJSON = {
				...EmbedJSON,
				color: '#5865F2',
			}
		}
    

		super(EmbedJSON)
		this.client = client
    
	}

	public setType(type: Type) {
		if(type === 'success') {
			this.setColor('#57F287')
		} else if(type === 'error') {
			this.setColor('#ED4245')
		} else if(type === 'warn') {
			this.setColor('##FEE75C')
		} else if(type === 'info') {
			this.setColor('#5865F2')
		} else if(type === 'default') {
			this.setColor('#5865F2')
		}
	}
}