/* eslint-disable @typescript-eslint/no-var-requires */
import 'module-alias/register'

import Logger from './utils/Logger'
import { ShardingManager } from 'discord.js'
import chalk from 'chalk'
import config from '../config'
const logger = new Logger('main')

console.log(chalk.cyanBright(`
=========================================================

            ${require('../package.json').name}@${config.BUILD_NUMBER}
          Version : ${config.BUILD_VERSION}

=========================================================
`))

if(!config.bot.sharding) {
	require('./bot')
} else {
	const manager = new ShardingManager('./src/bot', config.bot.shardingOptions)

	manager.spawn()
	manager.on('shardCreate', async (shard) => {
		logger.debug(`Shard #${shard.id} created.`)
	})
}