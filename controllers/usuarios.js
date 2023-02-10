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