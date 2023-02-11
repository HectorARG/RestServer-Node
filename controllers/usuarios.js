const { response, request } = require('express');

const usuariosGet = (req = request, res = response) => {

    const query = req.query;
        
    try {
        res.json({
            ok: true,
            msg: 'Get del API'
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Get del API'
        });
    }
}

const usuariosPost = (req = request, res = response) => {

    const body = req.body;
        
    try {
        res.json({
            ok: true,
            msg: 'Post del API',
            body
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Post del API'
        });
    }
}

const usuariosPut = (req = request, res = response) => {

    const id = req.params.id;
        
    try {
        res.json({
            ok: true,
            msg: 'Put del API',
            id
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Put del API'
        });
    }
}

const usuariosPatch = (req = request, res = response) => {
        
    try {
        res.json({
            ok: true,
            msg: 'Patch del API'
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Patch del API'
        });
    }
}

const usuariosDelete = (req = request, res = response) => {
        
    try {
        res.json({
            ok: true,
            msg: 'Delete del API'
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Delete del API'
        });
    }
}

/* Exportar todos los modulos en un arreglo */
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}