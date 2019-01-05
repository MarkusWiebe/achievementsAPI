import express from 'express';

import config from './config.json';
import dev from './dev';

import steamRouter from './router/steam.router.js';
import baseRouter from './router/base.router.js';

const app = express();
dev.enableDevFeatures(app);

app.use('/steam', steamRouter);
app.use('/', baseRouter);

app.listen(config.Port, function() {
    console.log('Server listening on port ' + config.Port);
});
