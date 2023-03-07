//Controlador + Express + Router + express-validator + multer
const articleController = require('../controller/article');
const express = require('express');
const router = express.Router();
const validation = require('../middlewares/articleValidation');
const upload = require('../middlewares/articleMulter');

//Prueba
router.get('/test', articleController.test);

// --> Rutas <--

//Crear artículos
router.post('/article/create', validation, articleController.create);

//Todos los artículos
router.get('/article/all/:ultimos?', articleController.get);

//Articulo por Id
router.get('/article/:id', articleController.one);

//Eliminar artículo
router.delete('/article/:id', articleController.deleteArticle);

//Editar artículo
router.put('/article/:id', validation, articleController.editArticle);

//Subida de archivos
router.post('/article/file/:id', upload.single('file2'), articleController.upload);

//Imagen por name
router.get('/article/file/:imgName', articleController.oneImage);

//Buscador
router.get('/article/search/:search', articleController.search);



module.exports = router;

