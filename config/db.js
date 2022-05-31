const mongoose = require('mongoose');
const password = '3dIvYTqRw5hcEtpR';
const dbname = 'sistemas';
const uri = `mongodb://localhost:27017/crud_agenda`;

module.exports = () => {

    const connect = () => {
        mongoose.connect(
            uri,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                keepAlive: true
            },
            (err) => {
                if (err) {
                    console.log('Error en conexion a BD...!!!');
                } else {
                    console.log('Conectado a mongodb!')
                    console.log('Server iniciado en el puerto: http://localhost:3000')
                }
            }
        );
    }

    connect();
};