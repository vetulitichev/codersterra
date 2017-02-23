let  express = require('express');
let app = express();

let allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:63342');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
};
app.use(allowCrossDomain);
//app.use(express.session());
require('./routes.js')(app);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
