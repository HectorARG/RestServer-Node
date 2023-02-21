const { Router } = require('express');
const { check } = require('express-validator');

const router = Router();

/* middlewares personalizados */
const { validarCampos } = require('../middlewares/validar-campos');
/* Controllers */
const { cargarArchivo } = require('../controllers/uploads');


/* Rutas */
router.post('/', cargarArchivo)


module.exports = router;

