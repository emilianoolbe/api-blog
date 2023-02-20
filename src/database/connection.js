const mongoose = require('mongoose');

mongoose.set('strictQuery', true);

const connection = async() => {

    try {
        await mongoose.connect('mongodb://localhost:27017/apiBlog');
        //Puede recibir como segundo parámetro un objeto literal solamente en caso de error
        //useNewUrlParser: true
        //useUnifiedTopology: true
        //useCreateIndex: true
        console.log('Conectados correctamente a la db apiBlog');
        
    } catch (error) {
        throw new Error('No se ha podido establecer la conexión a la DB')
    }
};

module.exports = {connection};