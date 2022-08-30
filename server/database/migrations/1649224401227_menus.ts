import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 225).notNullable()
      table.string('image')
      table.float('price', 8, 2).notNullable()
      table.float('dinein_price', 8, 2).notNullable()
      table.float('takeaway_price', 8, 2).notNullable()
      table.json('meal_type')
      table.integer('availability_count').notNullable().defaultTo(0)
      table
        .integer('category_id')
        .unsigned()
        .references('categories.id')
        .onDelete('CASCADE')
        .notNullable()
      table.integer('sub_category_id').unsigned().references('categories.id').onDelete('CASCADE')
      table.timestamps(false)
        
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
