const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

port = process.env.PORT

mongoose.connect(process.env.db, { useNewUrlParser: true, useUnifiedTopology: true })

const routes = require('./routes/routes')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(port, () => {
    console.log(`Ouvindo o server em ${port}`)
}) 