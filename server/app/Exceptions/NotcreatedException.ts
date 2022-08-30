import { Exception } from '@adonisjs/core/build/standalone'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new NotcreatedException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class NotcreatedException extends Exception {
    async handle (error, {  response }) {

        if(error.name == 'NotcreatedException') {
            return response.status(400).send({
              error: error.message // or your error message
            })  
          }
    }
}
