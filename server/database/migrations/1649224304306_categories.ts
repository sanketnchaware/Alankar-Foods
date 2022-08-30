import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Categories extends BaseSchema {
  protected tableName = 'categories'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 60).notNullable()
      table.string('image', 255)
      table.boolean('status').defaultTo(true)
      table.integer('parent_id').unsigned().references('id').inTable('categories')
      table.string('gst').nullable()
      table.string('slug').notNullable()
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
