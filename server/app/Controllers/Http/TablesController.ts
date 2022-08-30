import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import Table from 'App/Models/Table'

const Validator = require('validatorjs')
export default class TablesController {
  public async index({ response }: HttpContextContract) {
    try {
      let data = await Table.listing()
      if (!data) return response.notFound({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async store(ctx) {
    return await this.save(ctx)
  }

  public async update(ctx) {
    const { table } = ctx.request
    return this.save(ctx, table)
  }

  public async destroy({ request, response }) {
    const { table } = request
    await table.delete()
    return response.ok({ message: 'Table deleted' })
  }

  async save({ request, response }, record = null) {
    const payload = request.only(['floor', 'hall', 'status', 'type', 'name'])
    const rules: any = {
      floor: 'required|integer',
      hall: 'required|string|max:20',
      status: 'required|boolean',
      type: 'required',
      name: 'required|string|max:20',
    }

    const validation = await new Validator(payload, rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    let table: any = record
    console.log(table)
    if (table === null) {
      table = new Table()
    }

    const tableExists = await Table.query().where('name', payload.name).first()
    if (tableExists && tableExists?.id !== table.id) {
      if (tableExists.name.toLowerCase() === payload.name.toLowerCase()) {
        return response.badRequest({ message: 'Table already exists' })
      }
    }

    try {
      table.name = payload.name
      table.floor = payload.floor
      table.hall = payload.hall
      table.status = payload.status
      table.type = payload.type
      await table.save()
      return response.ok({ message: 'Table created/updated successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      const table = await Table.query().whereNot('id', id).andWhere('status', 1)
      return response.ok({
        data: table,
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async updateStatus({ request, response, params }: HttpContextContract) {
    try {
      const data = request.only(['status'])
      const rules: any = {
        status: 'required',
      }
      const validation = await new Validator(data, rules)
      if (validation.fails()) {
        return response.badRequest({ message: validation.messages() })
      }
      const table = await Table.findOrFail(params.id)
      table.status = data.status
      await table.save()
      return response.ok({ message: 'table updated successfully', data: table })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async tableDropDown({ response }: HttpContextContract) {
    try {
      const data = await Table.query().where('status', 1).select('name', 'id')
      response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async listTab({ response, request }) {
    try {
      const id = request.all().id

      const data = await Order.query()
        .preload('table', (query) => {
          query.preload('users', (query) => {
            query.select('id', 'name', 'role_id')
            query.preload('role', (query) => {
              query.select('id', 'name')
            })
          })
        })
        .preload('meta_order', (query) => {
          query.preload('menus')
        })
        .where('id', id)
        .andWhere('order_type', 1)
      return response.ok({ data: data })
    } catch (err) {
      console.log(err)
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async rolewise({ response, request }) {
    try {
      const id = request.all().id
      if (id == 2 || id == 3) {
        const data = await Table.query()
          .where('status', 1)
          .preload('users', (query) => {
            query.select('id', 'name', 'role_id')
            query.where('role_id', id)
          })
        return response.ok({ data: data })
      } else {
        return response.badRequest({ message: 'invalid role' })
      }
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async listTables({ response }) {
    try {
      let tables = await Table.all()
      return response.ok({ data: tables })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
