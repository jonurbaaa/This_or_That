const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const rutas = require('./routes/rutas')

const PORT = process.env.PORT
const URI_MONGOOSE  = process.env.URI_MONGOOSE
const app = express()

app.use(express.static(__dirname + '/public'));
app.use(express.json()) //esto tiene que ir ANTES DE LAS RUTAS
app.use('/api', rutas)


mongoose.connect(URI_MONGOOSE)
.then(()=>console.log(`Connected to database`))
.catch((error) => console.log(error))

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})