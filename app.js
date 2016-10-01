var express = require('express');

var app = express();
var port = 5000;
app.listen(port, function(err){
    console.log('running server on port ' + port);
});

app.use(express.static('public'));
app.use(express.static('src/views'));

app.get('/', function(req, res){
    res.send('Hello world');
});