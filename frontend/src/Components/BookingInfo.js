import React, { useCallback, useContext, useEffect, useState } from 'react'
import './../StyleSheets/BookingInfo.css'
import { useLocation ,useNavigate} from 'react-router-dom'
import { userInfo } from './Home'


export default function BookingInfo() {

    const location = useLocation()
    const navigate = useNavigate()
    const context = useContext(userInfo)

    // const [boxName,setBoxName] = useState(location.state.boxName)
    // const [boxAddress,setBoxAddress] = useState(location.state.boxAddress)


    const [bookingDetails, setBookingDetails] = useState({
        boxName: '',
        boxAddress: '',
        date : '',
        time : '',
        boxId : '',
        dayId : '',
        dayName : '',
        sport : ''
    })


    async function handleClick(e)
    {   
        e.preventDefault()

        const response_key = await fetch('/getKey',{
            method : 'POST',
            headers : {'Content-Type' : 'application/json'},
        })
        if(response_key.status === 200)
        {
            const {key} = await response_key.json() 
            const response = await fetch('/makePayment',{
                method : 'POST',
                headers : {'Content-Type' : 'application/json'},
                body : JSON.stringify({amount : 1200})
            })
    
            if(response.status === 308)
            {
                const order = await response.json()
                console.log(order)
    
                const options = {
                    key: key, // Enter the Key ID generated from the Dashboard
                    amount: order.data.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    currency: "INR",
                    name: context.userData.fname + ' ' + context.userData.lname,
                    description: "Test Transaction",
                    image: "https://example.com/your_logo",
                    order_id: order.data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    handler : async function (response){
                        
                        try{
                            const paymentData = {
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_signature: response.razorpay_signature,
                                bookingDetails: bookingDetails // Add any other 
                            }

                            const verify_response = await fetch('/verifyPayment',{
                                method : 'POST',
                                headers : {'Content-Type' : 'application/json'},
                                body : JSON.stringify(paymentData)
                            })
    
                            if(verify_response.status === 408)
                            {
                                console.info('Payment is done' + JSON.stringify(await verify_response.json().success))
                            }
                        }
                        catch(e)
                        {
                            console.error(e)
                        }
                        
                    },
                    // callback_url:"http://localhost:4000/verifyPayment",
                    notes: {
                        address: "Razorpay Corporate Office",
                        bookingDetails : JSON.stringify(bookingDetails)
                    },
                    theme: {
                        color: "#00cc66"
                    }
                };
                const paymentObject = new window.Razorpay(options); 
                paymentObject.open();
                paymentObject.on('payment.success', (data) => {
                    console.log('Payment Successful:', data);
                    // Send data to your backend if needed
                });
            }
        }

        console.log(bookingDetails.sport , bookingDetails.time)

        
        // if (bookingDetails.sport !== '' && bookingDetails.time !== '') {
        //     // handleBooking('timeId',bookingDetails.date + '_' + bookingDetails.time,'timeId',false)



        //     const response = await fetch('/bookASlot', {
        //       method: "POST",
        //       headers: {
        //         "Content-Type": 'application/json'
        //       },
        //       body: JSON.stringify(bookingDetails)
        //     })
        //     if (response.status === 308) {
        //       const data = await response.json()
        //       console.log('Data : ' + data.data)
        //       await getBookingDetails()
        //       alert('Booked')
        //     }
        // }else{
        //     // navigate('/',{replace : true})   
        // }
      
    }

    async function getBookingDetails()
    {
        chnageBookingDetails({...location.state,name: context.userData.fname + ' ' + context.userData.lname,
    })
    }

    const chnageBookingDetails = useCallback((value) => { setBookingDetails(value) }, [setBookingDetails])

    useEffect(() => {
        if (location.state && location.state) {
            getBookingDetails()
            // setBoxAddress(location.state.boxAddress)
            // setBoxName(location.state.boxName)
        } else {
            // navigate('/', { replace: true }) // redirect to home if state is missing
        }
    }, [])

    return (
        <>
            <div className='booking-body modal-body'>
                {/* <h1>Hello</h1> */}
                <div className="booking-mainConatainer border modal-container">
                    <div style={{width : '100%'}}>
                        <div className="modal-header" style={{ background: '#00cc66 ' }}>
                            <div style={{display : 'grid'}}>
                            <h2>{bookingDetails.boxName}</h2>
                                <h5>{bookingDetails.boxAddress}</h5>
                            </div>
                        </div>
                        <div className="modal-body">
                            
                            {/* <form> */}
                                <div className="form-group">
                                    <label className='booking-label' htmlFor="date">Selected Sport</label>
                                    <div className='booking-border'>
                                        <span >{bookingDetails.sport}</span>
                                    </div>

                                </div>
                                <div className="form-group">
                                    <label className='booking-label' htmlFor="date">Selected Date</label>
                                    <div className='booking-border'>
                                        <span >{bookingDetails.date}</span>
                                        <img className='booking-img' src={require('../Images/icons8-date-24.png')}></img>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className='booking-label' htmlFor="start-time">Selected Time</label>
                                    <div className='booking-border'>
                                        <span >{bookingDetails.time}</span>
                                        <img className='booking-img' src={require('../Images/icons8-time-50.png')}></img>
                                    </div>
                                </div>

                                <div className="form-group">
                                    {/* duration */}
                                </div>
                                <div className="form-group">
                                    {/* court */}
                                </div>
                                {/* pay button */}
                                <div style={{marginLeft : '1rem',marginRight : '1rem'}}>
                                    <button className="btn fill"
                                    onClick={handleClick}
                                    style={{width : '100%',backgroundColor  :'rgb(0, 204, 102)'}}>Book</button>
                                </div>
                            {/* </form> */}
                        </div>
                    </div>
                </div>


            </div>
        </>
    )
}
