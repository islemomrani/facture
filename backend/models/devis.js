//import mongoose module 
const mongoose = require("mongoose");

//create devis schema (attributes with type)
const devisSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    name: String,
    description: String,
    duration: String,
    priceHt: Number,
    tva: Number,
    priceTtc: Number,
    quantity: Number,
    date: String,
    status: String,

    formationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Formation"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

})
//create model Name(pascalCase) and affect to Schema
const devis = mongoose.model('Devis', devisSchema);

//make devis exportable
module.exports = devis;