// import express from 'express'
import BoxModal from '../Model/BoxModal.js'
// import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'

const generateToken_urls = async(urls)=>{
    const tokens = []

    urls.forEach((url)=>{
        tokens.push(jwt.sign({url : url},'shhhhh'))
    })
    console.log(tokens)
    return tokens
}

const addBoxController = async(req,res) => {


    console.log(req.body.isUpdated)
    console.log(req.body._id)
    console.log((req.body.urls))
    
    req.body.urls = await generateToken_urls(req.body.urls)

    
    const boxModal = new BoxModal(req.body)

    const response  = await BoxModal.findOne({boxName : req.body.boxName,latitude : req.body.latitude,longitude : req.body.longitude,email : req.body.email})



    // req.body = {...req.body,urls : [await generateToken_urls(req.body.urls)]}

    // console.log("req.body.urls  : " + typeof(req.body.urls))

    if(response && !req.body.isUpdated)
        {
            return (res.status(208).json({message : 'Box is already exist with same name at same location'}))
        }
    else if(response && req.body.isUpdated && req.body._id!=null)
        {
            const doc = await BoxModal.findOneAndUpdate({_id : req.body._id},req.body)
            if(doc)
                {
                    return res.status(308).json({message : 'Box Updated successfully',data : doc})
                }
        }
    else{
        boxModal.save().then((data)=>{
            console.log('Box added successfully')
           return res.status(308).json({message : 'Box Added',data : data})
        }).catch((error)=>{
            console.log(error)
        })
    }

    // res.status(308).json({message : 'Box Data got'})
    // res.
}

export{addBoxController}