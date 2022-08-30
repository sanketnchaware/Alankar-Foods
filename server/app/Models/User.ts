import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeSave,
  BelongsTo,
  belongsTo,
  column,
  ManyToMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Hash from '@ioc:Adonis/Core/Hash'
import Table from './Table'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column({ serializeAs: null })
  public password: string

  @column()
  public name: string

  @column()
  public email: string

  @column()
  public phone: string

  @column()
  public image: string

  @column()
  public role_id: number

  @column()
  public shift: string

  @column({
    prepare: (value: boolean) => Number(value),
    serialize: (value: number) => Boolean(value),
  })
  public status: boolean

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public role: BelongsTo<typeof Role>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @manyToMany(() => Table, {
    pivotTable: 'users_tables',
  })
  public tables: ManyToMany<typeof Table>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  static listing(request) {
    const {
      page = 1,
      search_key = '',
      status = '',
      created_from = '',
      created_to = '',
    } = request.qs()
    const limit = 10
    let query = this.query()

    if (status != '') {
      query = query.where('status', '=', status == 'true' ? 1 : 0)
    }

    if (created_from && created_to) {
      query = query.where('created_at', '>=', created_from).where('created_at', '<=', created_to)
    }

    if (search_key) {
      query = query
        .where('name', 'LIKE', `%${search_key}%`)
        .orWhere('phone', 'LIKE', `%${search_key}%`)
        .orWhere('email', 'LIKE', `%${search_key}%`)
    }

    return query
      .select('id', 'name', 'created_at', 'email', 'phone', 'status', 'role_id')
      .preload('tables')
      .orderBy('id', 'desc')
      .preload('role')
      .paginate(page, limit)
  }

  public static async staffReports(queryString: Record<string, any>) {
    let searchKey = queryString.searchKey
    let from = queryString.from
    let to = queryString.to

    let start = moment(from).utcOffset('+05:30').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(to).utcOffset('+05:30').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    let query = Database.from('users as user')
      .join('orders as order', 'user.id', '=', 'order.user_id')
      .join('roles as role', 'role.id', '=', 'user.role_id')
      .groupBy('user.id')
      .select('user.id', 'user.name', 'user.role_id', 'user.shift')
      .select('role.name as role')
      .count('order.id as total')
      .where('order.payment_status', '=', 'PAID')

    if (searchKey) {
      query = query.andWhere('user.id', '=', `${searchKey}`)
    }

    if (from && to) {
      query = query.where('order.created_at', '>=', start).where('order.created_at', '<=', end)
    }

    return query
  }
}
