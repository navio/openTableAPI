var express = require('express');
var app     = express();

app.use(require('./router.js'));


app.listen('8081')

console.log('Port 8081');
exports = module.exports = app;
