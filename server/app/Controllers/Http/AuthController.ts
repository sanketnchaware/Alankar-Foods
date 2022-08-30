import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
const Validator = require('validatorjs')

export default class AuthController {
  /**
   *
   * @param request
   * @param response
   * @param auth
   */
  async login({ request, response, auth }) {
    try {
      const rules = {
        email: 'required|max:150|email',
        password: 'required|min:8|max:15',
      }

      const validation = new Validator(request.all(), rules)
      if (validation.fails()) {
        return response.badRequest(validation.errors.errors)
      }

      let { email, password } = request.all()

      const user = await User.query()
        .where('email', email)
        .preload('role', (query) => {
          query.select('name', 'slug')
        })
        .first()

      if (!user) {
        return response.badRequest({ message: 'No registered user found for the given email' })
      }

      if (!user.status) {
        return response.badRequest({ message: 'User is disabled to login Please contact admin' })
      }

      if (!(await Hash.verify(user.password, password))) {
        return response.badRequest({ message: 'Invalid credentials' })
      }

      const token = await auth.use('api').generate(user, {
        expiresIn: '12hours',
      })
     
      const rememberMe = true
      await auth.login(user, rememberMe)

      let obj = {
        name: user.name,
        email: user.email,
        role: user.role,
        token: token,
        id: user.id,
      }
      return response.ok({
        message: `User LoggedIn Successfully`,
        data: obj,
      })
    } catch (exception) {
      return response.internalServerError({ message: exception.message })
    }
  }
}
