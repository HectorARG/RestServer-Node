const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL )
const { request, response } = require('express');
const { subirArchivo } = require('../helpers/subir-archivo');

const { Usuario, Producto } = require('../models')

const cargarArchivo = async (req = request, res = response) => {
    
    try {
        // const nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        });
    } catch (error) {
        res.status(400).json({
            msg: `${ error }`
        });
    }
}

const actualizarImagen = async(req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuarios con el ID: ${ id }`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                })
            }
        break;
    
        default:
        return res.status(500).json({msg: 'Error inesperado, contacte al administrador del sistema'});
    }

    /* Limpiar imagenes previas */
    try {
        if( modelo.img ){
            const pathImagen = path.join( __dirname, '../uploads', coleccion , modelo.img );
            if( fs.existsSync(pathImagen) ){
                fs.unlinkSync(pathImagen);
            }
        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error inesperado, contacte al admninistrador'
        })
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion );
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

}

const actualizarImagenCloudinary = async(req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuarios con el ID: ${ id }`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                })
            }
        break;
    
        default:
        return res.status(500).json({msg: 'Error inesperado, contacte al administrador del sistema'});
    }

    /* Limpiar imagenes previas */
    try {
        if( modelo.img ){

            const nombreArr = modelo.img.split('/');
            const nombre = nombreArr[ nombreArr.length - 1 ];
            const  [ public_id ] = nombre.split('.');
            cloudinary.uploader.destroy( public_id );            
        }
        const { tempFilePath } = req.files.archivo;
        const { secure_url } = await cloudinary.uploader.upload( tempFilePath );
        modelo.img = secure_url;
        await modelo.save();
        res.json(modelo);

    } catch (error) {
        return res.status(500).json({
            msg: 'Error inesperado, contacte al admninistrador'
        })
    }
}

const mostrarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un usuarios con el ID: ${ id }`
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if( !modelo ){
                return res.status(400).json({
                    msg: `No existe un producto con el ID: ${ id }`
                })
            }
        break;
    
        default:
        return res.status(500).json({msg: 'Error inesperado, contacte al administrador del sistema'});
    }

    try {
        if( modelo.img ){
            const pathImagen = path.join( __dirname, '../uploads', coleccion , modelo.img );
            if( fs.existsSync(pathImagen) ){
                res.sendFile( pathImagen );
            }
        }else {
            const pathNoImagen = path.join( __dirname, '../assets' , 'noimage.webp' );
            res.sendFile( pathNoImagen );

        }
    } catch (error) {
        return res.status(500).json({
            msg: 'Error inesperado, contacte al admninistrador'
        })
    }
}


module.exports = {
    cargarArchivo,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen,
}