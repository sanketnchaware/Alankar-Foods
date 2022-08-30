import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'
import Kd from './Kd'
import moment from 'moment'
import Database from '@ioc:Adonis/Lucid/Database'

export default class Menu extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public image: string

  @column()
  public price: string

  @column()
  public dinein_price: string

  @column()
  public takeaway_price: string

  @column({
    prepare: (value: boolean) => Number(value),
    serialize: (value: number) => Boolean(value),
  })
  public status: boolean

  @column()
  public gst: string

  @column()
  public availability_count: number

  @column()
  public category_id: number

  @column()
  public sub_category_id: number
  @column({
    prepare: (value: string) => JSON.stringify(value),
    serialize: (value: string) => {
      return value ? JSON.parse(value) : []
    },
  })
  @column()
  public time: string

  @column({
    prepare: (value: string) => JSON.stringify(value),
    serialize: (value: string) => {
      return value ? JSON.parse(value) : []
    },
  })
  public meal_type: any

  @column()
  public kds_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Kd, {
    foreignKey: 'kds_id',
  })
  public kd: BelongsTo<typeof Kd>

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  public category: BelongsTo<typeof Category>

  @belongsTo(() => Category, {
    foreignKey: 'sub_category_id',
  })
  public sub_category: BelongsTo<typeof Category>

  static async listing(request) {
    const { page = 1, search_key = '' } = request.qs()

    const limit = 10
    let query = this.query()

    if (search_key) {
      query = query.where('name', 'LIKE', `%${search_key.trim()}%`)
    }

    return query
      .preload('category', (query) => {
        query.select('name', 'gst')
      })
      .select(
        'id',
        'meal_type',
        'name',
        'dinein_price',
        'takeaway_price',
        'image',
        'time',
        'availability_count',
        'status',
        'category_id',
        'sub_category_id',
        'kds_id'
      )
      .where('status', true)
      .preload('kd')
      .preload('category')
      .orderBy('availability_count', 'desc')
      .paginate(page, limit)
  }

  public static async reports(queryString: Record<string, any>) {
    let order_type = queryString.order_type
    let from = queryString.from
    let to = queryString.to
    let start = moment(from).utcOffset('+05:30').startOf('day').format('YYYY-MM-DD HH:mm:ss')
    let end = moment(to).utcOffset('+05:30').endOf('day').format('YYYY-MM-DD HH:mm:ss')

    let query = Database.from('menus as menu')
      .innerJoin('meta_orders as meta', 'meta.menu_id', '=', 'menu.id')
      .innerJoin('orders as order', 'meta.order_id', '=', 'order.id')
      .select('menu.name')
      .sum('meta.quantity as quantity')
      .select(Database.raw(`sum(meta.quantity * meta.price) as price`))
      .groupBy('menu.id')
      .where('order.payment_status', '=', 'PAID')
      .orderBy('price', 'desc')

    if (order_type) {
      query = query.andWhere('order.order_type', '=', order_type)
    }

    if (from && to) {
      query = query.where('order.created_at', '>=', start).where('order.created_at', '<=', end)
    }
    return query
  }

  public static async menuByCategoryandKdsId(request) {
    const { page, category, kds, key } = request.qs()
    let query = this.query()

    if (kds) {
      query = query.where('kds_id', kds)
    }

    if (category) {
      query = query.where('category_id', category)
    }

    if (key) {
      query = query.where('name', 'like', `%${key}%`)
    }

    return query.preload('category').preload('kd').orderBy('id', 'desc').paginate(page, 10)
  }

  public static async menuCategory(mealTypeString) {
    const data = await Database.rawQuery(`
    SELECT categories.name as name , categories.id as id , categories.image as image from categories 
    INNER JOIN 
    menus ON
    menus.category_id = categories.id WHERE
    JSON_CONTAINS(menus.meal_type,'"${mealTypeString}"') AND categories.status = 1
    `)
    return data
    let query = Database.from('categories as category')
      .join('menus as menu', 'menu.category_id', '=', 'category.id')
      .select('category.name', 'category.id')
      .whereRaw(`JSON_CONTAINS(menu.meal_type,'"${mealTypeString}"')`)
    return query
  }

  public static async menuListing(id, mealTypeString) {
    const data = await Database.rawQuery(`
      SELECT categories.name as name , categories.id as id from categories 
      INNER JOIN 
      menus ON
      menus.sub_category_id = categories.id WHERE
      JSON_CONTAINS(menus.meal_type,'"${mealTypeString}"') AND categories.parent_id = ${id} 
      `)
    return data
  }

  public static async menuSearch(request, mealTypeString) {
    let { sub_category, search_key } = request.qs()

    let query = Database.from('menus as menu')
      .where('status', '=', 1)
      .whereRaw(`JSON_CONTAINS(meal_type,'"${mealTypeString}"')`)
      .where('sub_category_id', '=', `${sub_category}`)

    if (search_key) {
      query = query.where('name', 'LIKE', `%${search_key}%`)
    }

    return query
  }

  public static async menuSearchOnCategory(request, mealTypeString) {
    let { category_id, search_key } = request.qs()
    let query = Database.from('menus as menu')
      .where('status', '=', 1)
      .whereRaw(`JSON_CONTAINS(meal_type,'"${mealTypeString}"')`)
      .where('name', 'LIKE', `%${search_key}%`)
    if (category_id) {
      query = query.where('category_id', '=', `${category_id}`)
    }

    return query
  }

  public static async searchMenuForOrder(request) {
    let { search_key, category } = request.qs()
    let query = this.query()

    if (search_key) {
      query = query.where('name', 'LIKE', `%${search_key.trim()}%`)
    }

    if (category) {
      query = query.where('category_id', '=', category)
    }

    return query.preload('category').where('status', 1)
  }
}
