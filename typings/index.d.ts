import BotClient from '@client'
import { SlashCommandBuilder } from '@discordjs/builders'
import { RESTPostAPIApplicationCommandsJSONBody } from 'discord-api-types'
import {
	ClientEvents,
	ClientOptions,
	CommandInteraction,
	Message,
	MessageEmbed,
	ShardingManagerOptions,
} from 'discord.js'
import { MongooseOptions, Types as mongoTypes } from 'mongoose'
export interface loggerDB {
  _id: mongoTypes.ObjectId
  guild_id: string
  guild_channel_id: string
  useing: logger
  published_date?: Date
}

export interface logger {
  memberJoin?: boolean
  memberLeft?: boolean
  memberKick?: boolean
  memberBan?: boolean
  deleteMessage?: boolean
  editMessage?: boolean
  reactMessage?: boolean
  createChannel?: boolean
  deleteChannel?: boolean
  editChannel?: boolean
  joinVoiceChannel?: boolean
  leaveVoiceChannel?: boolean
}

export interface TicketUser {
  _id: mongoTypes.ObjectId
  status: string
  guildId: string
  userId: string
  ticketId: string
  channelId: string
  published_date?: Date
  messages: TicketMessage[]
}

export interface TicketMessage {
  author: object | string
  created: Date
  messages: string
  embed: MessageEmbed
}

export interface ticketSttingDB {
  _id: mongoTypes.ObjectId
  categories: string
  guildId: string
  published_date?: Date
}

export interface warning {
  _id: mongoTypes.ObjectId
  reason: string
  guildId: string
  userId: string
  managerId: string
  published_date?: Date
}

export type colorType =
  | 'fatal'
  | 'error'
  | 'warn'
  | 'info'
  | 'chat'
  | 'verbose'
  | 'debug'

export interface SlashCommand {
  name: string
  description?: string
  isSlash: boolean
  data: RESTPostAPIApplicationCommandsJSONBody
  execute: (
    client: BotClient,
    interaction: CommandInteraction
  ) => Promise<void | any>
}

export interface Command {
  
  slash?: SlashCommand
}

export interface MessageCommand {
  name: string
  description?: string
  usage?: string
  aliases: string[]
  isSlash?: boolean
  execute: (
    client: BotClient,
    message: Message,
    args: string[]
  ) => Promise<void | any>
}

export interface Event {
  name: string
  once?: boolean
  execute: (client: BotClient, ...args: any[]) => Promise<void | any>
}
export type EmbedType = 'success' | 'error' | 'warn' | 'info' | 'default'

export type ErrorReportType = 'webhook'|'text'

export interface config {
  BUILD_NUMBER: string
  BUILD_VERSION: string
  githubToken: string
  web: {
    baseurl: string
  }
  bot: {
    sharding: boolean
    shardingOptions?: ShardingManagerOptions
    token: string
    options: ClientOptions
    prefix: string
    owners: string[]
    cooldown: number
  }
  database: {
    type: 'mongodb' | 'sqlite'
    url?: string
    options?: any
  }
  logger: {
    dev: boolean
    level: colorType
  }
  report: {
    type: ErrorReportType
    webhook?: {
      url: string
    }
    text?: {
      guildID: string
      channelID: string
    }
  }
}

export interface ErrorExecuter {
  executer: Message|CommandInteraction|any
  userSend?: boolean
}

export interface GithubCommitAPI {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    committer: {
      name: string
      email: string
      date: string
    }
    message: string
    tree: {
      sha: string
      url: string
    }
    url: string
    comment_count: number
    verification: {
      verified: boolean
      reason: string
      signature: null
      payload: null
    }
  }
  url: string
  html_url: string
  comments_url: string
  author: {
    login: string
    id: number
    node_id: string
    avatar_url: string
    gravatar_id: string
    url: string
    html_url: string
    followers_url: string
    following_url: string
    gists_url: string
    starred_url: string
    subscriptions_url: string
    organizations_url: string
    repos_url: string
    events_url: string
    received_events_url: string
    type: string
    site_admin: boolean
  }
}
