const jwt = require('jsonwebtoken'); //Para la autenticacion 
const bcryptjs = require('bcryptjs'); //Para ecriptar la clave
const conexion = require('../database/db') //Hacemos referencia a la conexion de la bd
const { promisefy } = require('util'); //Indicamos que vamos a utlizar promesas, asyncronismo. 
const { error } = require('console');

//metodo para registrarnos

exports.register = async (req, res) => { //Cuando demos click en registrar el boton submit envia todo los datos del form al register que es un metodo no es la plantilla. 
    try {
        const name = req.body.name  //Capturando los datos
        const user = req.body.user
        const pass = req.body.pass

        //Hashing de password
        let passHash = await bcryptjs.hash(pass, 8)
        console.log(passHash)
        //Sentencia SQL para insertar estos datos en la bd
        conexion.query('INSERT INTO users SET ?', { user: user, name: name, pass: passHash }, (error, results) => {
            if (error) { console.log(error) }
            res.redirect('/')
        })

    } catch (error) {
        console.log(error)
    }



}

exports.login = async (req, res) => {
    try {
        const user = req.body.user
        const pass = req.body.pass

        if (!user || !pass) {
            res.render('login', {
                alert: true,
                alertTitle: 'Advertencia',
                alertMessage: 'Ingrese usuario y contraseña',
                alertIcon: 'info',
                showConfirmButton: true,
                timer: 1500,
                ruta: 'login'
            }) //Hacemos referencia a la plantilla
        } else {
            conexion.query('SELECT * FROM users WHERE user = ?', [user], async (error, results) => {
                if (results.length == 0 || !(await bcryptjs.compare(pass, results[0].pass))) {
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Verificar',
                        alertMessage: 'Usuario y/o contraseña incorrectos',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: 1500,
                        ruta: 'login'
                    })
                } else {
                    //Inicio de sesion validado
                    const id = results[0].id
                    const token = jwt.sign({ id: id }, process.env.JWT_SECRETO, {
                        expiresIn: process.env.JWT_TIEMPO_EXPIRA
                    })
                    console.log("Token: " + token + "para el usuario: " + user);

                    const cookiesOptions = {
                        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
                        httpOnly: true
                    }
                    res.cookie('jwt', token, cookiesOptions)
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: '¡LOGIN CORRECTO!',
                        alertIcon: 'success',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: ''
                    })
                }
            })
        }

    } catch (error) {
        console.log(error)
    }
}