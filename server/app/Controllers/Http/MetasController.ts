import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import MetaOrder from 'App/Models/MetaOrder'
import Order from 'App/Models/Order'
import moment from 'moment'

export default class MetasController {
  public async index({ response }: HttpContextContract) {
    try {
      const data = await MetaOrder.listCount()
      return response.ok({ data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async update({ request, response, params }: HttpContextContract) {
    try {
      const id = params.id
      const meta = await MetaOrder.find(id)
      if (meta) {
        const status = request.body().status
        meta.status = status
        await meta.save()
        return response.ok({
          message: 'status updated successfully',
          data: meta,
        })
      }
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async countCooking({ response }: HttpContextContract) {
    try {
      let date = moment().format('YYYY-MM-DD')
      let data = await MetaOrder.CountCooking()
      const CountNew = await Database.rawQuery(`
      SELECT COUNT(id) as total FROM orders WHERE payment_status IN('INPROGRESS','PENDING')
      AND order_type=1 AND date(created_at) = '${date}'`)

      return response.ok({ data: data, CountNew: CountNew[0] })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async destroy({ response, params }: HttpContextContract) {
    try {
      const data = await MetaOrder.find(params.id)
      await Order.updateMenuAvaliabilityCountPlus(data)
      if (data) {
        await data.delete()
        return response.ok({
          message: 'Deleted successfully',
        })
      }
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async itemsStatusUpdateOnPaid({ response, params }) {
    try {
      let data = await MetaOrder.query().where('order_id', '=', params.id)
      if (data.length <= 0) {
        return response.badRequest({ message: 'no data found' })
      }
      await this.updateStatusOnPaid(data)
      return response.ok({ message: 'Updated successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async updateStatusOnPaid(data) {
    let metaIds = data.map((x) => x.id)
    await MetaOrder.query().whereIn('id', metaIds).update({
      status: 4,
    })
  }
}
