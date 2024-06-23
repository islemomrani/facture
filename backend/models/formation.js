//import mongoose module
const mongoose=require('mongoose');

//create formation schema (attributes with type)
const formationSchema=mongoose.Schema({
    name:String,
    description:String,
    duration:String,
    priceHt:Number,
    priceTtc:Number,
    tva:Number,
    picture:String,
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

//create model Name(pascalCase) and affect to Schema
const formation=mongoose.model('Formation',formationSchema);

//make formation exportable
module.exports=formation;