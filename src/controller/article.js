//Modelo + express-validator + sharp + path
const Articulo = require('../database/models/Article');
const {validationResult} = require('express-validator');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

//Prueba
const test = (req, res) => {
    return res.status(200).json({
        mensaje:'Prueba de controlador'
    })
};

// ---> Funcionalidades <---

//Crear artículo
const create = (req, res) => {

    let errors = validationResult(req);

    if (errors.isEmpty()) {

        //Creo el objeto a guardar
        const article = new Articulo(req.body);

        //Guardo el objeto en la base de datos
        article.save((error, articleStorage) => {

            if (error || !articleStorage) {
                return res.status(400).json({
                    status: 'Error',
                    message: 'No se ha podido guardar el elemento en la base de datos'
                });
            };

            return res.status(200).json({
                status: 'success',
                article: articleStorage
            });
        });

    }else{

        return res.status(400).json({
            status: 'Error',
            message: errors.mapped()
        });
    };
};

//Todos los artículos
const get = (req, res) => {
    let consult = Articulo.find({});
    
    if (req.params.ultimos) {
        consult.limit(2);
    }

    consult.exec((error, articles) => {
        
        if (error || !articles) {
            return res.status(404).json({
                status: 'Error',
                message: 'No se han encontrado los artículos'
            });
        };
            
        return res.status(200).json({
            count: articles.length,
            status: 'success',
            articles
        });
        
    }); 
};

//Artículo By Id
const one = (req, res) => {
    Articulo.findById(req.params.id).exec((error, article) => {
        if (error || !article) {
            return res.status(404).json({
                status: 'Error',
                message: 'No se encontró el artículo seleccionado'
            });
        };

        return res.status(200).json({
            status: 'success',
            article
        });
    });
};

//Eliminar artículo
const deleteArticle = (req, res) => {

    Articulo.findByIdAndDelete(req.params.id).exec((error, article) => {

        if (error || !article) {
            return res.status(404).json({
                status: 'Error',
                 message: 'No se encontró el artículo seleccionado'
            });
        }else{

            let filePath = path.join(__dirname,  `../images/articles/${article.image}`);
            fs.unlinkSync(filePath);
            return res.status(200).json({
                status: 'success',
                article
            });
        }

    
    });
};

//Editar artículo
const editArticle = (req, res) => {

    let errors = validationResult(req)

    if (errors.isEmpty()) {

        Articulo.findByIdAndUpdate(req.params.id, req.body, {new: true})
            
            .exec((error, articleUpdated) => {
                if (error || !articleUpdated) { 
                    return res.status(400).json({
                        status:'Error',
                        message:'Error al actualizar artículo'
                    });
                };

                return res.status(200).json({
                    status:'success',
                    articleUpdated
                });
            });

    }else{
        return res.status(400).json({
            status:'error',
            errors: errors.mapped()
        })
    }
};

//Cargar imagen a un artículo
const upload = async(req, res) => {

    if (req.file) {

        //Creo el nombre del file
        const fileName = `article-${Date.now()}${path.extname(req.file.originalname)}`;

        //Sharp resize de img y guardado servidor
        const file = await sharp(req.file.buffer).resize(400,400).toFile(`${path.join(__dirname, '../images/articles/')}${fileName}`)
        
        //Busco el artículo por id y le actualizo la img
        return Articulo.findByIdAndUpdate(req.params.id, {image: fileName}, {new : true}).exec((error, article) => {
            
            if (error || !article) {
                
                res.status(400).json({
                    status:'Error',
                    message:'No se ha podido actualizar imagen'
                })
            };
                
            res.status(200).json({
                status: 'success',
                file,
                article
            });
            
        });
    };

    //Como no recibo nada en file porque no pasó la validación de Multer retorno error 400
    return res.status(400).json({
        status:'Error',
        message: 'Las extensiones aceptadas son .png .gif .jpg .jpeg'
    });

};



//Devolver una imagen
const oneImage = (req, res) => {
  
    let imgName = req.params.imgName;
    let rutaFisica = `${path.join(__dirname, '../images/articles/')}${imgName}`

    if(fs.existsSync(rutaFisica)){

        return res.sendFile(rutaFisica); 
    }else{
        return res.status(404).json({
            status: 'Error',
            message: 'La imagen no se encontró',
            nameImg: imgName
        })
    }
};
//Buscador de art{iculos
const search = (req, res) => {
    //Obtengo la palabra a buscar
    const wordToSearch = req.params.search;

    //Hago la consulta a la db
    Articulo.find({ 

        '$or':[ 
            {'title' : {'$regex': wordToSearch, '$options' : 'i'}},
            {'content' : {'$regex': wordToSearch, '$options' : 'i'}}, 
        ]
    })
    .exec((error, article) => {
        
        if (error || !article || article.length <= 0) {
            return res.status(404).json({
                status: 'Error',
                message: 'No se han encontrado artículos'
            });
        }else{
            return res.status(200).json({
                status: 'Success',
                article
            });
        };
    });
};
module.exports = {test, create, get, one, deleteArticle, editArticle, upload, oneImage, search};

