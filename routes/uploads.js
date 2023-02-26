const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* middlewares personalizados */
const { validarCampos, validarArchivo } = require('../middlewares');
/* Controllers */
const { cargarArchivo, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

/* Rutas */
router.post('/', [ validarArchivo ] ,cargarArchivo);
router.put('/:coleccion/:id', [
    validarArchivo,
    check('id','Debe ser un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
] ,actualizarImagenCloudinary);
router.get('/:coleccion/:id', [
    check('id','Debe ser un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
], mostrarImagen );

module.exports = router;

