import Logger from '@utils/Logger'
import BaseManager from './BaseManager'
import mongoose from 'mongoose'
import quick from 'quick.db'
import path from 'path'
import fs from 'fs'
import BotClient from '@client'

export default class DatabaseManager extends BaseManager {
	private logger: Logger
	readonly type: 'mongodb'|'sqlite'

	constructor (client: BotClient) {
		super(client)

		this.logger = new Logger('DatabaseManager')
		this.type = client.config.database.type
	}
  

	async load(schemaPath = path.join(__dirname, '../schemas')) {
		switch (this.type) {
		case 'mongodb': {
			this.logger.debug('Using MongoDB...')
			const database = await mongoose.connect(this.client.config.database.url, this.client.config.database.options)

			this.client.db = database
			this.logger.info('Succesfully connected to MongoDB.')
  
			break
		}
		default:
			return this.logger.error('Invalid database type:' + this.type)
		}

		this.loadSchemas(schemaPath)
	}

	loadSchemas(schemaPath: string) {
		this.logger.debug('Loading schemas...')

		const schemaFolder = fs.readdirSync(schemaPath)

		try {
			schemaFolder.forEach(schemaFile => {
				try {
					if(schemaFile.startsWith('example')) return
					if(!schemaFile.endsWith('.ts')) return this.logger.warn(`Not a TypeScript file ${schemaFile}. Skipping.`)

					const schema = import(`../schemas/${schemaFile}`)

					this.client.schemas.set(schema.modelName, schema)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				} catch (error: any) {
					this.logger.error(`Error loading schema ${schemaFile}.\n` + error.stack)
				} finally {
					this.logger.debug(`Succesfully loaded schemas. count: ${this.client.schemas.size}`)
				}
			})
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			this.logger.error('Error fetching folder list.\n' + error.stack)
		}
	}
}