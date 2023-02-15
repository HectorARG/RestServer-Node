const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({

    nombre: {
        type: String,
        require: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        require: [true, 'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        require: [true, 'La contraseña es obligatorio'],
    },
    img: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        require: true,
        enum: ['USER_ROLE', 'ADMIN_ROLE']
    },
    google: {
        type: Boolean,
        default: false
    }

});

UsuarioSchema.method('toJSON', function(){
    const { __v, _id, password, ...object } = this.toObject()
    object.uid = _id;
    return object;
});

module.exports = model( 'Usuario', UsuarioSchema );