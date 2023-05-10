const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const rutas = require('./routes/rutas')

const PORT = process.env.PORT
const URI_MONGOOSE  = process.env.URI_MONGOOSE
const password = process.env.MONGO_PASSWORD
const app = express()

app.use(express.static(__dirname + '/public'));
app.use(express.json()) //esto tiene que ir ANTES DE LAS RUTAS
app.use('/api', rutas)



mongoose.connect(`mongodb+srv://jonurbacorreo:${password}@cluster0.ubu1kff.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>console.log(`Connected to database`))
.catch((error) => console.log(error))

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)
})
