const {body} = require('express-validator');

let errors = [
    body('title').notEmpty().withMessage('El titulo no puede estar vacío').withMessage('Debe ingresar entre 5 y 10 caractéres'),
    body('content').notEmpty().withMessage('El cotenido no puede estar vacío')
    

]

module.exports = errors;