const { response } = require('express');

const usuariosGet = (req, res = response) => {
        
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

const usuariosPost = (req, res = response) => {
        
    try {
        res.json({
            ok: true,
            msg: 'Post del API'
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Post del API'
        });
    }
}

const usuariosPut = (req, res = response) => {
        
    try {
        res.json({
            ok: true,
            msg: 'Put del API'
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Put del API'
        });
    }
}

const usuariosPatch = (req, res = response) => {
        
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

const usuariosDelete = (req, res = response) => {
        
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

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}