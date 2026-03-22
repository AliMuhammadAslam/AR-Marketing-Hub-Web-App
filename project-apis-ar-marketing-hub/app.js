const express = require('express')
var bodyParser = require('body-parser')
const morgan = require('morgan')
const createError = require('http-errors')
require('dotenv').config()
require('./helpers/init_mongodb')
const { verifyAccessToken } = require('./helpers/jwt_helper')
const { authSchema } = require('./helpers/validation_schema')
var cors = require('cors')

const authRoutes = require('./routes/auth')
const productRoutes = require('./routes/products')
const eventRoutes = require('./routes/events')
const contentRoutes = require('./routes/content')

const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', verifyAccessToken, async (req, res, next) => {
    const result = await authSchema.validateAsync(req.body)
    res.send(`Hello ${result.email}`)
})

app.use('/auth', authRoutes)
app.use('/auth', productRoutes)
app.use('/auth', eventRoutes)
app.use('/auth', contentRoutes)

app.use(async (req, res, next) => {
    next(createError.NotFound())
})

app.use((err, req, res, next) => {
    res.status(err.status || 500)
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    })
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
