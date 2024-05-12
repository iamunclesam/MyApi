const express = require("express");
const router = express.Router();
const { createNewUser, loginUser } = require("../controllers/user/userController.js");
const { authSchema } = require("../helpers/validate_schema.js");
const createHttpError = require("http-errors");
const User = require("../models/User/userModel.js");
const { signAccessToken, signRefreshToken, verifyRefreshToken } = require("../helpers/jwt_helper.js");

router.post("/register", createNewUser);

router.post("/login", loginUser);

router.post("/refresh-token", async (req, res, next) => {
 try {
  const { refreshToken } = req.body
  if(!refreshToken) throw createHttpError.BadRequest()
   const userId = await verifyRefreshToken(refreshToken)
  const accessToken = await signAccessToken(userId)
  const refToken = await signRefreshToken(userId)
   res.send({accessToken: accessToken, refreshToken: refToken});
 } catch (error) {
  
 }
});

router.delete("/logout", async (req, res, next) => {
  res.send("logout");
});

module.exports = router;
