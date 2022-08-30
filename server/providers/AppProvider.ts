import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    // Register your own bindings
  }

  public async boot() {
    // IoC container is ready
    const Response = this.app.container.use('Adonis/Core/Response')
    Response.macro('ok', function (data) {
      this.status(200).send(data)
    })

    Response.macro('notFound', function (errors) {
      this.status(404).send({ errors })
    })

    Response.macro('badRequest', function (errors) {
      this.status(400).send({  errors })
    })

    Response.macro('unauthorized', function (errors) {
      this.status(401).send({ errors })
    })

    Response.macro('notAcceptable', function (errors) {
      this.status(406).send({ errors })
    })

    Response.macro('created', function (data = {}) {
      this.status(201).send({  data })
    })

    Response.macro('noContent', function (data = {}) {
      this.status(204).send({ data })
    })

    Response.macro('forbidden', function (data = {}) {
      this.status(403).send({  data })
    })
    Response.macro('internalServerError', function (data = {}) {
      this.status(500).send({  data })
    })
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    // Cleanup, since app is going down
  }
}
