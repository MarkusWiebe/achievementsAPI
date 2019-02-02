import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import 'dotenv/config';

import jwt from './helper/jwt';
import errorHandler from './helper/error-handler';

import steamRouter from './router/steam.router';
import baseRouter from './router/base.router';
import userRouter from './router/user.router';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined', { immediate: true }));
app.use(jwt());
app.use(errorHandler);

app.use('/', baseRouter);
app.use('/steam', steamRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, function() {
    console.log('Server listening on port ' + process.env.PORT);
    mongoose.connect(process.env.DB, { useNewUrlParser: true }).then(
        () => { console.log('mongoose connected'); },
        err => { /** handle initial connection error */ }
      );
});
