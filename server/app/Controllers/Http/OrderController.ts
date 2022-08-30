import { calculate } from 'App/Helpers/helpers'
import Coupon from 'App/Models/Coupon'
import Menu from 'App/Models/Menu'
import MetaOrder from 'App/Models/MetaOrder'
import Order from 'App/Models/Order'
import Store from 'App/Models/Store'
import { float } from 'aws-sdk/clients/lightsail'
import moment from 'moment'
const Validator = require('validatorjs')

let partyamount: string = '0'
let afterDiscount: string = '0'
let discountAmount: float = 0
let Discount_value: string = '0'
let Discount_percent: string = '0'
export default class OrderController {
  /**
   *
   * @param request
   * @param response
   */
  async index({ request, response }) {
    const data = await Order.listing(request)
    return response.ok({ data: data })
  }

  /**
   *
   * @param request
   * @param response
   */
  async store(ctx) {
    return await this.save(ctx)
  }

  async update(ctx) {
    let { order } = ctx.request
    return await this.save(ctx, order)
  }

  public async save({ request, response, auth }, record = null) {
    const user = await auth.user.id
    const rules: any = {
      name: 'string',
      email: 'required|email',
      phone: 'required|string',
    }
    let price = 0
    const validation = new Validator(request.all(), rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    let order: any = record
    if (order === null) {
      order = new Order()
    }

    try {
      let payload = request.body()
      let items = payload.items
      items = await Promise.all(
        items.map(async (item) => {
          const menu: any = await Menu.query().where('id', item.menu_id).preload('category').first()

          if (payload.order_type == 1 || payload.order_type == 3) {
            price = menu.dinein_price
          } else {
            price = menu.takeaway_price
          }

          console.log(price);
          const sub_total = price * item.quantity
          item.sub_total = sub_total
          item.category_id = menu.category_id
          item.gst = await Store.gstFromStore()
          item.price = price
          return item
        })
      )

      const { sub_total, tax, final_total } = await calculate(items)
      await this.discount(sub_total, Discount_percent)
      partyamount = request.all().party_amount
      await this.party(partyamount, final_total)
      if (sub_total < discountAmount) {
        await this.initialize()
        return response.badRequest({
          message: 'Discount amount is greater than sub total',
        })
      }

      order.name = payload.name
      order.phone = payload.phone
      order.email = payload.email
      order.table_id = payload.table_id || null
      order.order_type = payload.order_type
      order.total_persons = payload.total_persons || null
      order.instructions = payload.instructions
      order.sub_toal = sub_total
      order.tax = tax
      order.total = afterDiscount.toString()
      order.bill_no = order.bill_no || (await this.autoIncrementBillNo())
      order.payment_status = order.payment_status || 'INPROGRESS'
      order.date_of_occassion = payload.date_of_occassion || null
      order.advance_received = payload.advance_received || null
      order.occassion = payload.occassion || null
      order.discount = discountAmount.toString()
      order.user_id = user
      order.pending =
        (parseFloat(afterDiscount) - payload.advance_received).toFixed(2).toString() || '0'

      for (const [key, value] of Object.entries(request.all())) {
        order[key] = value
      }
      await order.save()
      if (request.all().table_id) {
        await order.related('tables').sync(request.all().table_id)
      } else {
        await order.related('tables').sync([])
      }

      for (let item of items) {
        if (item.id) {
          await Order.updateMenuAvaliabilityCountPlus(item)
          let metaMenu = await MetaOrder.findOrFail(item.id)
          metaMenu.quantity = item.quantity
          metaMenu.price = item.price
          await metaMenu.save()
          await Order.updateMenuAvaliabilityCount(item)
        } else {
          await MetaOrder.create({
            menu_id: item.menu_id,
            quantity: item.quantity,
            category_id: item.category_id,
            gst: item.gst,
            price: item.price,
            order_id: order.id,
          })
          await Order.updateMenuAvaliabilityCount(item)
        }
      }
      await this.initialize()
      return response.ok({
        message: 'Order Created Successfully',
      })
    } catch (exception) {
      console.log(exception)
      await this.initialize()
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async autoIncrementBillNo() {
    //   to get latest added row
    const latest = await Order.query().orderBy('id', 'desc').first()
    const billing = latest?.bill_no || 1000
    const bill = Number(billing) + 1
    return bill.toString()
  }

  public async updateStatus({ request, response, params }) {
    try {
      const order = await Order.findOrFail(params.id)
      const payload = request.body()
      order.payment_status = payload.payment_status
      if (payload.total) order.total = payload.total
      await order.save()
      return response.ok({
        message: 'Order Payment Status Updated Successfully',
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async show({ response, params }) {
    try {
      const data = await Order.query()
        .where('id', params.id)
        .preload('table', (query) => {
          query.preload('users', (query) => {
            query.preload('role')
          })
        })
        .preload('meta_order', (query) => {
          query.select('id', 'menu_id', 'category_id', 'order_id', 'price', 'quantity', 'gst')
          query.preload('menus')
        })

      return response.ok({ data: data })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async tableTransfer({ request, response, params }) {
    const rules: any = {
      table_id: 'required|integer',
    }
    const validation = new Validator(request.all(), rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    try {
      const order = await Order.findOrFail(params.id)
      order.table_id = request.all().table_id
      await order.save()
      return response.ok({
        message: 'Order Table Transferred Successfully',
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async checkCoupon({ request, response }) {
    try {
      let data = await Coupon.checkCoupon(request, response)
      console.log(data)
      if (data.message || undefined) {
        return response.badRequest({ message: 'coupon not exist/expired.' })
      }
      if (data.value) {
        Discount_value = data.value
      }
      if (data.percent) {
        Discount_percent = data.percent
      }

      return data
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async pastOrder({ request, response }) {
    try {
      let data = await Order.pastOrder(request)
      if (!data) return response.badRequest({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async takeAwayOrder({ request, response }) {
    try {
      let data = await Order.takeAway(request)
      if (!data) return response.badRequest({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async activeOrder({ request, response }) {
    try {
      const { order_type, from, key, page, to } = request.all()
      let search_key = key.trim()
      if (order_type && key && page) {
        const data = await Order.query()
          .where('id', '=', `${search_key}`)
          .andWhere('order_type', '=', `${order_type}`)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])

          .orWhere('phone', '=', `${search_key}`)
          .andWhere('order_type', '=', `${order_type}`)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])

          .orWhere('email', '=', `${search_key}`)
          .andWhere('order_type', '=', `${order_type}`)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])

          .orWhere('bill_no', '=', `${search_key}`)
          .andWhere('order_type', '=', `${order_type}`)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])

          .orWhere('name', 'like', `%${search_key}%`)
          .andWhere('order_type', '=', `${order_type}`)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])

          .preload('table')
          .preload('meta_order', (query) => {
            query.preload('menus')
          })
          .orderBy('id', 'desc')
          .paginate(page, 10)

        const cloned = await this.itemStatus(JSON.parse(JSON.stringify(data)))
        return response.ok({ data: cloned })
      }
      if (order_type && from && to && page) {
        const data = await Order.query()
          .where('order_type', order_type)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])
          .where('created_at', '>=', moment(from).startOf('day').format('YYYY-MM-DD HH:mm:ss'))
          .where('created_at', '<=', moment(to).endOf('day').format('YYYY-MM-DD HH:mm:ss'))
          .preload('table')
          .preload('meta_order', (query) => {
            query.preload('menus')
          })
          .orderBy('id', 'desc')
          .paginate(page, 10)
        return response.ok({ data: data })
      }

      if (order_type && page) {
        const data = await Order.query()
          .where('order_type', order_type)
          .andWhereIn('payment_status', ['INPROGRESS', 'PENDING'])
          .preload('table')
          .preload('meta_order', (query) => {
            query.preload('menus')
          })
          .orderBy('id', 'desc')
          .paginate(page, 10)
        const cloned = await this.itemStatus(JSON.parse(JSON.stringify(data)))
        return response.ok({ data: cloned })
      }
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async removeCoupon({ response }) {
    try {
      ;(Discount_percent = '0'), (Discount_value = '0')
      return response.ok({ message: 'Removed Successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async discount(sub_total, Discount_percent) {
    if (parseFloat(Discount_percent) > 0) {
      discountAmount = (parseFloat(Discount_percent) * parseFloat(sub_total)) / 100
    } else if (parseFloat(Discount_value) > 0) {
      discountAmount = parseFloat(Discount_value)
    } else {
      discountAmount = 0
    }
  }

  public async party(partyamount, final_total) {
    if (partyamount) {
      afterDiscount = (
        parseFloat(partyamount) +
        (parseFloat(final_total) - discountAmount)
      ).toString()
    } else {
      afterDiscount = (parseFloat(final_total) - discountAmount).toString()
    }
  }

  public async initialize() {
    discountAmount = 0
    partyamount = '0'
    afterDiscount = '0'
    Discount_percent = '0'
    Discount_value = '0'
  }

  public async itemStatus(cloned) {
    for (let i = 0; i < cloned.data.length; i++) {
      const status = { 1: 0, 2: 0, 3: 0, 4: 0 }
      for (let j = 0; j < cloned.data[i].meta_order.length; j++) {
        status[cloned.data[i].meta_order[j].status] += 1
      }
      cloned.data[i]['status'] = status
    }
    return cloned
  }
}
