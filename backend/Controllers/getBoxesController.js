import BoxModal from  '../Model/BoxModal.js'
import jwt from 'jsonwebtoken'

const getBoxesController  = async(req,res)=>{

    const email = req.body.email
    const city = req.body.city

    console.log(email)
    console.log(city)

    if(req.body.isBasedOnEmail)
    {
        const response = await BoxModal.find({email : email})
        if(response)
            {
                res.status(308).json({message : 'Box Found',data : response })
            }
            else{
                res.status(208).json({message : 'No Box Found'})
            }
    }
    else if(city == 'Unknown')
    {
        const response = await BoxModal.find({status : 'APPROVED'})

        let image_urls = []

        if(response)
        {
            response.forEach((box,boxIndex)=>{
                image_urls = []
            
                box.urls.forEach((token)=>{
                    image_urls.push(jwt.verify(token,'shhhhh').url)
                })
                response[boxIndex].urls = image_urls
                console.log(response[boxIndex].urls)
            })

            return res.status(308).json({data : response})
        }
    }
    else{
        const response = await BoxModal.find({city : city,status : 'APPROVED'})
        
        let image_urls = []

        if(response)
        {
            response.forEach((box,boxIndex)=>{
                image_urls = []
            
                box.urls.forEach((token)=>{
                    image_urls.push(jwt.verify(token,'shhhhh').url)
                })
                response[boxIndex].urls = image_urls
                console.log(response[boxIndex].urls)
            })

            return res.status(308).json({data : response})
        }
        else
        {
            res.status(208).json({message : 'No Box Found'})
        }
    }

        

}

export {getBoxesController}