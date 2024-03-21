const express = require('express');
const dotenv = require('dotenv');
//const coockieParser = require('cookie-parser');

const app = express();

//seteamos el motor de plantillas (node necesita esto para poder pasar variables (?))

app.set('view engine', 'ejs');

//seteamos la carpeta public para archivos estaticos

app.use(express.static('public'));

//configuramos node para que procese los datos que van a hacer enviados en los formularios etc

app.use(express.urlencoded({ extended: true })) //En resumen, estas dos líneas de código configuran la aplicación Express para poder manejar tanto datos enviados en formato x-www-form-urlencoded (por ejemplo, desde formularios HTML) como datos en formato JSON. Esto es crucial para poder interpretar y manipular los datos enviados desde el cliente en diferentes formatos en las rutas y controladores de la aplicación.
app.use(express.json());

//seteamos variables de entorno

dotenv.config({ path: './env/.env' })

//seteamos las cookies

//app.use(coockieParser);

//llamar al router

app.use('/', require('./routes/router'))

app.listen(3000, () => {
    console.log('SERVER UP ---> http://localhost:3000')
})