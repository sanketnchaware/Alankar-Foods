import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import moment from 'moment'

export default class Coupon extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public code: string

  @column()
  public percent: string

  @column()
  public value: string

  @column()
  public status: boolean

  @column()
  public expires_at: Date

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static async listing(request) {
    const { search_key = '' } = request.qs()
    let query = this.query()

    if (search_key) {
      query = query.where('code', 'LIKE', `%${search_key}%`)
    }
    return query
      .select('id', 'code', 'percent', 'status', 'expires_at', 'value')
      .orderBy('id', 'desc')
  }

  public static async checkCoupon(request, response) {
    const { code } = request.qs()
    const coupon = await Coupon.query().where('code', code).first()
    if (coupon === null) {
      return { message: 'coupon not found' }
    } 
    else {
      if (coupon?.status) {
        const Coupon_date = moment(coupon.expires_at).format('YYYY-MM-DD')
        const current_date = moment().format('YYYY-MM-DD')
        if (Coupon_date >= current_date) {
          if (coupon.percent === 'percentage') {
            let Discount_percent = coupon.value
            return { percentage: Discount_percent }
          } else {
            let Discount_value = coupon.value
            return { value: Discount_value }
          }
        } else {
          return response.badRequest({ message: 'Coupon Expired' })
        }
      } else return { message: 'coupon not found' }
    }
  }
}
