var express = require('express');

//Used to create the routes for /articles
var articleRouter = express.Router();

var router = function (nav) {
    articleRouter.route('/')
        .get(function (req, res) {
            //Will look for file articoli in ./src/views
            res.render('articles', {
                title: 'Hello from render',
                nav: nav
            });
        });

    return articleRouter;
};

//We want to return the function
module.exports = router;
