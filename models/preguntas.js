const mongoose = require('mongoose')

const Pregunta = mongoose.Schema({
    opcion1:{
        type:String,
        required:true
    },
    opcion2:{
        type:String,
        required:true
    },
    voto1:{
        type:Number
    },
    voto2:{
        type:Number
    }
   
})

module.exports = mongoose.model('pregunta', Pregunta)