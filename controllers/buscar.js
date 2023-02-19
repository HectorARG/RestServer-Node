const { response, request } = require('express');
const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles'
];

const buscarUsuario = async ( termino = '', res = response ) => {
    
    esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const usuario = await Usuario.findById( termino );
        return res.json({
            result:  ( usuario ) ? [ usuario ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        result:  ( usuarios ) ? [ usuarios ] : []
    })
}

const buscarCategoria = async ( termino = '', res = response ) => {
    
    esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const categoria = await Categoria.findById( termino );
        return res.json({
            result:  ( categoria ) ? [ categoria ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const categorias = await Categoria.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        result:  ( categorias ) ? [ categorias ] : []
    })
}

const buscarProducto = async ( termino = '', res = response ) => {
    
    esMongoID = ObjectId.isValid( termino );

    if( esMongoID ){
        const producto = await Producto.findById( termino );
        return res.json({
            result:  ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp( termino, 'i' );

    const productos = await Producto.find({
        $or: [{ nombre: regex }],
        $and: [{ estado: true }]
    });

    res.json({
        result:  ( productos ) ? [ productos ] : []
    })
}

const buscar = async (req = request, res = response) => {

    const { coleccion, termino } = req.params;

    if(!coleccionesPermitidas.includes(coleccion)){
        return res.status(404).json({
            msg: `No existe ninguna seccion con el nombre ${ coleccion }`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario( termino, res );
        break;
        case 'categorias':
            buscarCategoria( termino, res );
        break;
        case 'productos':
            buscarProducto( termino, res );
        break;
    }

}

module.exports = {
    buscar
}

