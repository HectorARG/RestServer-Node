const { response, request } = require('express');

const { Categoria } = require('../models');

const categoriaGet = async (req = request, res = response) => {
        
}

const categoriaPost = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe`
        })
    }
    const usuario = req.usuario._id;

    const data = {
        nombre,
        usuario
    }

    try {

        const categoria = new Categoria(data);

        await categoria.save();

        res.status(201).json({
            msg:'Registro creado con exito',
            categoria
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado, contacte al administrador'
        })
    }

}

const categoriaPut = async (req = request, res = response) => {

}

const categoriaDelete = async (req = request, res = response) => {  

}

/* Exportar todos los modulos en un arreglo */
module.exports = {
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
}