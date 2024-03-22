const express = require('express');
const router = express.Router();

//Hacemos referencia al controlador para utilizar los metodos del controller
const authController = require('../cotrollers/authController')

// Router para las vistas
router.get('/', (req, res) => {
    res.render('index')
})
router.get('/login', (req, res) => {
    res.render('login', { alert: false })
})
router.get('/register', (req, res) => {
    res.render('register')
})

//router para los metodos del controller 
router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router;
