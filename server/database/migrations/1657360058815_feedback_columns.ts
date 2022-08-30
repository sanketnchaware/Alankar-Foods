import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Feedbacks extends BaseSchema {
  protected tableName = 'feedbacks'

  public async up () {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('cleanliness')
      table.string('service')
    })
  }

  public async down () {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('cleanliness')
      table.dropColumn('servvice')
    })
  }
}
