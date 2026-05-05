const express = require('express')
const router = express.Router()
const createError = require('http-errors')
const User = require('../models/User')
const { authSchema } = require('../helpers/validation_schema')
const { loginAuth } = require('../helpers/login_validation')
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require('../helpers/jwt_helper')

router.post('/register', async(req, res, next) => {
    try {
        const result = await authSchema.validateAsync(req.body)

        const doesExist = await User.findOne({email: result.email})
        if (doesExist) throw createError.Conflict(`${result.email} has already been registered`)

        const user = new User(result)
        const savedUser = await user.save()
        const accessToken = await signAccessToken(savedUser.id)
        const refreshToken = await signRefreshToken(savedUser.id)

        res.json({ name:user.name, email:user.email, accessToken, refreshToken})

    } catch (error) {
        if(error.isJoi == true) error.status = 422
        console.log(error.message)
        next(error)
    }
})

router.post('/login', async(req, res, next) => {
    try {
        const result = await loginAuth.validateAsync(req.body)
        const user = await User.findOne({ email: result.email })
        if (!user) throw createError.NotFound('User not registered')

        const isMatch = await user.isValidPassword(result.password)
        if (!isMatch) throw createError.Unauthorized('Username or Password Not Valid')

        const accessToken = await signAccessToken(user.id)
        const refreshToken = await signRefreshToken(user.id)

        res.json({id:user._id, name: user.name, email:user.email, accessToken, refreshToken, isAdmin:user.isAdmin, contact:user.contact, address:user.address})

    } catch (error) {
        if (error.isJoi == true) return next(createError.BadRequest("Inavalid Username or Password"))
        next(error)
    }
})

router.post('/refresh-token', async(req, res, next) => {
    try {
        const { refreshToken } = req.body
        if (!refreshToken) throw createError.BadRequest()
        const userId = await verifyRefreshToken(refreshToken)

        const accessToken = await signAccessToken(userId)
        const refToken = await signRefreshToken(userId)

        res.send({accessToken: accessToken, refreshToken: refToken})
    } catch (error) {
        next(error)
    }
})

router.delete('/logout', async(req, res, next) => {
    res.send('logout route')
})

module.exports = router;
