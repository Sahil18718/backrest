const mongoose = require("mongoose")


// user Schema 
const userSchema = mongoose.Schema({
    _id: ObjectId,
    name: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    },
    menu: [{
        _id: ObjectId,
        name: String,
        description: String,
        price: Number,
        image: String
    }]
    
},{
    versionKey:false
})

const UserModel= mongoose.model("user",userSchema);

module.exports={
    UserModel
}