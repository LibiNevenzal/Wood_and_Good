import { OrdersService } from "../service/ordersService.js";
export class OrdersController {

    async getOrders(req, res, next) {
        try {
            const ordersService = new OrdersService();
            console.log("hhhhhhhhhh"+req.query);
            const resultItems = await ordersService.getOrders();
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getOrderById(req, res, next) {
        try {
            const ordersService = new OrdersService();
            const resultItems = await ordersService.login(req.paramsid);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateOrder(req, res, next) {
        try {
            const ordersService = new OrdersService();
            const resultItems = await ordersService.updateOrder(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteOrder(req, res, next) {
        try {
            const ordersService = new OrdersService();
            await ordersService.deleteOrder("id",req.params.id);
            return res.json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    
    async addOrder(req, res, next) {
        try {
            console.log("mmmmmmmmmmmmm"+ req.body);
            const ordersService = new OrdersService();
            const resultItem = await ordersService.addOrder(req.body);
            res.json({ insertId: resultItem.insertId });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
}