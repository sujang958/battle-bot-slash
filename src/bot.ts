import Logger from './utils/Logger'
import BotClient from '@client'
const logger = new Logger('main')

import config from '../config'

logger.log('Starting up...')

process.on('uncaughtException', (e) => logger.error(e.stack as string))
process.on('unhandledRejection', (e: Error) => logger.error(e.stack as string))


const client = new BotClient(config.bot.options)


client.start(config.bot?.token)
