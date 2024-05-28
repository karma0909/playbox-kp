import mongoose from "mongoose"

const BookingSchema = mongoose.Schema({
    date : {
        type : String,
        required : true
    },
    sport : {
        type : String,
        required : true
    },
    time : {
        type : String,
        required : true
    },
    dayName : {
        type : String,
        required : true
    }
})


const BookingModal = mongoose.model('BOOKING',BookingSchema)

export default BookingModal