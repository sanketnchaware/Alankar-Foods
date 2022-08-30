import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Store from 'App/Models/Store'
let Validator = require('validatorjs')

export default class StoresController {
  public async index({ response }: HttpContextContract) {
    try {
      let result = await Store.listing()
      return result.length > 0 ? result : response.notFound({ messge: 'record not found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async store(ctx) {
    return this.save(ctx)
  }

  public async update(ctx) {
    const { store } = ctx.request
    return this.save(ctx, store)
  }

  async save({ request, response }, record = null) {
    let rules = {
      name: 'required|string|max:150',
      email: 'required|email',
      phone: 'required|numeric',
      address: 'required|string|max:150',
      gst_no: 'required|string|max:150',
      gst: 'required|integer|max:100',
    }
    const payload = request.only(['name', 'email', 'phone', 'address', 'gst_no', 'gst'])
    let validation = new Validator(payload, rules)
    let store: any = record
    if (store === null) {
      store = new Store()
    }

    if (validation.fails()) {
      return response.badRequest({ message: validation.errors.all() })
    }
    try {
      ;(store.name = payload.name),
        (store.email = payload.email),
        (store.phone = payload.phone),
        (store.address = payload.address),
        (store.gst_no = payload.gst_no),
        (store.gst = payload.gst),
        await store.save()
      return response.ok({ message: 'Updated/Created successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async destroy({ response, request }) {
    try {
      const { store } = request
      await store.delete()
      return response.ok({ message: 'deleted' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async gstFromStore({ response }) {
    try {
      let gst = await Store.gstFromStore()
      if (!gst) return response.notFound({ message: 'no data found' })
      return response.ok(gst)
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
