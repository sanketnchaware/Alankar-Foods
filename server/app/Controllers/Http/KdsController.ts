import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Kd from 'App/Models/Kd'
import Menu from 'App/Models/Menu'
import Order from 'App/Models/Order'
const Validator = require('validatorjs')
export default class KdsController {
  /**
   *
   * @param request
   * @param response
   */
  public async index({ response }: HttpContextContract) {
    try {
      let result = await Kd.listing()
      return result.length > 0 ? result : response.notFound({ messge: 'record not found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal Server error' })
    }
  }

  public async store(ctx) {
    return this.save(ctx)
  }

  public async update(ctx) {
    const { kd } = ctx.request
    return this.save(ctx, kd)
  }

  async save({ request, response }, record = null) {
    const data = request.only(['name', 'image', 'floor', 'hall'])
    const rules: any = {
      name: 'required|max:150|string',
      image: 'url',
      floor: 'required',
      hall: 'required',
    }

    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }
    let payload = request.body()
    let kd: any = record
    if (kd === null) {
      kd = new Kd()
    }
    const KdsExists = await Kd.query().where('name', payload.name).first()
    if (KdsExists && KdsExists.id !== kd.id) {
      if (KdsExists.name.toLowerCase() === request.all().name.toLowerCase()) {
        return response.badRequest({ message: 'Kds already exists.' })
      }
    }
    try {
      kd.name = payload.name
      kd.image = payload.image
      kd.floor = payload.floor
      kd.hall = payload.hall
      await kd.save()
      return response.ok({ message: 'Kds Created/updated successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal Server error' })
    }
  }

  public async kds({ request, response }: HttpContextContract) {
    try {
      const kitchen_id = request.all().kitchen_id
      const orders = await Order.query()
        .whereHas('meta_order', (query) => {
          query.whereHas('menus', (query) => {
            query.where('kds_id', kitchen_id)
          })
        })

        .whereRaw(`date(created_at) = CURDATE()`)
        .where('payment_status', 'INPROGRESS')
        .select('id')

      if (!orders.length) {
        return response.ok({ data: [] })
      }

      const ids = orders.map((item) => item.id)

      const data = await Order.query()
        .preload('meta_order', (query) => {
          query.preload('menus', (query) => {
            query.where('kds_id', kitchen_id)
          })
        })
        .preload('table', (query) => {
          query.preload('users', (query) => {
            query.preload('role')
          })
        })
        .whereIn('id', ids)
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ data: 'Internal server error' })
    }
  }

  public async kdsWiseMenu({ response, request }: HttpContextContract) {
    try {
      const kdsId = request.all().id
      const page = request.all().page
      const data = await Menu.query()
        .where('kds_id', kdsId)
        .andWhere('status', true)
        .preload('kd')
        .preload('category')
        .paginate(page, 10)

      if (!data) return response.notFound({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ data: 'internal server error' })
    }
  }
}
