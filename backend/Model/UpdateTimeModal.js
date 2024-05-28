import mongoose from "mongoose";

const updateTimeSchema = mongoose.Schema({
    boxId : { 
        type : String,
    }
},{strict: false})

const UpdateTimeModal = mongoose.model('UPDATETIMES',updateTimeSchema)

export default UpdateTimeModal