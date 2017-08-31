var express = require('express');
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
//Used to create the routes for /articles
var verbRouter = express.Router();

var router = function (nav) {
    verbRouter.route('/')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/quizapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('verbs');
                collection.find({}).toArray(function (err, results) {
                    //Will look for file verbs in ./src/views
                    res.render('verbs', {
                        title: 'Hello from render',
                        nav: nav,
                        verbs: results
                    });
                });
            });
        });
    //The /:id will give us everything beyound /verbs/ when we are dealing with this route
    verbRouter.route('/:id')
        .get(function (req, res) {
            var id = new objectId(req.params.id);

            var url = 'mongodb://localhost:27017/quizapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('verbs');

                collection.findOne({
                    _id: id
                }, function (err, results) {
                    //Will look for file verbs in ./src/views
                    res.render('verb', {
                        title: 'Hello from render',
                        nav: nav,
                        verb: results
                    });
                });
            });
        });
    return verbRouter;
};

//We want to return the function
module.exports = router;
