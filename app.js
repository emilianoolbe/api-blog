//Conexión + Express + Cors + enrutador
const {connection} = require('./src/database/connection');
const express = require('express');
const cors = require('cors');
const articleRouter = require('./src/routes/article');
const { urlencoded } = require('express');

//Ejecución express + Conectar a la db
connection();
const app = express();


// ---> Middlewalres <--- 

// Cors
app.use(cors());

// Parseo del body a JS
app.use(express.json());

// Parseo data por url
app.use(express.urlencoded({extended: true}))


// ---> FIN Middlewalres <---

//Levanto servidor
app.listen(3010, () => {console.log('Servidor levantado en el puerto 3010');});


//Rutas
app.use('/api', articleRouter);
