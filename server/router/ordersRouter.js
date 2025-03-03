import express from "express";
import { OrdersController} from '../controllers/ordersController.js'
const ordersRouter = express.Router();

const ordersController = new OrdersController();


ordersRouter.get('/', ordersController.getOrders)
ordersRouter.get('/:id', ordersController.getOrderById)
ordersRouter.post('/', ordersController.addOrder)
ordersRouter.delete('/:id', ordersController.deleteOrder)
ordersRouter.put('/:id', ordersController.updateOrder)

export{
    ordersRouter
}