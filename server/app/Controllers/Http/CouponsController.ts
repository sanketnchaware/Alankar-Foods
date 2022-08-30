import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Coupon from '../../Models/Coupon'
let Validator = require('validatorjs')

export default class CouponsController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let data = await Coupon.listing(request)
      if (!data) return response.notFound({ message: 'No data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async store(ctx) {
    return this.save(ctx)
  }

  async save({ request, response }, record = null) {
    const data = request.only(['code', 'percent', 'value', 'expires_at'])
    let rules = {
      code: 'required|string|max:150',
      percent: 'required|string|min:0 |max:100',
      value: 'required|string|min:0',
      expires_at: 'required|date',
    }

    const validation = new Validator(data, rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }
    let payload = request.body()
    let coupon: any = record
    if (coupon === null) {
      coupon = new Coupon()
    }
    const CouponExists = await Coupon.query().where('code', payload.code).first()
    if (CouponExists && CouponExists.id !== coupon.id) {
      if (CouponExists?.code.toLowerCase() === request.all().code.toLowerCase()) {
        return response.badRequest({ message: 'Coupon already exists.' })
      }
    }
    try {
      ;(coupon.code = payload.code.toLowerCase()),
        (coupon.percent = payload.percent),
        (coupon.value = payload.value),
        (coupon.status = true),
        (coupon.expires_at = payload.expires_at),
        await coupon.save()
      return response.ok({ message: 'Coupon Created/updated successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal Server error' })
    }
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const coupon = await Coupon.findByOrFail('id', params.id)
      if (!coupon) return response.notFound({ message: 'no data found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async update(ctx) {
    const { coupon } = ctx.request
    return this.save(ctx, coupon)
  }

  public async destroy({ response, request }) {
    try {
      const { coupon } = request
      await coupon.delete()
      return response.ok({ message: 'Coupon Deleted Successfully' })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async updateCouponStatus({ response, params }: HttpContextContract) {
    try {
      const coupon = await Coupon.findByOrFail('id', params.id)
      if (coupon) {
        coupon.status = !coupon.status
        await coupon.save()
        return response.ok({ message: 'Coupon Status Changed', data: coupon })
      }
      return response.notFound({ message: 'Coupon Not Found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
