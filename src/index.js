import express from 'express';
import 'dotenv/config';

import dev from './dev';

import steamRouter from './router/steam.router.js';
import baseRouter from './router/base.router.js';

const app = express();
dev.enableDevFeatures(app);

app.use('/steam', steamRouter);
app.use('/', baseRouter);

app.listen(process.env.PORT, function() {
    console.log('Server listening on port ' + process.env.PORT);
});
