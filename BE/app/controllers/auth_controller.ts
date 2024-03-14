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
    async Profile({ auth }: HttpContext) {
      return auth.user

    }
    googleRedirect = async ({ally}:HttpContext)=>{
        return ally.use('google').redirect()
    }
    googleCallback = async ({ally,response}:HttpContext)=>{
        const gg = ally.use('google')

        /**
         * User has denied access by canceling
         * the login flow
         */
        if (gg.accessDenied()) {
          return 'You have cancelled the login process'
        }
      
        /**
         * OAuth state verification failed. This happens when the
         * CSRF cookie gets expired.
         */
        if (gg.stateMisMatch()) {
          return 'We are unable to verify the request. Please try again'
        }
      
        /**
         * GitHub responded with some error
         */
        if (gg.hasError()) {
          return gg.getError()
        }
      
        /**
         * Access user info
         */
        const user = await gg.user()
        const exitsUser = await User.findBy('email',user.email)
        if(exitsUser){
            const token = await User.accessTokens.create(exitsUser)
            return response.redirect().toPath(`http://localhost:3000?token=${token.value!.release()}`)
        
            
        }
        
        const newUser = new User()
        newUser.email = user.email
        newUser.password = user.id
        newUser.fullName = user.name
        await newUser.save()
        const token = await User.accessTokens.create(newUser)

        return response.redirect().toPath(`http://localhost:3000?token=${token.value!.release()}`)
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