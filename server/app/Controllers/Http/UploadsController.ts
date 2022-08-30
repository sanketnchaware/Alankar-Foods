import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { toS3 } from 'App/Helpers/upload'

export default class UploadsController {
  public async uploadImage({ request, response }: HttpContextContract) {
    try {
      const file = request.file('image', { size: '2mb' })
      if (!file) {
        return response.badRequest('missing file')
      }
      await file.move('./uploads')

      const imagePath = './uploads/' + file.fileName
      const imageUrl = await toS3(imagePath)
      return response.ok({
        imageUrl,
        imagePath,
      })
    } catch (err) {
      return response.internalServerError({ message: 'Internal server error ' })
    }
  }
}
