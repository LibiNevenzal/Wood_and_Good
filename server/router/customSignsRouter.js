import express from "express";
import { CustomSignsController } from "../controllers/customSignsController.js";

const customSignsRouter = express.Router();

const customSignsController = new CustomSignsController();

customSignsRouter.get('/', customSignsController.getSignsDTO)

// customSignsRouter.get("/:id", customSignsController.getReadySignById)
// customSignsRouter.post("/", customSignsController.addReadySign)
// customSignsRouter.delete("/:id", customSignsController.deleteReadySign)
// customSignsRouter.put("/:id", customSignsController.updateReadySign)

export{
    customSignsRouter
}