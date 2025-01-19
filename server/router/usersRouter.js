import express from "express";
import {  UsersController} from '../controllers/usersController.js'
const usersRouter = express.Router();

const usersController = new UsersController();


usersRouter.get('/', usersController.getUsers)
usersRouter.get('/:id', usersController.getUserById)
usersRouter.post('/', usersController.addUser)
usersRouter.delete('/:id', usersController.deleteUser)
usersRouter.put('/:id', usersController.updateUser)

export{
    usersRouter
}