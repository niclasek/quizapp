var express = require('express');

//Used to create the routes for /articles
var verbRouter = express.Router();

var router = function (nav) {
    verbRouter.route('/')
        .get(function (req, res) {
            //Will look for file articoli in ./src/views
            res.render('verbs', {
                title: 'Hello from render',
                nav: nav
            });
        });

    return verbRouter;
};

//We want to return the function
module.exports = router;
