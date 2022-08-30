import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from 'App/Models/Feedback'
import Menu from 'App/Models/Menu'
import MetaOrder from 'App/Models/MetaOrder'
import Order from 'App/Models/Order'
import User from 'App/Models/User'

export default class ReportsController {
  public async reportStats({ request, response }: HttpContextContract) {
    try {
      Promise.all([await MetaOrder.listing(request.qs()), await MetaOrder.subTotal(request)]).then(
        (result) => {
          console.log(result)
          let quantity = result[0][0].quantity
          let total = result[1][0].total
          return response.ok({ quantity, total })
        }
      )
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async countStats({ request, response }) {
    try {
      Promise.all([
        await MetaOrder.Stats(request.qs()),
        await Order.Stats(request.qs()),
        await Feedback.FeedBackCount(),
        await Order.dashboard(request.qs()),
      ]).then((result) => {
        let quantity = result[0][0].quantity
        let order = result[1][0].order
        let feedback = result[2][0].feedback
        let revenue = result[3][0]
        return response.ok({ quantity, order, feedback, revenue })
      })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async salesReport({ request, response }) {
    try {
      let result = await Menu.reports(request.qs())
      return result.length > 0 ? result : response.notFound({ messge: 'record not found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async staffReport({ request, response }) {
    try {
      let result = await User.staffReports(request.qs())
      return result.length > 0 ? result : response.notFound({ messge: 'record not found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async graphStatsRange({ request, response }: HttpContextContract) {
    try {
      let data = await Order.graphStatsRange(request)
      if (!data) return response.notFound({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async graphStats({ response, request }: HttpContextContract) {
    try {
      let data = await Order.graphStats(request)
      if (!data) return response.notFound({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
