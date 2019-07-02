const express = require('express')
const router = express.Router()
const Address = require('./models/Address')
const User = require('./models/User')
const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken');

router.post('/address', (req, res) => {
    let complement = req.body.complement ? req.body.complement : ''

    let address = new Address({
        cep: req.body.cep,
        street: req.body.street,
        number: req.body.number,
        complement: complement,
        city: req.body.city,
        state: req.body.state
    })

    address
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "address saved",
                address: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Error")
        })
});

router.post('/user', (req, res) => {
    let user = new User({
        name: req.body.name,
        login: req.body.login,
        password: req.body.password,
        age: req.body.age,
        cpf: req.body.cpf,
    })

    user
        .save()
        .then(result => {
            console.log(result)
            res.status(201).json({
                message: "user saved",
                user: result
            })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Error")
        })
});

router.post('/login', (req, res) => {
    var credentials = basicAuth(req)
    const privateKey = process.env.JWT_SECRET_KEY

    if (!credentials || credentials.name == "" || credentials.pass == "") {
        console.error('No credentials')
        res.status(401).end('No Credentials')
    } else {
        User
            .findOne({ login: credentials.name, password: credentials.pass })
            .then(result => {
                if (result == null) {
                    console.log('Access denied')
                    res.status(401).end('Access denied')
                } else {
                    let name = result.name
                    let token = jwt.sign({ name }, privateKey, { expiresIn: 86400 }) // token vale 24h
                    res.status(200).json({ user: name, token: token })
                }
            })
            .catch(err => {
                console.log('Access denied: ', err)
                res.status(401).end('Access denied')
            })
    }
})

module.exports = router