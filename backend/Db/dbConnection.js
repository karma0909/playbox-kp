import mongoose from 'mongoose'

async function getConnection()
{
    const uri = process.env.DATABASE
    mongoose.connect(uri,{useNewUrlParser: true}).then(()=>{
        console.log("MongoDB connected successfully")
    }).catch((error)=>{
        console.log(error)
    })
}

export default getConnection