const CommandManager = require('../managers/CommandManager')
const ErrorManager = require('../managers/ErrorManager')

module.exports = {
	name: 'messageCreate',
	/**
   * @param {import('../structures/BotClient')} client 
   * @param {import('discord.js').Message} message 
   */
	async execute(client, message) {
		const commandManager = new CommandManager(client)
		const errorManager = new ErrorManager(client)

		message.guild.channels.cache.forEach(async channel => {
			if(channel.isText()) return channel.messages.fetch().catch(() => {})
		})

		if (message.author.bot) return
		if (message.channel.type === 'DM') return
		if (!message.content.startsWith(client.config.bot.prefix)) return

		const args = message.content.slice(client.config.bot.prefix.length).trim().split(/ +/g)
		const commandName = args.shift().toLowerCase()
		const command = commandManager.get(commandName)
    
		await client.dokdo.run(message)

		try {
			await command?.execute(client, message, args)
		} catch (error) {
			errorManager.report(error, message)
		}
	}
}