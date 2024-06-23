//import mongoose module
const mongoose=require("mongoose");

//creation of mongoose  schema
const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    phone:String,
    email:String,
    password:String,
    picture:String,
    role:String,
    devisId:[
        {
            type:mongoose.Schema.Types.ObjectId,
        ref:"Devis"
        },
    ],
    factureId:[
        {
            type:mongoose.Schema.Types.ObjectId,
        ref:"Facture"
        },
    ]
});

//creation of model mongoose
const user=mongoose.model('User',userSchema);

module.exports=user;
