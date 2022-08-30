import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  manyToMany,
  ManyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Order from './Order'
import User from './User'

export default class Table extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public floor: number

  @column()
  public hall: string

  @column()
  public type: number

  @column()
  public status: number

  @column()
  public name: string

  @belongsTo(() => Order, {
    foreignKey: 'order_id',
  })
  public orders: BelongsTo<typeof Order>

  @manyToMany(() => User, {
    pivotTable: 'users_tables',
  })
  public users: ManyToMany<typeof User>

  @manyToMany(() => Order, {
    pivotTable: 'tables_orders',
  })
  public orderss: ManyToMany<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async listing() {
    const query = await Order.query()
      .preload('table', (query) => {
        query.preload('users', (query) => {
          query.select('id', 'name', 'role_id')
          query.preload('role', (query) => {
            query.select('id', 'name')
          })
        })
      })
      .preload('meta_order', (query) => {
        query.preload('menus')
      })
      .where('order_type', 1)
      .where('payment_status', 'INPROGRESS')
      .orWhere('payment_status', 'PENDING')

    return query
  }
}
