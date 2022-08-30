import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public address: string

  @column()
  public gst_no: string

  @column()
  public gst: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async listing() {
    let query = this.query()
    query = query.select('id', 'name','address','phone','email','gst','gst_no')
    return query
  }

  public static async gstFromStore() {
    try {
      const gst = await Store.query().select('gst')
      return parseInt(gst[0].gst)
    } catch (err) {
      return false
    }
  }
}
