const jwt = require('jsonwebtoken'); //Para la autenticacion 
const bcryptjs = require('bcryptjs'); //Para ecriptar la clave
const conexion = require('../database/db') //Hacemos referencia a la conexion de la bd
const { promisefy } = require('util'); //Indicamos que vamos a utlizar promesas, asyncronismo. 

//metodo para registrarnos

exports.register = async (req, res) => { //Cuando demos click en registrar el boton submit envia todo los datos del form al register que es un metodo no es la plantilla. 
    const name = req.body.name;  //Capturando los datos
    const user = req.body.user;
    const pass = req.body.pass;
    console.log(name + " " + user + " " + pass);
}