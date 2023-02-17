const { Router } = require('express');
const { check } = require('express-validator');

/* middlewares personalizados */
const { validarJWT, validarCampos } = require('../middlewares');

const { 
    categoriaGet,
    categoriaPost,
    categoriaPut,
    categoriaDelete,
 } = require('../controllers/categoria');


const router = Router();

router.get('/', categoriaGet);

router.get('/:id', );

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], categoriaPost);

router.put('/:id',[
    validarCampos
], categoriaPut);

router.delete('/:id', [], categoriaDelete);

module.exports = router;