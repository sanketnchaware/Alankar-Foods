import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class FindById {
  public async handle(
    { request, response }: HttpContextContract,
    next: () => Promise<void>,
    guards?: string[]
  ) {
    const model = guards
    const { id } = request.params()
    const Instance = (await import(`../Models/${model}`)).default

    let record = await Instance.query().where('id', id).first()
    
    if (!record) {
      return response.notFound({ message: `${model} not found.` })
    }

    if (model) {
      request[String(model).toLowerCase()] = record
    }
    await next()
  }
}
