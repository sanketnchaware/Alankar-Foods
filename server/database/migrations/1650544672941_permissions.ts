import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Permissions extends BaseSchema {
  protected tableName = 'permissions'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.integer('role').notNullable().references('id').inTable('roles').unsigned().onDelete('CASCADE')
      table.json('permissions').nullable()
      table.timestamps(false)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
