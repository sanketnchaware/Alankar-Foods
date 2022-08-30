import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tables extends BaseSchema {
  protected tableName = 'tables'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('name')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('name')
    })
  }
}
