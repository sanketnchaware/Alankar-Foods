import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Order from 'App/Models/Order'
import { generateBill } from 'App/Helpers/Printbill'
import Store from 'App/Models/Store'

export default class PrintbillsController {
  public async printBill({ request, response }: HttpContextContract) {
    try {
      const id = request.all().id
      const data = await Order.query()
        .where('id', id)
        .preload('table', (query) => {
          query.preload('users', (query) => {
            query.preload('role')
          })
        })
        .preload('meta_order', (query) => {
          query.select('id', 'menu_id', 'category_id', 'order_id', 'price', 'quantity', 'gst')
          query.preload('menus')
        })

      const store = await Store.query()
      const bill = await generateBill(data, store)
      if (!bill) return response.notFound({ message: 'no data found' })
      return response.ok({ data: bill })
    } catch (error) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
