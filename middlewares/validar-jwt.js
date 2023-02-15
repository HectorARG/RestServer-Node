const { response, request } = require('express');
var jwt = require('jsonwebtoken');

const validarJWT = (req = request, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            message: 'No existe un Token activo'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.PRIVATE_KEY );
        req.uid = uid;
        next();
    } catch (error) {

        console.log(error);
        
    }


};


module.exports = {
    validarJWT
}