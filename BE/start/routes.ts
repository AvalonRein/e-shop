/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import AuthController from '#controllers/auth_controller'
import AuthMiddleware from '#middleware/auth_middleware'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.group(() => {
    router.group(()=>{
      router.post('/login',[AuthController, 'Login'])
      router.post('/register',[AuthController, 'Register'])
      router.get('/google/redirect',[AuthController, 'googleRedirect'])
      router.get('/google/callback',[AuthController, 'googleCallback'])
      router.get('/profile',[AuthController, 'Profile']).use(middleware.auth({guards :['api']}))
    }).prefix('/auth')

    router.group(()=>{
      router.get('/',()=>{
        return "chao ban"
      })
    }).prefix('/').use(middleware.auth({guards :['api']}))

}).prefix('/api')

