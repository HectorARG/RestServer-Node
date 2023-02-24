const { Producto, Usuario } = require('../models');
const Role = require('../models/role');

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

//Validar si el ID del Producto ya existe en la BD
const existeProductoPorID = async (id) => {
    const existeproducto = await Producto.findById(id);
    if( !existeproducto ){
        throw new Error(`La producto con el ID ${ id }, no existe en la BD`);
    }
}

const coleccionesPermitidas = async( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes( coleccion );
    if( !incluida ){
        throw new Error('Coleccion invalida')
    }

    return true;

}

module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorID,
    existeProductoPorID,
    coleccionesPermitidas
}