const mongoose = require('mongoose');

const agendaSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
        required : true
    },
    nombre: {
        type: String,
        required: true,
    },
    apellidos: {
        type: String,
        required: true,
    },
    correo: {
        type: String,
        required: true,
    },
    fecha_nac: {
        type: String,
        required: true,
    },
    imagen:{
        type: String
    }
},
{
    versionKey: false,
    timestamps: true
});

module.exports = mongoose.model('agendav3', agendaSchema);