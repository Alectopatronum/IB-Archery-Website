const mongoose = require("mongoose");
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema(
    {
    name: String,
    email: {type:String, unique:true},
    password: String,
    WAP_id: Number,
    discipline: String,
    category: String,
    }
);

const UserModel = mongoose.model('User', UserSchema);


module.exports = UserModel;

