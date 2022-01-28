import BotClient from '@client'
import { MessageCommand } from '@types'
import { Message } from 'discord.js'
//import CommandManager from '@managers/CommandManager'
//import ErrorManager from '@managers/ErrorManager'

export default {
	name: 'messageCreate',
	async execute(client: BotClient, message: Message) {
		//const commandManager = new CommandManager(client)
		//const errorManager = new ErrorManager(client)

		message.guild.channels.cache.forEach(async channel => {
			if(channel.isText()) return channel.messages.fetch().catch(() => {})
		})

		if (message.author.bot) return
		if (message.channel.type === 'DM') return
		if (!message.content.startsWith(client.config.bot.prefix)) return

		const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g)
		const commandName = args.shift().toLowerCase()
		//const command = commandManager.get(commandName) as MessageCommand
    
		await client.dokdo.run(message)

		try {
			//await command?.execute(client, message, args)
		} catch (error) {
			/*errorManager.report(error, {
				executer: message,
			})*/
		}
	}
}