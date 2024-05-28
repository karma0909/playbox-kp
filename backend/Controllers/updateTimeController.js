import UpdateTimeModal from "../Model/UpdateTimeModal.js"

const updateTimeController = async(req,res)=>{

    const {boxId,date} = req.body

    console.log(typeof(date))

    const response = await UpdateTimeModal.findOne({boxId : boxId})

    if(response)
    {
        console.log(response[date])
        let not_avialble_time = []
        if(response[date] != undefined)
        {
             not_avialble_time = response[date].map(item=>item.time)
            
             console.log(not_avialble_time)
             return res.status(308).json({message : 'Booked Slot',data : not_avialble_time})

        }
        return res.status(208).json({message : 'No Booked Slot',data : not_avialble_time})
        // response[date].forEach((item,index)=>{
        //     not_avialble_time.push(item)
        // })

        // console.log(not_avialble_time)

        // res.status(308).json({bookedTime : not_avialble_time})
    }

}

export{updateTimeController}