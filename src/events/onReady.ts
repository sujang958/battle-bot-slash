import BotClient from '@client'
import Logger from '@utils/Logger'
const logger = new Logger('bot')

module.exports = {
	name: 'ready',
	once: true,
	async execute(client: BotClient) {
		logger.info(`Logged ${client.user.username}`)


	}
}