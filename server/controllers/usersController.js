
export class UsersController {

    async getUsers(req, res, next) {
        try {
            const usersService = new UsersService();
            console.log("hhhhhhhhhh"+req.query);
            const resultItems = await usersService.getUsers();
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }
    
    async getUserById(req, res, next) {
        try {
            const usersService = new UsersService();
            const resultItems = await usersService.login(req.paramsid);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async updateUser(req, res, next) {
        try {
            const usersService = new UsersService();
            const resultItems = await usersService.updateUser(req.body, req.params.id);
            return res.json(resultItems);
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }

    async deleteUser(req, res, next) {
        try {
            const usersService = new UsersService();
            await usersService.deleteUser("id",req.params.id);
            return res.json({ data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }
    async addUser(req, res, next) {
        try {
            //לבדוק הרשאות!!!
            const usersService = new UsersService();
            const resultItem = await usersService.signin(req.body);
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
