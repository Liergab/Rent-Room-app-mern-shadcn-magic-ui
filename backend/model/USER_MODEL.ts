import mongoose, { Document, model, Schema } from 'mongoose'

export interface UserType extends Document {
    _id       : string,
    email     : string,
    password  : string,
    firstName : string,
    lastName  : string
    createdAt  : Date;
    updatedAt  : Date;
}

const userSchema = new Schema({
    email:{
        type     : String,
        unique   : true,
        required : true
    },
    password:{
        type     : String,
        required : true
    },
    firstName:{
        type      : String,
        required  : true
    },
    lastName:{
        type      : String,
        required  : true
    }
},{timestamps:true})

const User = model<UserType>('users', userSchema)

export default User;