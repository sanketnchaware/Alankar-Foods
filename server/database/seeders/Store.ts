import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Store from 'App/Models/Store'

export default class StoreSeeder extends BaseSeeder {
  public async run() {
    await Store.create({
      "name": "Alankar",
      "email": "alankar@gmail.com",
     "phone": "8806382051",
     "address": "Samarth Nagar, Risod",
     "gst_no": "123456789012345",
     "gst":"5"
     })
  }
}
