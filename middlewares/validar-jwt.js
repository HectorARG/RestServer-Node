const { response, request } = require('express');
var jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            message: 'No existe un Token activo'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY );

        /* Leer usuario autenticado */
        const usuarioAutenticado = await Usuario.findById(uid);//Solucion de Fernando Herrera
        // req.usuarioAutenticado = Usuario.findById(uid);//Mi solucion

        if( !usuarioAutenticado ) {
            return res.status(401).json({
                msg: 'Token invalido-usuario no encontrado'
            });
        }

        /* Validacion para saber si el usuario no esta en estado FALSE "ELIMINADO" */
        if( !usuarioAutenticado.estado ) {
            return res.status(401).json({
                msg: 'Token invalido'
            });
        }

        req.usuario =  usuarioAutenticado;
        next();
    } catch (error) {

        console.log(error);
        
    }


};


module.exports = {
    validarJWT
}