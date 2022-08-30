import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TablesOrders extends BaseSchema {
  protected tableName = 'tables_orders'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('table_id').unsigned().references('tables.id').onDelete('CASCADE').notNullable()
      table.integer('order_id').unsigned().references('orders.id').onDelete('CASCADE').notNullable()

     
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
