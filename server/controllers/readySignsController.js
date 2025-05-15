import { ReadySignsService } from '../service/readySignsService.js';


export class ReadySignsController {

    async getReadySigns(req, res, next) {
        try {
            const readySignsService = new ReadySignsService();
            const resultItems = await readySignsService.getReadySigns(req.query);
            console.log("res "+resultItems)
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getReadySignById(req, res, next) {
        try {
            const readySignsService = new ReadySignsService();
            const resultItems = await readySignsService.getReadySignById(req.params.id);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateContact(req, res, next) {
        try {
            const contactsService = new ContactsService();
            const resultItems = await contactsService.updateContact(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteReadySign(req, res, next) {
        try {
            const readySignService = new ReadySignsService();
            await readySignService.deleteReadySign("id",req.params.id);
            return res.json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

async addReadySign(req, res, next) {
    try {
        console.log("libiiiiiiii");
        const readySignsService = new ReadySignsService();
        const result = await readySignsService.addReadySign(req.body);
        res.json({ insertId: result.insertId });
    } catch (ex) {
        const err = new Error("שגיאה בהוספת שלט מוכן");
        err.statusCode = 500;
        return next(err);
    }
}

}
