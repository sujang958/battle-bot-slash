import BotClient from '@client'
import { SlashCommandBuilder } from '@discordjs/builders'
import {
	ClientEvents,
	CommandInteraction,
	MessageEmbed,
} from 'discord.js'
import { Types as mongoTypes } from 'mongoose'
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

export interface Command {
  name: string
  description?: string
  usage?: string
  aliases: string[]
  isSlash?: boolean
  data?: SlashCommandBuilder
  execute: (
    client: BotClient,
    interaction?: CommandInteraction,
    message?: Message,
    args?: string[]
  ) => Promise<void | any>
  slash?: {
    name: string
    description?: string
    data: SlashCommandBuilder
    execute: (
      client: BotClient,
      interaction: CommandInteraction
    ) => Promise<void | any>
  }
}

export interface Event {
  name: ClientEvents
  once?: boolean
  execute: (client: BotClient, ...args: any[]) => Promise<void | any>
}
export type EmbedType = 'success' | 'error' | 'warn' | 'info' | 'default'
