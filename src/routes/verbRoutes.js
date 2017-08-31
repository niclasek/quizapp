var express = require('express');

//Used to create the routes for /articles
var verbRouter = express.Router();

var router = function (nav) {
    var verbs = [
        {
            verb: 'andare',
            type: 'essere'
        },
        {
            verb: 'prendere',
            type: 'avere'
        },
        {
            verb: 'cominciare',
            type: 'avere'
        }
    ];
    verbRouter.route('/')
        .get(function (req, res) {
            //Will look for file articoli in ./src/views
            res.render('verbs', {
                title: 'Hello from render',
                nav: nav,
                verbs: verbs
            });
        });
    //The /:id will give us everything beyound /verbs/ when we are dealing with this route
    verbRouter.route('/:id')
        .get(function (req, res) {
            var id = req.params.id;
            res.render('verb', {
                title: 'Hello from render',
                nav: nav,
                verb: verbs[id]
            });
        });
    return verbRouter;
};

//We want to return the function
module.exports = router;
