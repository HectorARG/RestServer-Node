const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/generarJWT');

const login = async (req = request, res = response) => {

    const {  email, password } = req.body;

    try {

        /* Verificar si existe el Email del usuario */
        const usuario = await Usuario.findOne({ email });
        if ( !usuario ) return res.status(400).json({
            msg: 'Correo o Password incorrect' 
        })
        /* Verificar si el usuarios esta en estatus Activo */
        if ( !usuario.estado ) return res.status(400).json({
            msg: 'Usuario no encontrado hable con el administrador' 
        })
        /* Verificar la contraseña del usuario */
        const validarPassword = bcrypt.compareSync( password, usuario.password );
        if ( !validarPassword ) return res.status(400).json({
            msg: 'Password o Correo incorrect' 
        })
        /* Generar el JWT */
        const jwt = await generarJWT( usuario.id )
        
        
        res.json({
            msj: 'Bienvenido',
            usuario,
            jwt
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json('Error al iniciar sesion');
    }

}

module.exports = {
    login
}