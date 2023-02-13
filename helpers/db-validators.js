const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({ rol });
    if( !existeRol ){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

//Validar si el email ya existe en la BD
const existeEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if( existeEmail ){
        throw new Error(`El Correo electronico ${email} ya fue registrado`);
    }
}

//Validar si el email ya existe en la BD
const existeUsuarioPorID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if( !existeUsuario ){
        throw new Error(`El ID ${id} no existe en la BD`);
    }
}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID
}