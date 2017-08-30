var express = require('express');

var app = express();
var port = process.env.PORT || 5000;

//Used to create the routes for /articles
var articleRouter = express.Router();

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

//Sets the variable views to ./src/views
//With this set res.render will look in this directory for the file namne given as parameter.
app.set('views', './src/views');

//Sets the view engine to ejs
app.set('view engine', 'ejs');

articleRouter.route('/')
    .get(function (req, res) {
        //Will look for file articoli in ./src/views
        res.render('articoli', {
            title: 'Hello from render',
            nav: [{
                link: '/articles',
                text: 'Articoli'
        }, {
                link: '/verbs',
                text: 'Verbi'
        }]
        });
    });

//Tells the app that we want to use the articleRouter. It also tells where to use it.
app.use('/articles', articleRouter);

app.get('/', function (req, res) {
    //Render the index.ejs with the view engine ejs and passes in a json-object to the ejs-file index.
    res.render('index', {
        title: 'Hello from render',
        nav: [{
            link: '/articles',
            text: 'Articoli'
        }, {
            link: '/verbs',
            text: 'Verbi'
        }]
    });
});
