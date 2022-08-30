import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Feedbacks extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('rating')
      table.string('comment')
      table.integer('order_id').references('orders.id').unsigned()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
