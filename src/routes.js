const express = require('express');
const router = express.Router();
const Address = require('./models/Address');
const Consult = require('./models/Consult');
const Medic = require('./models/Medic');
const Institution = require('./models/Institution');
const User = require('./models/User');
const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken');
const buscaCep = require('busca-cep');

router.post('/institution', (req, res) => {

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
            let institution = new Institution({
                cnpj: req.body.cnpj,
                name: req.body.name,
                password: req.body.password,
                phone: req.body.phone,
                rating: 0,
                type: req.body.type,
                address: result._id
            })

            institution
                .save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: "institution saved",
                        institution: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Error")
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Error")
        })
});

router.post('/institutionLogin', (req, res) => {
    const credentials = basicAuth(req)
    const privateKey = process.env.JWT_SECRET_KEY

    if (!credentials || credentials.name == "" || credentials.pass == "") {
        console.error('No credentials')
        res.status(401).end('No Credentials')
    } else {
        Institution
            .findOne({ cnpj: credentials.name, password: credentials.pass })
            .then(result => {
                if (result == null) {
                    console.log('Access denied')
                    res.status(401).end('Access denied')
                } else {
                    let name = result.name
                    let token = jwt.sign({ name }, privateKey, { expiresIn: 86400 }) // token vale 24h
                    res.status(200).json({ user: result._id, token: token })
                }
            })
            .catch(err => {
                console.log('Access denied: ', err)
                res.status(401).end('Access denied')
            })
    }
})

router.get('/cep/:cep', (req, res) => {
    buscaCep(req.params.cep, { sync: false, timeout: 3000 })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(`Erro: statusCode ${err.statusCode} e mensagem ${err.message}`);
            res.status(400).send('Bad Request')
        });
});

router.get('/institution/:id', (req, res) => {
    Institution
        .find({ _id: req.params.id })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(401).end('Bad Request')
        })
});

router.get('/medic/:name', (req, res) => {
    Medic
        .findOne({ name: req.params.name })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(401).end('Bad Request')
        })
});

router.get('/patient/:name', (req, res) => {
    User
        .findOne({ name: req.params.name })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(401).end('Bad Request')
        })
});

router.get('/consults/:institution', (req, res) => {
    Consult
        .find({ institution: req.params.institution })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(401).end('Bad Request')
        })
});

router.get('/consults/:medic', (req, res) => {
    Consult
        .find({ medic: req.params.medic })
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log('Error: ', err)
            res.status(401).end('Bad Request')
        })
});

router.post('/consult', (req, res) => {
    console.log(req.body)
    let consult = new Consult({
        medic: req.body.medic,
        institution: req.body.institution,
        Date: req.body.date,
        patient: req.body.patient
    })

    consult
        .save()
        .then(result => {
            res.send({message: "consult created", consult: result})
        })
        .catch(err => {
            console.log("Error: ", err)
            res.status(400).end('Bad Request')
        })
});

router.post('/medic', (req, res) => {

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
            let medic = new Medic({
                name: req.body.name,
                cpf: req.body.cpf,
                specialty: req.body.specialty,
                crm: req.body.crm,
                work: req.body.work,
                consultValue: req.body.consultValue,
                address: result._id
            })

            medic
                .save()
                .then(result => {
                    console.log(result)
                    res.status(201).json({
                        message: "medic saved",
                        medic: result
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).send("Error")
                })
        })
        .catch(err => {
            console.log(err)
            res.status(400).send("Error")
        })
});

module.exports = router