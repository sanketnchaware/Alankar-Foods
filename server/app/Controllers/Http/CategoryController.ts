import Category from 'App/Models/Category'
import Menu from 'App/Models/Menu'
const Validator = require('validatorjs')

export default class CategoryController {
  /**
   *
   * @param request
   * @param response
   */

  async index({ request, response }) {
    const data = await Category.listing(request)
    return response.ok({
      data: data,
    })
  }

  /**
   *
   * @param ctx
   */
  async store(ctx) {
    return this.save(ctx)
  }

  async show({ request, response }) {
    try {
      let category = await Category.query()
        .preload('sub_categories')
        .where('id', request.param('id'))
        .first()
      if (!category) return response.notFound({ message: 'Category Not Exists' })
      return response.json({
        message: 'Categoty',
        data: category,
      })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  /**
   *
   * @param ctx
   */
  async update(ctx) {
    const { category } = ctx.request
    return this.save(ctx, category)
  }

  /**
   *
   * @param request
   *  @param response
   */
  async destroy({ request, response }) {
    try {
      const { category } = request
      let deleted = await category.delete()
      console.log(deleted)
      if (deleted === undefined) {
        return response.ok({ message: 'Category Deleted Successfully' })
      }
      return response.ok({ message: 'Sorry not possible to delete it!' })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  /**
   *
   * @param ctx (request,response)
   * @param record
   */
  async save({ request, response }, record = null) {
    const rules: any = {
      'name': 'required|max:15',
      'image': 'url',
      'sub_category': 'array',
      'sub_category.*.name': 'string|required|max:15',
      'sub_category.*.id': 'integer',
    }

    const validation = new Validator(request.all(), rules, {
      max: 'categories/subactegories name must below 15 characters',
    })
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    const existingCategoryByname = await Category.query()
      .where('name', request.all().name.trim())
      .first()

    let category: any = record
    if (category === null) {
      category = new Category()
    }

    if (existingCategoryByname && existingCategoryByname.id !== category.id) {
      if (existingCategoryByname.name.toLowerCase() === request.all().name.toLowerCase()) {
        return response.badRequest({ message: 'Category already exists.' })
      }
    }
    const { sub_category } = request.all()
    try {
      let payload = request.body()
      category.name = payload.name
      category.slug = payload.name.trim().replace(' ', '-')
      category.image = payload.image
      category.gst = payload.gst
      category = await category.save()
      if (sub_category && sub_category.length > 0) {
        const data = await this.createSubCategory(category, sub_category)
        if (data !== true) {
          return response.badRequest({
            message: 'Not possible to update/delete the subcategories because associated in orders',
          })
        }
      }
      return response.ok({
        message: 'Category Create/Updated Successfully',
        data: category,
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  /**
   *
   * @param category(json)
   * @param sub_category(array)
   */
  async createSubCategory(category, sub_category_list) {
    try {
      await this.updateSubCategory(sub_category_list, category)
      return true
    } catch (exception) {
      return exception.message
    }
  }

  /**
   *
   * @param request
   * @param response
   */
  async updateStatus({ response, params }) {
    try {
      const category = await Category.findByOrFail('id', params.id)

      if (category) {
        category.status = !category.status
        await category.save()
        const menusdata = await Menu.query().where('category_id', params.id)
        await this.menuUpdatesOncategory(menusdata, category.status)
        return response.ok({ message: 'category Status Changed', data: category })
      }
      return response.notFound({ message: 'category Not Found' })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async searchCategory({ response, request }) {
    try {
      const id = request.all().id
      const categories = await Category.query()
        .where('id', id)
        .preload('menus', (query) => {
          query.preload('category')
        })

      if (categories.length > 0) {
        return response.ok({ data: categories })
      } else {
        return response.notFound({ message: 'Category Not Found' })
      }
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  async subCategory({ response, request }) {
    try {
      const id = request.all().parent
      const sub_category = await Category.query().where('parent_id', id)
      if (!sub_category) return response.notFound({ message: 'No data found' })
      return response.ok({ data: sub_category })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async categoryDropdown({ response }) {
    try {
      const data = await Category.query()
        .whereNull('parent_id')
        .andWhere('status', true)
        .select('name', 'id')

      if (!data) return response.notFound({ message: 'No data found' })

      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async menuUpdatesOncategory(menus, categoryStatus) {
    let menuIds = menus.map((x) => x.id)
    await Menu.query().whereIn('id', menuIds).update({
      status: categoryStatus,
    })
  }

  public async updateSubCategory(sub_category, category) {
    sub_category.map(async (subcat) => {
      let sub_category: Category
      if (subcat.id) {
        sub_category = await Category.findOrFail(subcat.id)
        sub_category.name = subcat.name
        sub_category.slug = subcat.name.trim().replace(' ', '-')
      } else {
        sub_category = new Category()
        sub_category.name = subcat.name
        sub_category.parent_id = category.id
        sub_category.slug = subcat.name.trim().replace(' ', '-')
        ;(sub_category.image = subcat.image || null), (sub_category.gst = subcat.gst || null)
      }
      await sub_category.save()
    })
  }
}
