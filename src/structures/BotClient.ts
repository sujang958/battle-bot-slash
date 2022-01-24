import { Client, Collection } from "discord.js"
import Dokdo from 'dokdo'
import Logger from '../utils/Logger'
import { config } from "dotenv"
import { BotClient as ClientTypes } from "@types"

import CommandManager from '../managers/CommandManager'
import EventManager from '../managers/EventManager'
import DatabaseManager from '../managers/DatabaseManager'
import ButtonManager from '../managers/ButtonManager'

const logger = new Logger('bot')

/**
 * @typedef {Object} Command
 * @typedef {Object} Button
 * @property {string} name
 * @property {string} description
 * @property {string} usage
 * @property {string[]} aliases
 * @property {boolean} [isSlash]
 * @property {import('@discordjs/builders').SlashCommandBuilder} [data]
 * @property {void} execute
 * @property {Object} [slash]
 * @property {string} slash.name
 * @property {string} slash.description
 * @property {import('@discordjs/builders').SlashCommandBuilder} slash.data
 * @property {void} slash.execute
 */

/**
 * @typedef {Object} Event
 * @property {string} name
 * @property {boolean} [once]
 * @property {void} execute
 */

/**
 * @typedef {string} Error
 */

export default class BotClient extends Client {
  public events: Collection<string, void>
  public commands: Collection<string, Command>
  public readonly VERSION: string
  public readonly BUILD_NUMBER: string
  public readonly config: any
  constructor(options: import('discord.js').ClientOptions = { parse: ['users', 'roles'], repliedUser: false }) {
    super(options)

    config()
    this.config = require('../../config')
    
    this.VERSION = this.config.BUILD_VERSION
    this.BUILD_NUMBER = this.config.BUILD_NUMBER
    
    /**
     * @type {Collection<string, Command>}
     */
    this.commands = new Collection()

    /**
     * @type {Collection<string, string[]>}
     */
    this.categorys = new Collection()

    /**
     * @type {Collection<string, Button>}
     */
    this.buttons = new Collection()

    /**
     * @type {Collection<string, Event>}
     */
    this.events = new Collection()
    
    /**
     * @type {Collection<string, Error>}
     */
    this.errors = new Collection()
    
    /**
     * @type {Dokdo}
     */
    this.dokdo = new Dokdo(this, { prefix: this.config.bot.prefix, owners: this.config.bot.owners })
    
    /**
     * @type {import('mongoose')|import('quick.db')}
     */
    this.db
    /**
     * @type {Collection<string, import('mongoose').Model>}
     */
    this.schemas = new Collection()
    
    this._maxListeners = Infinity

    /**
     * @type {CommandManager}
     */
    this.command = new CommandManager(this)

    /**
     * @type {ButtonManager}
     */
    this.button = new ButtonManager(this)
  
    /**
     * @type {EventManager}
     */
    this.event = new EventManager(this)
  
    /**
     * @type {DatabaseManager}
     */
    this.database = new DatabaseManager(this)
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
  public async setStatus(status: 'dev' | 'online' = 'online', name = '점검중...') {
    if(status.includes('dev')) {
      logger.warn('Changed status to Developent mode')

      this.user?.setPresence({
        activities: [
          { name: `${this.config.bot.prefix}help | ${this.VERSION}@${this.BUILD_NUMBER} : ${name}` }
        ], 
        status: 'dnd'
      })
    } else if(status.includes('online')) {
      logger.info('Changed status to Online mode')
      
      this.user?.setPresence({
        activities: [
          { name: `${this.config.bot.prefix}help | ${this.VERSION}@${this.BUILD_NUMBER}` }
        ],
        status: 'online'
      })
    }
  }

}