import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Stores extends BaseSchema {
  protected tableName = 'stores'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('gst').nullable()
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('gst')
    })
  }
}
