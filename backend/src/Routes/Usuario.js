const {Router} = require('express');
const router = Router();

const { Get_user, CreateUser, Get_user_mail, DeleteUsuario, UpdateUsuario, Verify_Code } = require('../Controller/Usuarios.controller.js')

router.route('/')
    .post(Get_user)
    .patch(Get_user_mail)


router.route('/:id')
    .post(CreateUser)
    .patch(Verify_Code) 
    // .put(UpdateUsuario) //!va a ser una ruta put 


module.exports = router;