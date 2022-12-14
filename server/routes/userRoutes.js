const { register, login, getAllUsers, logOut } = require("../controller/userControl");
  
const router = require("express").Router();
  
  router.post("/login", login);
  router.post("/register", register);
  router.get("/allusers/:id", getAllUsers);
  router.get("/logout/:id", logOut);
  
  module.exports = router;
  