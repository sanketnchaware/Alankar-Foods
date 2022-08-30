import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.string('email', 225).notNullable().unique()
      table.string('phone', 20)
      table.string('image', 255)
      table.string('password', 500).notNullable()
      table.boolean('status').defaultTo(1)
      table.integer('role_id').unsigned().references('id').inTable('roles')
      table.timestamps()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
