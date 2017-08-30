var express = require('express');

//Used to create the routes for /articles
var articleRouter = express.Router();

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

module.exports = articleRouter;
