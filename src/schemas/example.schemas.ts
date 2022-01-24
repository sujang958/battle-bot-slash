import { Schema, model, models, Model } from 'mongoose'
import { ticketSttingDB } from '@types'

const exampleSchema: Schema = new Schema({
  guildId: String,
  channelId: String,
  published_date: { type: Date, default: Date.now }
})

const example = models.example ||model('example', exampleSchema, 'example');

export default example;
