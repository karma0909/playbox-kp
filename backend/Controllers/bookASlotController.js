import BookingModal from "../Model/BookingModal.js";
import UpdateTimeModal from "../Model/UpdateTimeModal.js";
import { updateTimeController } from "./updateTimeController.js";


const bookASlotController = async(req,res)=>{

    const {date,time,boxId} = req.body
    console.log(req.body)
    const response = await UpdateTimeModal.updateOne({boxId :boxId},{  
            $setOnInsert: { [date]: [] }
        },
        {
            upsert : true
        }

    )    

    const pushResponse = await UpdateTimeModal.updateOne({boxId : boxId},{
        $push : {
            [date] : req.body
        }
    })


    if(pushResponse)
    {
        console.log(response)
        return res.status(308).json({message : 'Slot is updated',data : response})
    }

}

export {bookASlotController}