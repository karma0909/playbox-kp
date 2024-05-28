import mongoose from "mongoose";

const boxSchema = mongoose.Schema({
    boxName : {
        type : String,
        required : true
    },
    boxAddress : {
        type : String,
        required : true
    },
    latitude : {
        type: Number,
        required : true
    },
    longitude : {
        type : Number,
        required : true 
    },
    sports : {
        type : [String],
        required : true
    },
    box : {
        type : [Object],
        required : true
    },
    status : {
        type : String,
        required : true
    },
    pincode : {
        type : Number,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    urls :{
        type : [String],
        required : true
    },
    city :{
        type : String,
        required : true,
    }
})

const BoxModal = mongoose.model('BOX',boxSchema)



export default BoxModal