//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();
var User = require('../model/user.js');

router.get('/list', function(req, res) {
    User.getAll()
    .then(result => {
        res.render('admin/user/list',{
            layout: 'main-admin',
            users: result,
            message: req.flash('messageUser')[0]
        });
    })
    .catch(err => console.log(err));
});

router.get('/edit/:id', function(req, res) {

    User.getById(req.params.id)
    .then(result => {
        res.render('admin/user/edit',{
            layout: 'main-admin',
            user_e: result
        });
    })
    .catch(err => console.log(err));
});


router.post('/edit/:id', function(req, res) {
        console.log(req.body);
        User.updateRole(req.body)
        .then(result => {
            req.flash('messageUser', 'Đã sửa quyền thành công!');
            res.redirect('/admin/user/list');
        })
        .catch(err => console.log(err));
    });


router.post('/ban-user',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        User.ban(req.body.id)
        .then( result => {
            console.log('Đã ban user thành công!');
            res.end('Đã ban user thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

router.post('/unban-user',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        User.unban(req.body.id)
        .then( result => {
            console.log('Đã unban user thành công!');
            res.end('Đã unban user thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

module.exports = router;


