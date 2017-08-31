var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = process.env.PORT || 5000;
//Nav should not be hard coded here but rather be in a database or 
//configuration file or maybe hard coded in a partial that is used in the headers in all view-files.
var nav = [{
    link: '/articles',
    text: 'Articoli'
        }, {
    link: '/verbs',
    text: 'Verbi'
        }];

//articleRoutes exports a function that takes nav as parameter.
//The function on his hand returns the articleRouter
var articleRouter = require('./src/routes/articleRoutes')(nav);
var verbRouter = require('./src/routes/verbRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.listen(port, function (err) {
    console.log('running server on port ' + port);
});

// app.use allows us to set up some middlewear. Whatever we put in app.use is going to be used by express first, 
// before it does anything else.
// The express.static('public') sets public to a static folder and does so that any request that matches 
// anything in the folder public express is going to respond with that file, 
// e.g., the request css/styles.css will return the file styles.css. After it is done looking in the static 
// folder express will continue with the routes.
app.use(express.static('public'));
//bodyparser is another middlewear that is going to parse the body of whatever coming in as request and set it up as a 
//json-object that we can access from req.body if it is json and corresponding if it is a urlencoded body.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());


//Sets the variable views to ./src/views
//With this set res.render will look in this directory for the file namne given as parameter.
app.set('views', './src/views');

//Sets the view engine to ejs
app.set('view engine', 'ejs');


//Tells the app that we want to use the articleRouter. It also tells where to use it.
app.use('/articles', articleRouter);
app.use('/verbs', verbRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

app.get('/', function (req, res) {
    //Render the index.ejs with the view engine ejs and passes in a json-object to the ejs-file index.
    res.render('index', {
        title: 'Hello from render',
        nav: nav
    });
});
