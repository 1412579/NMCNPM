//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();
var Users = require("../model/user");

router.get('/list', function(req, res) {
    Users.getAllUser()
    .then(result => {
        res.render('admin/user/list', {
            layout: 'main-admin',
            list: result,
        })
    })
});

router.get('/edit/:id', function(req, res) {
    Users.getUserById(req.params.id)
    .then(result => {
        res.render('admin/user/edit',{
            layout: 'main-admin',
            user_: result,
        });
    })
});

router.post('/edit/', function(req, res){
    var tmp = !req.body.checkbox ? "TRUE" : "FALSE";
    var user = {
        id: req.body.id,
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        role_id: req.body.role,
        active: tmp
    }
    Users.updateByID(user)
    .then(function(){
        req.flash('messageCate', 'Đã sửa người dùng thành công!');
        res.redirect("/admin/user/list");
    })
    
})

module.exports = router;


