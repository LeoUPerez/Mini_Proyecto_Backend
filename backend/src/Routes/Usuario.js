const {Router} = require('express');
const router = Router();

const { ObtenerUsuario, CreateUsuario, ObtenerUsua, DeleteUsuario, UpdateUsuario, VerificarCodigo } = require('../Controller/Usuarios.controller.js')

router.route('/')
    .post(ObtenerUsuario)
    .patch(ObtenerUsua)


router.route('/:id')
    .post(CreateUsuario)
    .patch(VerificarCodigo) 
    // .put(UpdateUsuario) //!va a ser una ruta put 


module.exports = router;