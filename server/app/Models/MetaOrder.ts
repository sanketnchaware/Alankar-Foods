import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, computed } from '@ioc:Adonis/Lucid/Orm'
import Menu from './Menu'
import Order from './Order'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'
export default class MetaOrder extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @computed()
  public idd: number

  @column()
  public menu_id: number

  @column()
  public category_id: number

  @column()
  public order_id: number

  @column()
  public price: string

  @column()
  public gst: string

  @column()
  public quantity: string

  @column()
  public status: number

  @belongsTo(() => Menu, {
    foreignKey: 'menu_id',
  })
  public menus: BelongsTo<typeof Menu>

  @belongsTo(() => Order, {
    foreignKey: 'order_id',
  })
  public orders: BelongsTo<typeof Order>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static async listing(queryString: Record<string, any>) {
    let order_type = queryString.order_type
    let from = queryString.from
    let to = queryString.to
    let start = moment(from).utcOffset('+05:30').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(to).utcOffset('+05:30').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    let query = Database.from('meta_orders as meta')
      .join('orders as order', 'order.id', '=', 'meta.order_id')
      .sum('meta.quantity as quantity')
      .sum('order.sub_toal as total')
      .andWhere('order.payment_status', '=', 'PAID')

    if (order_type) {
      query = query
        .where('order.order_type', '=', order_type)
        .andWhere('order.payment_status', '=', 'PAID')
    }

    if (from && to) {
      query = query.where('order.created_at', '>=', start).where('order.created_at', '<=', end)
    }
    return query
  }

  public static async Stats(queryString: Record<string, any>) {
    let order_type = queryString.order_type
    let query = Database.from('meta_orders as meta')
      .join('orders as order', 'order.id', '=', 'meta.order_id')
      .where('order.payment_status', '=', 'PAID')
      .sum('meta.quantity as quantity')
      .whereRaw(`DAY(order.created_at) = DAY(CURRENT_DATE()) `)

    if (order_type) {
      query = query.where('order.order_type', '=', order_type)
    }
    return query
  }

  public static async listCount() {
    let date = moment().format('YYYY-MM-DD')
    return await MetaOrder.query().count('id as id').whereRaw(`date(created_at) = '${date}'`)
  }

  public static async CountCooking() {
    let date = moment().format('YYYY-MM-DD')
    let query = Database.from('meta_orders as meta')
      .select(Database.raw(`sum(case when meta.status = '2' then 1 else 0 end) as CountCooking`))
      .select(
        Database.raw(`sum(case when meta.status = '3' then 1 else 0 end) as CountReadytoServe`)
      )
      .select(Database.raw(`sum(case when meta.status = '4' then 1 else 0 end) as CountServed`))
      .whereRaw(`date(created_at) = '${date}'`)
    return query
  }

  static async status() {
    let query = this.query()

    query.preload('menus').paginate(1, 10)

    return query
  }

  public static async subTotal(request) {
    let { order_type, from, to } = request.qs()
    let start = moment(from).utcOffset('+05:30').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(to).utcOffset('+05:30').endOf('day').format('YYYY-MM-DD HH:mm:ss')
    let query = Database.from('orders as order')
      .sum('order.sub_toal as total')
      .andWhere('order.payment_status', '=', 'PAID')

    if (order_type) {
      query = query
        .where('order.order_type', '=', order_type)
        .andWhere('order.payment_status', '=', 'PAID')
    }

    if (from && to) {
      query = query.where('order.created_at', '>=', start).where('order.created_at', '<=', end)
    }
    return query
  }
}
