import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Feedback from 'App/Models/Feedback'
const Validator = require('validatorjs')
export default class FeedbacksController {
  public async index({ request, response }: HttpContextContract) {
    try {
      let result = await Feedback.listing(request)
      return result.length > 0 ? result : response.notFound({ messge: 'no data found' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async store(ctx) {
    return this.save(ctx)
  }

  public async save({ request, response }, record = null) {
    const rules: any = {
      rating: 'required|max:150',
      comment: 'required|max:150',
      order_id: 'required|integer',
    }

    const payload = request.only(['rating', 'order_id', 'comment', 'cleanliness', 'service'])

    let feedback: any = record
    if (feedback === null) {
      feedback = new Feedback()
    }

    const validation = new Validator(request.all(), rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }
    try {
      feedback.rating = payload.rating
      feedback.order_id = payload.order_id
      feedback.comment = payload.comment
      feedback.cleanliness = payload.cleanliness
      feedback.service = payload.service
      await feedback.save()
      return response.ok({ message: 'Feedback submitted successfully' })
    } catch (err) {
      return response.badRequest({ message: 'Internal server error' })
    }
  }

  public async feedbackStats({ response }) {
    try {
      return await Feedback.FeedBackStats()
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
