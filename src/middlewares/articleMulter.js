//Multer + path
const multer = require('multer');
const path = require('path');

//Guardo en memoria el archivo cargado
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {

    //Primero seteo el type del archivo
    let type = file.mimetype.startsWith('image/');

    //Creo un array de extensiones que se aceptan
    let extesionesAceptadas = ['.png', '.gif', '.jpg', '.jpeg']

    //Obtengo la extensión del archivo que se carga
    let fileExtension = path.extname(file.originalname)

    //Realizo la validacion
    return type && extesionesAceptadas.includes(fileExtension) ? cb(null, true) : cb(null, false);
};

const upload = multer({storage, fileFilter});

module.exports = upload;