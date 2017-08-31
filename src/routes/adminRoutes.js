var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var verbs = [
    {
        name: 'andare',
        type: 'essere'
        },
    {
        name: 'prendere',
        type: 'avere'
        },
    {
        name: 'cominciare',
        type: 'avere'
        }
    ];

var router = function (nav) {
    adminRouter.route('/addVerb')
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/quizapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('verbs');
                collection.insertMany(verbs, function (err, results) {
                    res.send(results);
                    db.close();
                });
            });
            //res.send('inserting verbs');
        });
    return adminRouter;
};

module.exports = router;
