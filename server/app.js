import express from 'express';
import cors from 'cors';
// import { donorsRouter } from './router/donorsRouter.js'
// import { registerRouter } from './router/registerRouter.js'
// import { usersRouter } from './router/usersRouter.js';
// import { giftsRouter } from './router/giftsRouter.js';
import { readySignsRouter } from './router/readySignsRouter.js';
// import { giftsDeliveryRouter } from './router/giftsDeliveryRouter.js';
// import { donationsRouter } from './router/donationsRouter.js';
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
// app.use('/customSign',customSignRouter);



app.listen(8081, (err) => {
    if (err) console.error(err);
    console.log("Server listening on PORT", 8081);
});