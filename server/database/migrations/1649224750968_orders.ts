import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Orders extends BaseSchema {
  protected tableName = 'orders'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 100).defaultTo('CUSTOMER')
      table.string('email', 225)
      table.string('phone', 15)
      table.integer('total_persons', 10).defaultTo(0).unsigned()
      table.date('date_of_occassion')
      table.float('advance_received', 8, 2)
      table.string('occassion').nullable()
      /**
       * To Order Type this shall concern,
       * 1. Dine In
       * 2. Take Away
       * 3. Party Order
       */
      table.enum('order_type', [1, 2, 3]).defaultTo(1)

      table.string('bill_no').notNullable()
      table.string('payment_status').defaultTo('PENDING')
      table.float('tax', 8, 2).notNullable().unsigned()
      table.float('sub_toal', 8, 2).notNullable().unsigned()
      table.float('total', 8, 2).notNullable().unsigned()
      table.date('delivery_date')
      table.text('instructions')
      
      table.integer('table_id').references('id').inTable('tables').unsigned()
      table.timestamps(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
