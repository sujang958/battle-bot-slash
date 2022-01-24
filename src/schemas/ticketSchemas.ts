import {  Schema, model, models, Model } from "mongoose"
import { TicketUser } from "@types"

const ticketSchema: Schema<TicketUser> = new Schema({
  status: String,
  guildId: String,
  channelId: String,
  userId: String,
  ticketId: String,
  messages: Array,
  published_date: { type: Date, default: Date.now }
})

const Ticket: Model<TicketUser> = models.ticket || model('ticket', ticketSchema, 'ticket')

export default Ticket
