import express from 'express';
import cors from 'cors';
// import { donorsRouter } from './router/donorsRouter.js'
// import { registerRouter } from './router/registerRouter.js'
import { usersRouter } from './router/usersRouter.js';
// import { giftsRouter } from './router/giftsRouter.js';
import { readySignsRouter } from './router/readySignsRouter.js';
import { customSignsRouter } from './router/customSignsRouter.js';
import { registerRouter } from './router/registerRouter.js';
// import bodyparser from 'body-parser';
// import {authenticateToken} from './middleware/authenticateToken.js';
// import { forgotPasswordRouter } from './router/forgotPasswordRouter.js';
// import cookieParser from 'cookie-parser';


const app = express();
app.use(cors(
    {
        origin: "http://localhost:3000",
        credentials: true,
      }
));

app.use(express.json());

app.use('/readySign',readySignsRouter);
app.use('/customSigns', customSignsRouter);
app.use('/users', usersRouter);
app.use('/registerRouter', registerRouter);


// app.use('/register', registerRouter);
// app.use('/users', usersRouter);
// app.use('/gifts', giftsRouter);
// app.use('/contacts',authenticateToken, contactsRouter);
// app.use('/giftsDelivery',authenticateToken, giftsDeliveryRouter);
// app.use('/register/forgotPassword', forgotPasswordRouter);

app.listen(8081, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8081);
});