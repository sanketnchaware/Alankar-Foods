import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
     
       table.string('name').notNullable()
       table.string('email').notNullable()
       table.string('phone').notNullable()
       table.string('address').notNullable()
       table.string('gst_no').notNullable()
       table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
