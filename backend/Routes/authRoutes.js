import { Router } from 'express'
import {isLoggedInController} from '../Controllers/isLoggedInController.js'
import { loginController, signupController } from '../Controllers/authControllers.js'

import {addBoxController} from '../Controllers/addBoxController.js'
import { getBoxesController } from '../Controllers/getBoxesController.js'

import { getAllBoxesController} from '../Controllers/getAllBoxesController.js'
const routes = Router()


// routes.route('/').get(()=>{console.log("Home page is called")})

routes.route('/signin').post(loginController)

routes.route('/register').post(signupController)

routes.route('/isLoggedIn').post(isLoggedInController)

routes.route('/logout').post((req,res)=>{
    res.clearCookie('userData')
    // res.clearCookie
    
    res.status(308).json({message : 'User LogOut'})
})

routes.route('/addBox').post(addBoxController)


routes.route('/getBoxes').post(getBoxesController)

routes.route('/getAllBoxes').post(getAllBoxesController)
export default routes