import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.boolean('status').notNullable().defaultTo(true)

    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('status')

    })
  }
}
