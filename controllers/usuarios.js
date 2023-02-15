const { response, request } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = async (req = request, res = response) => {

    /* Numero de registros que regresara la busqueda enviada desde los PARAMS */
    const { limite = 5, desde = 0 } = req.query;
    /* Query de busqueda en MongoDB para traer solo a los usuarios con estatus "TRUE" */
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        /* Total de registros en BD + argumentos */
        Usuario.countDocuments(query),
        /* Busqueda Global de usuarios */
        Usuario.find(query)
        /* Donde va iniciar la busqueda */
        .skip(desde)
        /* Limite de la busqueda */
        .limit(Number(limite))
    ]);
        
    try {
        res.json({
            total,
            usuarios,
        });
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Get del API'
        });
    }
}

const usuariosPost = async (req = request, res = response) => {

    const { nombre, email, password, rol } = req.body;
    
    try {
        //Instanciar nuevo Usuario
        const usuario = new Usuario({ nombre, email, password, rol });

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(10);
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar usuario en BD
        await usuario.save();
        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Post del API'
        });
    }
}

const usuariosPut = async (req = request, res = response) => {

    const id = req.params.id;
    const { _id, password, google, ...resto } = req.body; 
        
    try {
        if(password){
            //Encriptar contraseña
            const salt = bcrypt.genSaltSync(10);
            resto.password = bcrypt.hashSync(password, salt);
        }

        const usuarioDB = await Usuario.findByIdAndUpdate(id, resto)

        res.json({
            ok: true,
            msg: 'Put del API',
            usuarioDB
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

const usuariosDelete = async (req = request, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    /* Fisicamente lo borramos */
    // const usuario = await Usuario.findByIdAndDelete(id);
    
    /* Quitar usuario de la vista del cliente, simulando eliminacion fisica */
    const usuario = Usuario.findByIdAndUpdate(id, { estado: false });
    // console.log(usuario);

    try {
        res.json({
            ok: true,
            usuario,
            uid
        });
    } catch (error) {
        // console.log(error);
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