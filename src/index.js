import express from 'express';
import passport from 'passport';
import mongoose from 'mongoose';
import 'dotenv/config';

import dev from './dev';

import steamRouter from './router/steam.router';
import baseRouter from './router/base.router';
import userRouter from './router/user.router';

require('./passport.config')(passport);
mongoose
  .connect(
    process.env.DB, { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const app = express();
dev.enableDevFeatures(app);
app.use(passport.initialize());
app.use(passport.session());

app.use('/steam', steamRouter);
app.use('/', baseRouter);
app.use('/user', userRouter);

app.listen(process.env.PORT, function() {
    console.log('Server listening on port ' + process.env.PORT);
});
