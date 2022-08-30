import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Menus extends BaseSchema {
  protected tableName = 'menus'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
        table
        .integer('kds_id')
        .unsigned()
        .references('kds.id')
        .onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('kds_id')
    })
  }
}
