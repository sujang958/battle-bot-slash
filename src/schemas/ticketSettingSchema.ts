import { Schema, model, models, Model } from 'mongoose'
import { ticketSttingDB } from '@types'

const ticketSettingSchema: Schema<ticketSttingDB> = new Schema({
  guildId: String,
  categories: String,
  published_date: { type: Date, default: Date.now }
})

const TicketSetting: Model<ticketSttingDB> = models.ticketSetting ||model('ticketSetting', ticketSettingSchema, 'ticketSetting');

export default TicketSetting;
