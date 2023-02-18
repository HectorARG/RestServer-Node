const { response, request } = require('express');

const { Producto } = require('../models');

const productosGetAll = async (req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate( 'usuario', 'nombre email' )
        .populate('categoria', 'nombre')
        .skip(desde)
        .limit(Number(limite))
    ]);

    try {
        res.json({
            total,
            productos
        });
    } catch (error) {
        res.status(400).json({
            msg: 'Error inesperado, contacte al administrador'
        });
    }
        
}

const productoGet = async (req = request, res = response) => {

    const id = req.params.id;
    const categoriaDB = await Producto.findById(id).populate( 'usuario', 'nombre email' ).populate('categoria', 'nombre');

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

const productoPost = async (req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase();
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion.toUpperCase();
    
    const productoDB = await Producto.findOne({nombre});

    if( productoDB ){
        return res.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe`
        })
    }
    const usuario = req.usuario._id;

    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        usuario
    }

    try {

        const producto = new Producto(data);

        await producto.save();

        res.status(201).json({
            msg:'Registro creado con exito',
            producto: producto
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'Error inesperado, contacte al administrador'
        })
    }

}

const productoPut = async (req = request, res = response) => {

    const id = req.params.id;
    const nombre = req.body.nombre.toUpperCase();
    const precio = req.body.precio;
    const categoria = req.body.categoria;
    const descripcion = req.body.descripcion.toUpperCase();
    const usuario = req.usuario._id;

    const data = {
        nombre,
        precio,
        categoria,
        descripcion,
        usuario
    }
        
    try {

        const productoDB = await Producto.findByIdAndUpdate(id, data)

        res.json({
            ok: true,
            msg: 'Put del API',
            producto: productoDB
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Put del API'
        });
    }

}

const productoDelete = async (req = request, res = response) => {
    
    const id = req.params.id;

    const productoDelete = await Producto.findByIdAndUpdate(id, { estado: false });

    try {
        res.json({
            msg: `Producto ${ productoDelete.nombre }, eliminado exitosamente...`,
            categoriaDelete: productoDelete,
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
    productosGetAll,
    productoGet,
    productoPost,
    productoPut,
    productoDelete,
}