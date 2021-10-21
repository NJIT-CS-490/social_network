const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        min: 3,
        max: 20,
        unique: true,
    },
    password:{
        type:String,
        required: true,
        min: 5,
        max: 20,
    },
    profilePicture:{
        type:String,
        default:""
    },
    coverPicture:{
        type:String,
        default:""
    },
    team:{
        type:String,
        required: false,
        min: 10,
        default: "",
    },
    followers:{
        type:Array,
        default: [],
    },
    following:{
        type:Array,
        default: [],
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    desc:{
        type:String,
        max:50
    },
    city:{
        type:String,
        max:50
    },
    from:{
        type:String,
        max:50
    },
},
{timestamps: true}
);

module.exports = mongoose.model("User", UserSchema);