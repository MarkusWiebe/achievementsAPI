var cors = require('cors');

function enableDevFeatures(app) {
    if(isDevelopment()) {
        console.log('Development fearuters are enabled');
        useCors(app);
    }
}

function useCors(app) {
    app.use(cors());
}

function isDevelopment() {
    if(process.env.NODE_ENV !== undefined && 
        process.env.NODE_ENV.indexOf('development') > -1) {
            return true;
        }
        return false;
}

module.exports.enableDevFeatures = enableDevFeatures;