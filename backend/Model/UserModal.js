import mongooes from  "mongoose"
import bcrypt from 'bcrypt'
const userSchema = mongooes.Schema({
    fname : {
        type : String,
        required : true
    },
    lname : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
   
})


userSchema.pre('save',async function(next){
    
    if(!this.isModified('password')){
        return next()
    }
    this.password = await bcrypt.hash(this.password,12)
    next()
})

const User = mongooes.model('USER',userSchema)

// mongooes.model().findById()

export {User}