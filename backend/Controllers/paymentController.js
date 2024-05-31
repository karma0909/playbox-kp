import { instance } from "../RazorPay/getInstance.js"
import crypto from 'crypto'
import { bookASlotFunction } from "./bookASlotController.js"

const paymentController = async (req,res)=>{

    const {amount} = req.body

    const options  ={
        amount : Number(amount * 100), // the smallest amount is consider
        currency: "INR",
        receipt: "order_rcptid_11"
    }

    const order = await instance.orders.create(options) 
    console.log(order)
    return res.status(308).json({message : 'Order is created',data : order})

}

const paymentVerificationController = async (req,res) =>{
    console.log("payment verification " + JSON.stringify(req.body));

    const {razorpay_order_id,razorpay_payment_id,razorpay_signature,bookingDetails} = req.body

    const body = razorpay_order_id + "|" + razorpay_payment_id

    console.log(body)

    // const bookingDetails = JSON.parse(notes.bookingDetails)


    console.log(bookingDetails)

    const expectedSignature = crypto.createHmac('sha256','0Tsg10lufXyS2JyO6gheYisC')
                                                .update(body.toString())
                                                .digest('hex')

    console.log('GeneratedSignature : ' + expectedSignature)                                        
    console.log('receivedSignature : ' + razorpay_signature)

    const isAuthentic =  razorpay_signature === expectedSignature

    if(isAuthentic)
    {
        //store in db

        const booking_response = await bookASlotFunction(bookingDetails)

        console.log(booking_response)
        if(booking_response)
        {
            res.redirect(`http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`)
        }
        else{
            console.log('not get booking response')
        }

    }else{
        res.status(408).json({success : false})
    }

}

export {paymentController,paymentVerificationController}