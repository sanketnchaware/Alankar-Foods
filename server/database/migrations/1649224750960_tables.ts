import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Tables extends BaseSchema {
  protected tableName = 'tables'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.integer('floor').defaultTo(0).unsigned()
      table.string('hall').defaultTo(0)
      /**
       * To whomever this shall concern,
       * 1. Dine In
       * 2. Take Away
       */
      table.specificType('type', 'tinyint').unsigned().defaultTo(1)
      /**
       * To whomever this shall concern,
       * 1. Vacant
       * 2. Occupied
       * 3. Cleaning In Progress
       */
      table.specificType('status', 'tinyint').unsigned().defaultTo(1)
      table.timestamps(false)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
