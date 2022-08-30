import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  belongsTo,
  column,
  HasMany,
  hasMany,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import MetaOrder from './MetaOrder'
import Table from './Table'
import User from './User'
import Database from '@ioc:Adonis/Lucid/Database'
import moment from 'moment'
import Menu from './Menu'

export default class Order extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public order_type: number

  @column()
  public total_persons: number

  @column()
  public date_of_occassion: string

  @column()
  public advance_received: string

  @column()
  public occassion: string

  @column()
  public bill_no: string

  @column()
  public payment_status: string

  @column()
  public tax: string

  @column()
  public sub_toal: string

  @column()
  public total: string

  @column()
  public delivery_date: string

  @column()
  public instructions: string

  @column()
  public table_id: number

  @column()
  public discount: string

  @column()
  public user_id: number

  @column()
  public pending: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => MetaOrder, {
    foreignKey: 'order_id',
  })
  public meta_order: HasMany<typeof MetaOrder>

  @belongsTo(() => Table, {
    foreignKey: 'table_id',
  })
  public table: BelongsTo<typeof Table>

  @manyToMany(() => Table, {
    pivotTable: 'tables_orders',
  })
  public tables: ManyToMany<typeof Table>

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public users: BelongsTo<typeof User>

  static async listing(request) {
    const { page = 1, search_key = '' } = request.qs()
    const limit = 10
    let query = this.query()

    if (search_key) {
      query = query.where('name', 'LIKE', `%${search_key}%`).orWhere('id', '=', `${search_key}`)
    }

    return query
      .preload('meta_order', (query) => {
        query.select(
          'id',
          'order_id',
          'category_id',
          'quantity',
          'price',
          'status',
          'created_at',
          'updated_at'
        )
      })
      .orderBy('id', 'desc')
      .preload('table', (query) => {
        query.preload('users', (query) => {
          query.preload('role')
        })
      })
      .where('order_type', '=', 1)
      .where('payment_status', 'PAID')
      .paginate(page, limit)
  }

  public static async dashboard(queryString: Record<string, any>) {
    let order_type = queryString.order_type
    let query = Database.from('orders as order')
      .where('payment_status', '=', 'PAID')
      .select(
        Database.raw(
          `sum(case when DAY(created_at) = DAY(CURRENT_DATE())  then total else 0 end) as todays`
        )
      )
      .select(
        Database.raw(
          `sum(case when WEEK(created_at) = WEEK(CURRENT_DATE()) then total else 0 end) as weeks`
        )
      )
      .select(
        Database.raw(
          `sum(case when MONTH(created_at) = MONTH(CURRENT_DATE()) then total else 0 end) as months`
        )
      )

    if (order_type) {
      query = query.where('order.order_type', '=', order_type)
    }
    return query
  }

  public static async pastOrder(request) {
    let { from, to, page, order_type, key } = request.qs()
    let query = this.query()
    console.log(order_type)

    if (key) {
      query = query
        .where('name', 'LIKE', `%${key}%`)
        .andWhere('order_type', '=', order_type)
        .orWhere('id', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('phone', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('email', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('bill_no', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
    }

    if (from && to) {
      query = query
        .andWhere('created_at', '>=', moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss'))
        .where('created_at', '<=', moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss'))
    }

    return query
      .preload('table')
      .preload('meta_order', (query) => {
        query.preload('menus')
      })
      .andWhere('order_type', order_type)
      .where('payment_status', '=', 'PAID')
      .orderBy('id', 'desc')
      .paginate(page, 10)
  }

  public static async takeAway(request) {
    const { order_type, from, to, key, page } = request.qs()

    let query = this.query()

    if (order_type && key) {
      query = query
        .where('name', 'LIKE', `%${key}%`)
        .andWhere('order_type', '=', order_type)
        .orWhere('id', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('phone', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('email', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
        .orWhere('bill_no', '=', `${key}`)
        .andWhere('order_type', '=', order_type)
    }

    if (order_type && from && to) {
      query = query
        .where('created_at', '>=', moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss'))
        .where('created_at', '<=', moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss'))
        .where('order_type', order_type)
    }

    return query
      .preload('table')
      .preload('meta_order', (query) => {
        query.preload('menus')
      })
      .where('order_type', order_type)
      .orderBy('id', 'desc')
      .paginate(page, 10)
  }

  public static async updateMenuAvaliabilityCount(item) {
    const menu = await Menu.query().where('id', item.menu_id)
    const availability_count = menu[0].availability_count
    if (availability_count > 0) {
      const new_availability_count = availability_count - item.quantity
      await Menu.query().where('id', item.menu_id).update({
        availability_count: new_availability_count,
      })
    } else {
      await Menu.query().where('id', item.menu_id).update({ availability_count: 0 })
    }
  }

  public static updateMenuAvaliabilityCountPlus = async (item) => {
    const menu = await Menu.findByOrFail('id', item.menu_id)
    const meta = await MetaOrder.findByOrFail('id', item.id)
    menu.availability_count = menu.availability_count + Number(meta?.quantity)
    await menu.save()
  }

  public static async graphStats(request) {
    let { order_type, date } = request.qs()
    let query = Database.from('orders as order')
      .select(Database.raw(`DATE_FORMAT(created_at,'%h%p') as time,sum(total) as total`))
      .groupBy('time')
      .orderBy('time')
      .where('payment_status', '=', 'PAID')
      .whereRaw(`CAST(created_at as Date) = '${date}'`)

    if (order_type) {
      query = query.where('order.order_type', '=', order_type)
    }

    return query
  }

  public static async graphStatsRange(request) {
    let { order_type, from, to } = request.qs()
    let query = Database.from('orders as order')
      .select(Database.raw(`DATE_FORMAT(created_at,'%d-%m-%Y') as time,sum(total) as total`))
      .groupBy('time')
      .orderBy('time')
      .where('payment_status', '=', 'PAID')
      .where('created_at', '>=', moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss'))
      .where('created_at', '<=', moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss'))

    if (order_type) {
      query = query.where('order.order_type', '=', order_type)
    }

    return query
  }

  public static async Stats(queryString: Record<string, any>) {
    let order_type = queryString.order_type
    let query = Database.from('orders as order')
      .count('id as order')
      .whereRaw(`DAY(order.created_at) = DAY(CURRENT_DATE()) `)

    if (order_type) {
      query = query.where('order.order_type', '=', order_type)
    }
    return query
  }

  
}
