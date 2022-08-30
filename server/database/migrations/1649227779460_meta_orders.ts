import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class MetaOrders extends BaseSchema {
  protected tableName = 'meta_orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('menu_id').references('menus.id').unsigned()
      table.integer('category_id').references('categories.id').unsigned()
      table.integer('quantity').notNullable().unsigned()
      table.string('price').notNullable()
      table.string('gst').notNullable()
      table.integer('order_id').references('orders.id').unsigned()
      table.integer('status').defaultTo(1)
      table.timestamps(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
