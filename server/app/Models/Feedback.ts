import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'

export default class Feedback extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rating: string

  @column()
  public comment: string

  @column()
  public cleanliness: string

  @column()
  public service: string

  @column()
  public order_id: number

  @belongsTo(() => Order, {
    foreignKey: 'order_id',
  })
  public order: BelongsTo<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static async listing(request) {
    const searchkey = request.qs().searchkey
    const from = request.qs().from
    const to = request.qs().to
    let start = moment(from).utcOffset('+05:30').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(to).utcOffset('+05:30').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    let query = Database.from('feedbacks as fs')
      .leftJoin('orders as o', 'o.id', '=', 'fs.order_id')
      .leftJoin('users as u', 'u.id', '=', 'o.user_id')
      .select('o.name as customername', 'o.phone as phone', 'o.id as order_id')
      .select('fs.*')
      .select('u.name as waiter')

    if (searchkey) {
      query.andWhere('o.name', 'like', `%${searchkey}%`)
    }

    if (from && to) {
      query.where('fs.created_at', '>=', start).where('fs.created_at', '<=', end)
    }

    return query
  }

  public static async FeedBackCount() {
    let query = Database.from('feedbacks as feedback')
      .count('id as feedback')
      .whereRaw(`DAY(feedback.created_at) = DAY(CURRENT_DATE())`)
    return query
  }

  public static async FeedBackStats() {
    return await Database.from('feedbacks as feedback')
      .count('feedback.id as feedbackcount')
      .avg('feedback.rating as rating')
      .avg('feedback.cleanliness as cleanliness')
      .avg('feedback.service as service')
  }
}
