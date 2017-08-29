var express = require('express');

var app = express();
var port = process.env.PORT || 5000;


app.listen(port, function(err){
    console.log('running server on port ' + port);
});

// app.use allows us to set up some middlewear. Whatever we put in app.use is going to be used by express first, 
// before it does anything else.
// The express.static('public') sets public to a static folder and does so that any request that matches 
// anything in the folder public express is going to respond with that file, 
// e.g., the request css/styles.css will return the file styles.css. After it is done looking in the static 
// folder express will continue with the routes.
app.use(express.static('public'));

//Sets the variable views to ./src/views
app.set('views', './src/views');

//Sets the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res){
    //Render the index.ejs with the view engine ejs
    //Passes in a json-object with the variables title and list.
    res.render('index', {title: 'Hello from render', list: ['a','b']});
});
