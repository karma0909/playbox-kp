import BoxModal from "../Model/BoxModal.js"
import jwt from 'jsonwebtoken'

const getAllBoxesController = async(req,res) => {

    try{
        const response = await BoxModal.find({status : 'PENDING'})
        if(response)
            {
                let image_urls = []
                // response.urls.forEach((token)=>{
                //     image_urls.push(jwt.verify(token,'shhhh').url)
                // })

                response.forEach((box,boxIndex)=>{
                    image_urls = []
                    box.urls.forEach((token)=>{
                        image_urls.push(jwt.verify(token,'shhhhh').url)
                    })
                    response[boxIndex].urls = image_urls
                    console.log(response[boxIndex].urls)
                })

                // console.log(image_urls)
                return res.status(308).json({data : response})
            }
        else{
            return res.status(406)
        }
    }
    catch(error)
    {
        console.log(error)
    }
}

export {getAllBoxesController}