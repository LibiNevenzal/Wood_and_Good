import express from "express";
import { CustomSignsController } from "../controllers/customSignsController.js";

const customSignsRouter = express.Router();

const customSignsController = new CustomSignsController();

customSignsRouter.get('/', customSignsController.getSignsAttribute)
// customSignsRouter.get("/:id",authenticateToken, customSignsController.getDonationById)
// customSignsRouter.post("/",authenticateToken, customSignsController.addDonation)
// customSignsRouter.delete("/:id",authenticateToken, customSignsController.deleteDonation)
// customSignsRouter.put("/:id",authenticateToken, customSignsController.updateDonation)

export{
    customSignsRouter
}