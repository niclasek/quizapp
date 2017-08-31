var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function (nav) {
    authRouter.route('/signUp')
        .post(function (req, res) {
            console.log(req.body);
            var url = 'mongodb://localhost:27017/quizapp';
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                //Before inserting you should ofcourse check if this user exists
                collection.insert(user, function (err, results) {
                    //This req.login is available thanks to passport
                    //It addes the user to the session
                    req.login(results.ops[0], function () {
                        res.redirect('/auth/profile');
                    });
                });
            });

        });
    authRouter.route('/signIn')
        //This is going to hand everything over to passport
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function (req, res) {
            res.redirect('/auth/profile');
        });
    authRouter.route('/profile')
        .get(function (req, res) {
            //Req.user is provided by passport and if there is a user there it means that the user is logged in.
            res.json(req.user);
        });
    return authRouter;
};

module.exports = router;
