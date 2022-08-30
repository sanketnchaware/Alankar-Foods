import { DateTime } from 'luxon'
import { BaseModel, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Menu from './Menu'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public slug: string

  @column()
  public image: string

  @column({
    prepare: (value: boolean) => Number(value),
    serialize: (value: number) => Boolean(value),
  })
  public status: boolean

  @column()
  public gst: string

  @column()
  public parent_id: number

  @hasMany(()=>Menu,{
   foreignKey: 'category_id'
  })
  public menus : HasMany<typeof Menu>


  @hasMany(()=>Category,{
    foreignKey: 'parent_id'
   })
   public sub_categories : HasMany<typeof Category>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  static async listing(request) {
    const { page = 1, search_key = '' } = request.qs()
    
    const limit = 10
    let query = this.query()

    if (search_key) {
      query = query.where('name', 'LIKE', `%${search_key.trim()}%`)
    }

    return query
      .select('id', 'name', 'image', 'status', 'created_at')
      .whereNull('parent_id')
      .orderBy('id', 'desc')
      .paginate(page, limit)
  }
}
