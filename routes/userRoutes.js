const express = require("express")
const router = express.Router();
const { createNewUser, getAllUser, getUserById, updateUserById, deleteUserById } = require("../controllers/user/userController.js")

router.get('/users', getAllUser);

router.get('users/:id', getUserById)

router.post('/users', createNewUser)

router.put('users/:id', updateUserById)

router.delete('users/:id', deleteUserById)

module.exports = router