import { Router } from 'express'
import {isLoggedInController} from '../Controllers/isLoggedInController.js'
import { loginController, signupController } from '../Controllers/authControllers.js'

import {addBoxController} from '../Controllers/addBoxController.js'
import { getBoxesController } from '../Controllers/getBoxesController.js'

import { getAllBoxesController} from '../Controllers/getAllBoxesController.js'
import { bookASlotController } from '../Controllers/bookASlotController.js'
import { updateTimeController } from '../Controllers/updateTimeController.js'
import { paymentController, paymentVerificationController } from '../Controllers/paymentController.js'
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

routes.route('/bookASlot').post(bookASlotController)

routes.route('/updateTime').post(updateTimeController)

routes.route('/makePayment').post(paymentController)

routes.route('/verifyPayment').post(paymentVerificationController)

routes.route('/getKey').post((req,res)=>{
    return res.status(200).json({key : 'rzp_test_Dh2p3UmPTPpsJI'})
})

export default routes