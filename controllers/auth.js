const User = require('../models/user')
const shorId = require('shortid')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')

exports.signup = (req, res) => {
    console.log('Auth Route')
    const {
        name,
        email,
        password
    } = req.body

    User.findOne({
        email: email
    }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: 'E-mail already taken'
            })
        }
    })

    let username = shorId.generate()
    let profile = `${process.env.CLIENT_URL}/profile/${username}`

    let newUser = new User({
        name,
        email,
        password,
        profile,
        username
    })
    newUser.save((err, success) => {
        if (err) {
            return res.status(400).json({
                error: err
            })
        }

        return res.json({
            message: 'Signup a success! Please signin'
        })
    })
}

exports.signin = (req, res) => {
    const {
        email,
        password
    } = req.body
    //if user exists
    User.findOne({
        email
    }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "No user with that e-mail, please signup"
            })
        }
        //authenticate
        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Authentication failed, check the e-maila and password"
            })
        }
        //generate jason web token
        const token = jwt.sign({
            _id: user._id
        }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        })

        res.cookie('token', token, {
            expiresIn: '1h'
        })

        const {
            _id,
            username,
            name,
            email,
            role
        } = user
        return res.json({
            token,
            user: {
                _id,
                username,
                name,
                email,
                role
            }
        })
    })
}

exports.signout = (req, res) => {
    res.clearCookie('token')
    res.json({
        messages: 'Signed out success'
    })
}

exports.requireSignin = expressJwt({secret: process.env.JWT_SECRET})