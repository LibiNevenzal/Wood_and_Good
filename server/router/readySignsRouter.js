import express from "express";
import { ReadySignsController } from '../controllers/readySignsController.js'
const readySignsRouter = express.Router();

const readySignsController = new ReadySignsController();

readySignsRouter.get('/', readySignsController.getReadySigns)
readySignsRouter.get("/:id", readySignsController.getReadySignById)
readySignsRouter.post("/", readySignsController.addReadySign)
readySignsRouter.delete("/:id", readySignsController.deleteReadySign)
// readySignsRouter.put("/:id", readySignsController.updateReadySign)

export{
    readySignsRouter
}