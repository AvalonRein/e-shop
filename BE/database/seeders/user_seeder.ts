import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([{
      email:'admin@gmail.com',
      password:'password123',
      fullName:'admin',
    },{
      email:'user@gmail.com',
      password:'password123',
      fullName:'user'
    }])
  }
}