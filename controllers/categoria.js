const { response, request } = require('express');

const { Categoria } = require('../models');

const categoriaGetAll = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate( 'usuario', 'nombre email' )
        .skip(desde)
        .limit(Number(limite))
    ]);

    try {
        
        res.json({
            total,
            categorias
        });

    } catch (error) {
        res.status(400).json({
            msg: 'Error inesperado, contacte al administrador'
        });
    }
        
}

const categoriaGet = async (req = request, res = response) => {

    const id = req.params.id;

    const categoriaDB = await Categoria.findById(id).populate( 'usuario', 'nombre email' );

    try {
        res.status(201).json({
            categoriaDB
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado, contacte al administrador'
        })
    }

        
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

    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase(); 
    const usuario = req.usuario._id;

    const data = {
        nombre,
        usuario
    }
        
    try {

        const categoriaDB = await Categoria.findByIdAndUpdate(id, data)

        res.json({
            ok: true,
            msg: 'Put del API',
            categoriaDB
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Put del API'
        });
    }

}

const categoriaDelete = async (req = request, res = response) => {
    
    const id = req.params.id;

    const categoriaDelete = await Categoria.findByIdAndUpdate(id, { estado: false });

    try {
        res.json({
            ok: true,
            categoriaDelete,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Delete del API'
        });
    }

}

/* Exportar todos los modulos en un arreglo */
module.exports = {
    categoriaGetAll,
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
}