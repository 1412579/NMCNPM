//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();
var User = require('../model/user.js');

router.get('/list', function(req, res) {
    User.getAll()
    .then(result => {
        res.render('admin/user/list',{
            layout: 'main-admin',
            users: result
        });
    })
    .catch(err => console.log(err));
});

router.get('/edit', function(req, res) {
    res.render('admin/user/edit',{
        layout: 'main-admin',
    });
});

module.exports = router;


