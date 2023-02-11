const { Router } = require('express');
const router = Router();

/* Controladores */
const { 
    usuariosGet, 
    usuariosPost, 
    usuariosPut, 
    usuariosDelete, 
    usuariosPatch 
} = require('../controllers/usuarios');

router.get('/', usuariosGet);
router.post('/', usuariosPost);
router.put('/:id', usuariosPut);
router.delete('/:id', usuariosDelete);
router.patch('/:id', usuariosPatch);



module.exports = router;