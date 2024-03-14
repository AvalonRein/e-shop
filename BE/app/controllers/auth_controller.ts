import User from '#models/user'
import { LoginForm, RegisterForm } from '#validators/login'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class AuthController {
    async Login({ request }: HttpContext) {
        let form = await request.validateUsing(LoginForm)
        const user = await User.query().where('email', form.email).first()
        if (!user) {
            throw new Error('Invalid user credentials')
        }

        const isValid = await hash.verify(user.password, form.password)
        if (!isValid) {
            throw new Error('Invalid user credentials')
        }
        const token = await User.accessTokens.create(user)

        return {
            type: 'bearer',
            value: token.value!.release(),

        }

    }

    async Register({ request }: HttpContext) {
        let form = await request.validateUsing(RegisterForm)
        const user = await User.query().where('email', form.email).first()
        if (user) {
            throw new Error('Invalid user credentials')
        }
        const newUser = new User()
        newUser.email = form.email
        newUser.password = form.password
        newUser.fullName = form.fullname
        await newUser.save()
        const token = await User.accessTokens.create(newUser)

        return {
            type: 'bearer',
            value: token.value!.release(),
        }

    }
    async GetUser({ auth }: HttpContext) {
      return auth.user

    }
    // async Logout({ request }: HttpContext) {
    //     let form = await request.validateUsing(RegisterForm)
    //     const user = await User.query().where('email', form.email).first()
    //     if (user) {
    //         throw new Error('Invalid user credentials')
    //     }
    //     const newUser = new User()
    //     newUser.email = form.email
    //     newUser.password = form.password
    //     newUser.fullName = form.fullname
    //     await newUser.save()
    //     const token = await User.accessTokens.create(newUser)

    //     return {
    //         type: 'bearer',
    //         value: token.value!.release(),
    //     }

    // }
}