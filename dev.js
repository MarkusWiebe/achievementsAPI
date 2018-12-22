var cors = require('cors');
var morgan = require('morgan')

function enableDevFeatures(app) {
    if(isDevelopment()) {
        console.log('Development fearuters are enabled');
        useCors(app);
        logRequests(app);
    }
}

function useCors(app) {
    app.use(cors());
}

function logRequests(app) {
    app.use(morgan('combined', { immediate: true }));
}

function isDevelopment() {
    if(process.env.NODE_ENV !== undefined && 
        process.env.NODE_ENV.indexOf('development') > -1) {
            return true;
        }
        return false;
}

module.exports.enableDevFeatures = enableDevFeatures;