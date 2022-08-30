import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menu extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('time',225)
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('time')
    })
  }
}
