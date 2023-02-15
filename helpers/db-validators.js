const Role = require('../models/role');
const Usuario = require('../models/usuario');

//Validar los roles en la base de datos
const esRoleValido = async (role = '') => {
    const existeRol = await Role.findOne({ role });
    if( !existeRol ){
        throw new Error(`El rol ${ role } no esta registrado en la base de datos`);
    }
}

//Validar si el email ya existe en la BD
const existeEmail = async (email = '') => {
    const existeEmail = await Usuario.findOne({email});
    if( existeEmail ){
        throw new Error(`El Correo electronico ${email} ya fue registrado`);
    }
}

//Validar si el ID del usuario ya existe en la BD
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