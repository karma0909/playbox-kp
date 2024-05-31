import Razorpay from 'razorpay'
// import {RAZORPAYKEY_ID,RAZORPAYKEY_KEY} from '../config.env'
// import { config  } from 'dotenv'; // Use a clear alias

// config({path : '../config.env'});

const instance = new Razorpay({

    // key_id: process.env.RAZORPAYKEY_ID,
    // key_secret: process.env.RAZORPAY_KEY,

    key_id: 'rzp_test_Dh2p3UmPTPpsJI',
    key_secret: '0Tsg10lufXyS2JyO6gheYisC',
})

// console.log("data  : " + process.env.RAZORPAYKEY_ID)

export {instance}
