import Menu from 'App/Models/Menu'
// import ExceptionHandler from 'App/Exceptions/Handler'
const Validator = require('validatorjs')

export default class MenuController {
  /**
   *
   * @param request
   * @param response
   */

  async index({ request, response }) {
    try {
      let data = await Menu.listing(request)
      if (!data) return response.notFound({ message: 'no data found' })
      response.ok(data)
    } catch (err) {
      return response.notFound({ message: 'menu not found' })
    }
  }

  /**
   *
   * @param ctx
   */
  async store(ctx) {
    console.log(ctx)
    return this.save(ctx)
  }

  /**
   *
   * @param ctx
   */
  async update(ctx) {
    const { menu } = ctx.request
    return this.save(ctx, menu)
  }

  /**
   *
   * @param request
   *  @param response
   */
  async destroy({ request, response }) {
    const { menu } = request
    await menu.delete()
    return response.noContent()
  }

  /**
   *
   * @param ctx (request,response)
   * @param record
   */
  async save({ request, response }, record = null) {
    const rules: any = {
      name: 'required|max:150',
      time: 'required|string',
      image: 'url',
      dinein_price: 'required|integer|min:0',
      takeaway_price: 'required|integer|min:0',
      category_id: 'integer|required',
      sub_category_id: 'integer',
      meal_type: 'array|required',
      availability_count: 'integer',
      kds_id: 'integer|required',
    }

    const validation = new Validator(request.all(), rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    let menu: any = record
    if (menu === null) {
      menu = new Menu()
    }

    try {
      let payload = request.body()
      menu.name = payload.name
      menu.dinein_price = payload.dinein_price
      menu.price = payload.dinein_price
      if (payload.meal_type) menu.meal_type = payload.meal_type
      menu.takeaway_price = payload.takeaway_price
      menu.category_id = payload.category_id
      if (payload.sub_category_id) menu.sub_category_id = payload.sub_category_id
      menu.availability_count = payload.availability_count || 0
      menu.image = payload.image
      menu.time = payload.time || '10-15 Min'
      menu.kds_id = payload.kds_id
      await menu.save()
      return response.ok({
        message: 'Menu Create/Updated Successfully',
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  /**
   *
   * @param request
   * @param response
   */
  async updateAvailabilityCount({ request, response }) {
    try {
      let { menu } = request
      let payload = request.only(['updated_count'])
      const rules: any = {
        updated_count: 'required|integer|min:0',
      }

      const validation = new Validator(payload, rules)
      if (validation.fails()) {
        return response.badRequest(validation.errors.errors)
      }

      menu.availability_count = request.body().updated_count
      await menu.save()
      return response.ok(menu)
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async show({ response, params }) {
    try {
      const id = params.id
      const menu = await Menu.query()
        .where('id', id)
        .preload('category', (query) => {
          query.preload('sub_categories')
        })
        .preload('kd')
      response.ok(menu)
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async changeMenuStatus({ request, response }) {
    const { menu } = request
    try {
      if (menu) {
        menu.status = !menu.status
        await menu.save()
        return response.ok({ message: 'Menu Status Changed', data: menu })
      }
      return response.notFound({ message: 'Menu Not Found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async menuByCategoryandKdsId({ request, response }) {
    try {
      let data = await Menu.menuByCategoryandKdsId(request)
      if (!data) {
        return response.notFound({ message: 'no data found' })
      }
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async getMenu({ request, response }) {
    try {
      const page = request.all().page
      const data = await Menu.query()
        .preload('category')
        .preload('kd')
        .orderBy('id', 'desc')
        .paginate(page, 10)
      response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async searchMenu({ response, request }) {
    try {
      const page = request.all().page
      const search_key = request.all().search_key.trim()
      const menus = await Menu.query()
        .where('name', 'like', `%${search_key}%`)
        .where('status', true)
        .preload('category')
        .preload('kd')
        .paginate(page, 10)
      response.ok(menus)
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async searchMenuForOrder({ request, response }) {
    try {
      let menu = await Menu.searchMenuForOrder(request)
      if (menu.length > 0) {
        return response.ok(menu)
      }
      return response.notFound({ message: 'no data found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
