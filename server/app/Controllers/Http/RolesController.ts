import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
const Validator = require('validatorjs')
import Role from 'App/Models/Role'
export default class RolesController {
  public async index({ response }: HttpContextContract) {
    try {
      let result = await Role.dropDown()
      return result.length > 0 ? result : response.notFound({ messge: 'record not found' })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async store(ctx) {
    await this.save(ctx)
  }

  public async update(ctx) {
    let { role } = ctx.request
    await this.save(ctx, role)
  }

  public async show({ response, params }: HttpContextContract) {
    try {
      const id = params.id
      const data = await Role.findOrFail(id)
      return response.ok({
        data: data,
      })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async save({ request, response }, record = null) {
    const payload = request.only(['name'])
    const rules: any = {
      name: 'required|max:20|string',
    }

    const validation = new Validator(payload, rules)
    if (validation.fails()) {
      return response.badRequest(validation.errors.errors)
    }

    let role: any = record
    if (role === null) {
      role = new Role()
    }

    const existingRoleByname = await Role.query().where('name', payload.name.trim()).first()

    if (existingRoleByname && existingRoleByname.id !== role.id) {
      if (existingRoleByname.name.toLowerCase() === request.all().name.toLowerCase()) {
        return response.badRequest({ message: 'Role already exists.' })
      }
    }

    try {
      ;(role.name = payload.name), (role.slug = payload.name.replace(/\s+/g, '-').toLowerCase())
      await role.save()
      return response.ok({ message: 'Role created/updated successfully' })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }

  public async destroy({ response, request }) {
    try {
      const { role } = request
      await role.delete()
      return response.ok({ message: 'Role Deleted Successfully' })
    } catch (exception) {
      return response.internalServerError({ message: 'Internal server error' })
    }
  }
}
