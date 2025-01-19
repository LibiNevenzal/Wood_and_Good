
export class RegisterController{
    async login( req, res, next){
        try {
            const registerService = new RegisterService();
            const resultItems = await registerService.login(req.params.username, req.params.password);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }

    }


    async signin( req, res, next){
        try {
            const registerService = new RegisterService();
            const resultItems = await registerService.signin(req.body);
            return res.json({data: resultItems });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex;
            next(err)
        }
    }


}