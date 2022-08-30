import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Coupons extends BaseSchema {
  protected tableName = 'coupons'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('code').notNullable().unique()
      table.string('percent').notNullable()
      table.string('value').notNullable()
      table.boolean('status').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamps(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
