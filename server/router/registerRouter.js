import express from "express";
import {  RegisterController} from '../controllers/registerController.js'
const registerRouter = express.Router();

const registerController = new RegisterController();

registerRouter.get('/', registerController.login)
registerRouter.post("/", registerController.signin)


export{
    registerRouter
}