import BotClient from '@client'

import Logger from '../utils/Logger'
import BaseManager from './BaseManager'
import fs from 'fs'
import path from 'path'
import { Command, SlashCommand } from '@types'
import { Collection, Snowflake } from 'discord.js'
import { SlashCommandBuilder } from '@discordjs/builders'

/**
 * @typedef {Object} executeOptions
 * @property {import('../structures/BotClient')} client
 * @property {import('discord.js').Message} message
 * @property {string[]} args
 */

/**
 * @extends {BaseManager}
 */
class CommandManager extends BaseManager {
	private logger: Logger
	private commands: Collection<string, Command>
	private categorys: BotClient['categorys']

	constructor(client: BotClient) {
		super(client)

		this.logger = new Logger('CommandManager')
		this.commands = client.commands
		this.categorys = client.categorys // TODO: categorys to categories
	}

	public async load(commandPath: string = path.join(__dirname, '../commands')) {
		this.logger.debug('Loading commands...')

		const commandFolder = fs.readdirSync(commandPath)

		try {
			commandFolder.forEach((folder) => {
				if (!fs.lstatSync(path.join(commandPath, folder)).isDirectory()) return
				this.categorys.set(folder, [])

				try {
					const commandFiles = fs.readdirSync(path.join(commandPath, folder))

					commandFiles.forEach((commandFile) => {
						try {
							if (!commandFile.endsWith('.js'))
								return this.logger.warn(
									`Not a Javascript file ${commandFile}. Skipping.`
								)

							const command = require(`../commands/${folder}/${commandFile}`)

							if (!command.name)
								return this.logger.debug(
									`Command ${commandFile} has no name. Skipping.`
								)

							this.commands.set(command.name, command)
							const categoryFolder = this.categorys.get(folder)
							if (categoryFolder) categoryFolder.push(command.name)
							else this.categorys.set(folder, [command.name])

							this.logger.debug(`Loaded command ${command.name}`)
						} catch (error: any) {
							this.logger.error(
								`Error loading command '${commandFile}'.\n` + error?.stack
							)
						} finally {
							this.logger.debug(
								`Succesfully loaded commands. count: ${this.commands.size}`
							)
						}
					})
				} catch (error: any) {
					this.logger.error(
						`Error loading command folder '${folder}'.\n` + error?.stack
					)
				}
			})
		} catch (error: any) {
			this.logger.error('Error fetching folder list.\n' + error?.stack)
		}
	}

	get(commandName: string): Command | Command[] | null {
		const returnCommand = this.client.commands.get(commandName)
		const commandList = this.client.commands.find(
			(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
		)
		if (returnCommand) return returnCommand
		else if (commandList) return commandList
		else return null
	}

	/**
   * reloading command
   * @param {string} commandPath
   * @return {string|Error}
   */
	reload(commandPath = path.join(__dirname, '../commands')) {
		this.logger.debug('Reloading commands...')
		this.commands.clear()
		this.load(commandPath).then(() => {
			this.logger.debug('Succesfully reloaded commands.')
			return '[200] Succesfully reloaded commands.'
		})
	}

	async slashCommandSetup(guildID: Snowflake): Promise<any> {
		this.logger.scope = 'CommandManager: SlashSetup'

		const slashCommands = []
		for (const command of this.client.commands) {
			if (command[1].isSlash || command[1].slash) {
				slashCommands.push(
					command[1].isSlash ? command[1].data : command[1].slash?.data
				)
			}
		}

		if (!guildID) {
			this.logger.warn('guildID not gived switching global command...')
			this.logger.debug(`Trying ${this.client.guilds.cache.size} guild(s)`)

			// Todo command set to create and delete
			this.client?.application.commands.set(slashCommands).then((x) => {
				this.logger.info(`Succesfully set ${x.size} guilds`)
			})
		} else {
			this.logger.info(`Slash Command requesting ${guildID}`)

			const guild = this.client.guilds.cache.get(guildID)

			await guild.commands.set(slashCommands)

			return slashCommands
		}
	}
}

export default CommandManager
