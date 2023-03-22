const {Router} = require('express');
const router = Router();

const {Get_Real_Estate, Put_Create_Act, Contact} = require('../Controller/Real_Estate_Controller.js')

router.route('/')
    .get(Get_Real_Estate)
    .put(Put_Create_Act)
    .post(Contact)



module.exports = router;