import {  Schema, model, models, Model } from "mongoose"
import { warning } from "@types"

const warningSchema: Schema<warning> = new Schema({
  userId: { type: String, default: '' },
  guildId: { type: String, default: '' },
  reason: { type: String, default: '' },
  managerId: { type: String, default: '' },
  published_date: { type: Date, default: Date.now }
})

const Warning: Model<warning> = models.warning || model('warning', warningSchema, 'warning')

export default Warning
