const express = require('express')
const itemRouter =require('./routers/item')
var  cors = require('cors')

require('./db/mongoose')

const port = process.env.PORT

const app = express()

app.use(cors())
app.use(express.json())
app.use(itemRouter)

app.listen(port, () => {
    console.log('server listening on port ' + port)
})