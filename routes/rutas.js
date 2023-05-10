const express = require('express')
const voteSchema = require('../models/preguntas.js')
const preguntas = require('../models/preguntas.js')
const path = require('path')
const fs = require('fs')
const router = express.Router()


///////////////////////////////////////////////////////////////////////////////////////////////////
///// RUTAS ///////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////

const html = path.join(__dirname, '../public/index.html')
console.log(html)
router.get('/', (req,res) =>{
    fs.readFile(html, 'utf-8', (err,data) =>{
        if(err)throw error
        res.send(data)

    })
})
// get ALL RESULTS
router.get('/datos', (req,res) =>{
    voteSchema
    .find()
    .then((data) => res.json(data)) 
    .catch((error)=> res.json({message:error}))
})


// get RESULT BY ID
router.get('/datos/:id', (req,res) =>{
    const { id } = req.params    // el id se consigue de los parametros de la request en la url
    voteSchema
    .findById(id)
    .then((data) => res.json(data)) 
    .catch((error)=> res.json({message:error}))
})


// post ONE RESULT
router.post('/post', (req,res)=>{
    const newData = voteSchema(req.body)
    newData
    .save()  // para guardar al usuario
    .then((data) => {
        res.json(data)
        console.log(data)
    }) 
    .catch((error)=> res.json({message:error}))
})

// // edit ONE RESULT
router.put('/put/:id', (req, res) => {
    const { id } = req.params;
    const { voto1, voto2 } = req.body;
  
    voteSchema.findByIdAndUpdate(id, { voto1, voto2 }, { new: true })
      .then((data) => {
        res.json(data);
        console.log(data)
      })
      .catch((error) => {
        res.json({ message: error });
      });
  });
  

// // delete ONE RESULT
router.delete('/delete/:id', (req,res)=>{
    const { id } = req.params
    voteSchema
    .deleteOne({_id:id})
    .then((data) => res.json(data))  
    .catch((error)=> res.json({message:error}))
})



module.exports = router

