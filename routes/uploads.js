const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* middlewares personalizados */
const { validarCampos } = require('../middlewares/validar-campos');
/* Controllers */
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


/* Rutas */
router.post('/', [] ,cargarArchivo);
router.put('/:coleccion/:id', [
    check('id','Debe ser un ID valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, [ 'usuarios', 'productos' ] ) ),
    validarCampos
] ,actualizarImagen);


module.exports = router;

