import { Client, ClientOptions, Collection } from 'discord.js'
import Dokdo from 'dokdo'
import Logger from '../utils/Logger'
import { config } from 'dotenv'
import { Command, Event as EventInterface } from '@types'

import CommandManager from '../managers/CommandManager'
import EventManager from '../managers/EventManager'
import DatabaseManager from '../managers/DatabaseManager'
import ButtonManager from '../managers/ButtonManager'
import { Mongoose } from 'mongoose'

const logger = new Logger('bot')

export default class BotClient extends Client {
	public events: Collection<string, EventInterface>
	public commands: Collection<string, Command>
	public categorys: Collection<string, string[]>
	public buttons: Collection<string, unknown>
	public errors: Collection<string, string>
	public dokdo: Dokdo
	public db: Mongoose | any
	public schemas: Collection<string, any> // TODO: mongoose Model
	public command: CommandManager
	public button: any
	public event: EventManager
	public database: DatabaseManager

	public readonly VERSION: string
	public readonly BUILD_NUMBER: string
	public readonly config: any
	public readonly _maxListeners: number

	constructor(
		options: ClientOptions = {
			//parse: ["users", "roles"],
			//repliedUser: false,
			intents: [],
		}
	) {
		super(options)

		config()
		this.config = require('../../config')

		this.VERSION = this.config.BUILD_VERSION
		this.BUILD_NUMBER = this.config.BUILD_NUMBER

		this.commands = new Collection()
		this.categorys = new Collection()
		this.buttons = new Collection()
		this.events = new Collection()
		this.errors = new Collection()

		this.dokdo = new Dokdo(this, {
			prefix: this.config.bot.prefix,
			owners: this.config.bot.owners,
			noPerm: (message) => message.reply('당신은 쓸수없음'),
		})
		this.db
		this.schemas = new Collection()

		this.command = new CommandManager(this)
		this.button = new ButtonManager(this)
		this.event = new EventManager(this)
		this.database = new DatabaseManager(this)

		this._maxListeners = Infinity
	}

	/**
   * Loggin in the bot
   * @param {string} token Discord bot token
   */
	public async start(token: string = process.env.TOKEN as string) {
		logger.info('Logging in bot...')

		this.command.load()
		this.button.load()
		this.event.load()
		this.database.load()
		await this.login(token)
	}

	/**
   * Setting status
   * @param {'dev'|'online'} status
   */
	public async setStatus(
		status: 'dev' | 'online' = 'online',
		name = '점검중...'
	) {
		if (status.includes('dev')) {
			logger.warn('Changed status to Developent mode')

			this.user?.setPresence({
				activities: [
					{
						name: `${this.config.bot.prefix}help | ${this.VERSION}@${this.BUILD_NUMBER} : ${name}`,
					},
				],
				status: 'dnd',
			})
		} else if (status.includes('online')) {
			logger.info('Changed status to Online mode')

			this.user?.setPresence({
				activities: [
					{
						name: `${this.config.bot.prefix}help | ${this.VERSION}@${this.BUILD_NUMBER}`,
					},
				],
				status: 'online',
			})
		}
	}
}
