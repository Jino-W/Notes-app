const express = require('express') 
const router = require('./config/routes')
const connectToDb = require('./config/database')
const app = express()
const cors = require('cors')
const port = 3015

app.use(express.json()) 
connectToDb()

// app.get('/', function(req, res){
//     res.send('Welcome to the app')
// })

app.use(cors())
app.use('/', router)

app.listen(port,()=>{
    console.log('listening to port', port)
})

