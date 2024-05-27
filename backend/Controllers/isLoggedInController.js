// import mongooes from "mongoose"

import { User } from "../Model/UserModal.js"
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'
const isLoggedInController = async (req,res)=>{
    const isLoggedIn = req.cookies.userData
    if(isLoggedIn)
    {
        const varifiedToken = jwt.verify(isLoggedIn._token,'shhhhh')
        // const r = await User.findById()
        const response = await User.findById({_id : varifiedToken._id})
        if(response)
        {
            const data = {
                fname : response.fname,
                lname : response.lname,
                email : response.email,
                userType : response.userType
            }
            res.status(250).json({message : 'User Logged in',userData : data ,isLoggedIn : true})
        }
    }
    else{
        res.status(380).json({message : 'User is not logged in',isLoggedIn : false})
    }
}

export {isLoggedInController}