import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
  protected tableName = 'roles'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('slug', 100).notNullable().unique()
      table.string('name', 100).notNullable().unique()
      table.timestamps(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
