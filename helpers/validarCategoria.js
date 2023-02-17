const Categoria = require('../models/categoria');

//Validar si el ID de la Categoria ya existe en la BD
const existeCategoriaPorID = async (id) => {
    const existeCategoria = await Categoria.findById(id);
    if( !existeCategoria ){
        throw new Error(`La categoria con el ID ${id}, no existe en la BD`);
    }
}

module.exports = {
    existeCategoriaPorID
}