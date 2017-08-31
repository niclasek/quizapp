var express = require('express');
var adminRouter = express.Router();

var router = function (nav) {
    adminRouter.route('/addVerb')
    .get(function(req,res) {
        res.send('inserting verbs');
    });
    return adminRouter;
};

module.exports = router;