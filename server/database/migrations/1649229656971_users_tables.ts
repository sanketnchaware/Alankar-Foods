import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UsersTables extends BaseSchema {
  protected tableName = 'users_tables'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE').notNullable()
      table.integer('table_id').unsigned().references('tables.id').onDelete('CASCADE').notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
