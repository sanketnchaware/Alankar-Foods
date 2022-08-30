import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Kds extends BaseSchema {
  protected tableName = 'kds'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.string('name').notNullable()
      table.string('image')
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
