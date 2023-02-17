const { response, request } = require('express');

const esAdminRole = (req = request, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }

    const { role, nombre } = req.usuario;

    if( role !== 'ADMIN_ROLE' ){
        res.status(401).json({
            msg: `El usuario ${ nombre } con los permisos necesarios`
        });
    }
    

next();
}

const tieneRole = ( ...roles ) => {

    return (req = request, res = response, next) => {

        if(!req.usuario){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if( !roles.includes(req.usuario.role) ){
            return res.status(401).json({
                msg: `No cuentas con un rol autorizado: ${ roles }`
            })
        }


        next();
    }

}


module.exports = {
    esAdminRole,
    tieneRole
}