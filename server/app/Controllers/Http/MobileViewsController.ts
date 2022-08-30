import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Menu from 'App/Models/Menu'

export default class MobileViewsController {
  public async categoriesOnMealType({ response, request }) {
    try {
      let mealTypeString = await this.mealType(request.all().id)
      let data = await Menu.menuCategory(mealTypeString)
      if (!data) return response.notFound({ message: 'no data found' })
      return response.ok({ data: data[0] })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
  public async show({ response, request, params }: HttpContextContract) {
    try {
      let mealTypeString = await this.mealType(request.all().mealType)
      let data = await Menu.menuListing(params.id, mealTypeString)
      if (!data) return response.notFound({ message: 'no data found' })
      return response.ok({ data: data[0] })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async menus({ request, response }) {
    try {
      let mealTypeString = await this.mealType(request.all().id)
      let data = await Menu.menuSearch(request, mealTypeString)
      if (!data) {
        return response.notFound({ message: 'no data found' })
      }
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async menuSearchCategory({ request, response }) {
    try {
      let mealTypeString = await this.mealType(request.all().mealType)
      let data = await Menu.menuSearchOnCategory(request, mealTypeString)
      if (!data) return response.notFound({ message: 'no data found' })
      return response.ok({ data: data })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async mealType(data) {
    let meal_type = data
    if (meal_type == 1) {
      return 'breakfast'
    } else if (meal_type == 2) {
      return 'lunch'
    } else {
      return 'dinner'
    }
  }
}
