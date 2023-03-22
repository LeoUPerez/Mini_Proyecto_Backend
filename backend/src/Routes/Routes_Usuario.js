const { Router } = require("express");
const router = Router();

const {
  Get_user,
  CreateUser,
  Get_user_mail,
  UpdateUsuario,
  Verify_Code,
  ProfileUser,
  EditBalance,
} = require("../Controller/Usuarios.controller.js");

router.route("/").post(Get_user).patch(Get_user_mail).put(EditBalance);

router
  .route("/:id")
  .get(ProfileUser)
  .post(CreateUser)
  .patch(Verify_Code)
  .put(UpdateUsuario);

module.exports = router;
