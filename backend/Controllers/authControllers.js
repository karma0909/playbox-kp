import {User} from '../Model/UserModal.js'
// import express from 'express'
import mongooes from 'mongoose'
import bcrypt from 'bcrypt'
import {compare} from 'bcrypt'
import jwt from 'jsonwebtoken'


const loginController = async(req,res)=>{
    console.log('Login Controller is called')

    const {email,password,userType} = req.body

    const response = await User.findOne({'email' : email})
    if(response && userType === response.userType)
    {
        const result = compare(password,response.password)
        // const  result = await User.comparePassword(password,
        if(result)
        {
            console.log('User Logedin Successfully')
            
            //delete all cookies
            res.clearCookie('userData')
            
            //create a jwt token
            const token = jwt.sign({_id : response._id},'shhhhh')


            // set a cookie
            res.cookie('userData',{
                // _id : response._id,
                _token : token
            },{expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)})

            res.status(308).json({status: 308, message: 'Login Successfully redirect to home page',userData : {
                fname : response.fname,
                lname : response.lname,
                email : response.email,
                userType : response.userType,
            }})
        }
        else{
            console.log('Please Enter Correct Password')
        }
    }
    else{
        console.log('User Does not exist')
    }

}

const signupController = (req,res)=>{
    console.log(req.body)
    const {fname,lname,email,password,userType} = req.body

    User.findOne({'email': email}).then((userExist)=>{
        // console.log(userExist)
        if(userExist)
        {
            console.log('User Already Exist')
            // alert('User is Already Exist')
        //    return res.status(422).json({error : 'User already Exist'})
        }else{
            const user = new User({fname,lname,email,password,userType})
            user.save().then((data)=>{
                console.info('User Registered Successfully')
                console.log(data)

                //delete all cookies
                res.clearCookie('userData')
                
                //create a jwt token
                const token = jwt.sign({_id : data._id},'shhhhh')
                
                
                // set a cookie
                res.cookie('userData',{
                // _id : response._id,
                _token : token
            },{expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)})

            res.status(308).json({status: 308, message: 'Registration Successfully redirect to home page',userData : {
                fname : data.fname,
                lname : data.lname,
                email : data.email,
                userType : data.userType,
            }})

                // res.cookie('userData',{
                //     fname : response.fname,
                //     lname : response.lname,
                //     email : response.email,
                //     userType : response.userType,
                // },{expires : new Date(Date.now() + 15 * 24 * 60 * 60 * 1000)})
    
            }).catch((error)=>{
                console.log(error)
            })
        }
    }).catch((error)=>{console.error(error)})
}


export {loginController,signupController}