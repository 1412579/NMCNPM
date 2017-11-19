//app/controller/ArticleController.js
var express = require('express');
var router = express.Router();
var Category = require('../model/category.js');
var Article = require('../model/article.js');
var User = require('../model/User.js');
var moment = require('moment');
var multer = require('multer');
var slug = require('slug');

var storage = multer.diskStorage({
	destination: function (req, file, callback) {
		callback(null, 'public/upload/thumbnail');
	},
	filename: function (req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname.replace(' ',''));
	}
});

var upload = multer({ storage : storage }).single('thumbnail');

router.get('/add', function(req, res) {
    //console.log(1)
    Category.getAll()
    .then(result=>{
        //console.log(2)
        res.render('admin/article/add',{
            layout: 'main-admin',
            cate: result,
        });
    })
    .catch(err => console.log(err))
    
});

router.post('/add', function(req, res) {
    upload(req,res,(err) => {
        if(err) {
            return console.log(err);
        }
        // console.log(req.file); //đúng nè
        //console.log(req.body);
        var ishide = req.body.ishide ? 'true' : 'false';
        var ishighlight = req.body.ishighlight ? 'true' : 'false';
        var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
        var articleInfo = {
            title: req.body.title,
            slug: slug(req.body.title,"-").toLowerCase(),
            summary: req.body.summary,
            content: req.body.content,
            ishide: ishide,
            ishighlight: ishighlight,
            user_id: req.user.id,
            category_id: req.body.cate,
            created_at: getTimeNow,
            updated_at: getTimeNow
        };
        if(req.file.filename){
            articleInfo.thumbnail = req.file.filename;
        }
        else{
            articleInfo.thumbnail = '';
        }
        Article.newArticle(articleInfo)
        .then(result => {
            req.flash('messageArticle', 'Đã thêm bài viết thành công!');
            res.redirect('/admin/article/list');
        })
        .catch(err => {
            let url_del = 'public/upload/thumbnail/' + req.file.filename;
            if (fs.existsSync(url_del)) {
                fs.unlinkSync(url_del)
            }
            return console.log(err);
        })
        
        
    });
});

router.post('/edit/:id', function(req, res) {

    Article.getById(req.params.id)
    .then(result => {
        checkRoleEdit(req,res,result.user_id);
    })
    .catch(err => console.log(err));

    upload(req,res,(err) => {
        if(err) {
            return console.log(err);
        }
        // console.log(req.file); //đúng nè
        //console.log(req.body);
        var ishide = req.body.ishide ? 'true' : 'false';
        var ishighlight = req.body.ishighlight ? 'true' : 'false';
        var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
        var articleInfo = {
            id: req.params.id,
            title: req.body.title,
            slug: slug(req.body.title,"-").toLowerCase(),
            summary: req.body.summary,
            content: req.body.content,
            ishide: ishide,
            ishighlight: ishighlight,
            user_id: req.user.id,
            category_id: req.body.cate,
            created_at: getTimeNow,
            updated_at: getTimeNow
        };
        let flag = 0;
        if(req.file.filename){
            //console.log('ahihi');
            articleInfo.thumbnail = req.file.filename;
            flag = 1;
        }
        if(flag == 0){
            Article.updateNoThumbnail(articleInfo)
            .then(result => {
                req.flash('messageArticle', 'Đã sửa bài viết thành công!');
                res.redirect('/admin/article/list');
            })
            .catch(err => {
                return console.log(err);
            })
        }
        else{
            Article.updateWithThumbnail(articleInfo)
            .then(result => {
                req.flash('messageArticle', 'Đã sửa bài viết thành công!');
                res.redirect('/admin/article/list');
            })
            .catch(err => {
                let url_del = 'public/upload/thumbnail/' + req.file.filename;
                if (fs.existsSync(url_del)) {
                    fs.unlinkSync(url_del)
                }
                return console.log(err);
            })
        }
        
        
        
    });
});

router.post('/update-visible',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        Article.visible(req.body)
        .then( result => {
            console.log('Update Ajax Ẩn/Hiện thành công!');
            res.end('Update Ajax Ẩn/Hiện thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

router.post('/update-highlight',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        Article.highlight(req.body)
        .then( result => {
            console.log('Update Ajax highlight thành công!');
            res.end('Update Ajax highlight thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

router.get('/list', function(req, res) {
    if(req.user.role_id == 2){
        Article.getFromPartner()
        .then(result => {
            res.render('admin/article/list',{
                layout: 'main-admin',
                articles: result,
                message: req.flash('messageArticle')[0]
            });
        })
        .catch(err => console.log(err));
    }
    else if (req.user.role_id == 3){
        Article.getFromAdmin()
        .then(result => {
            res.render('admin/article/list',{
                layout: 'main-admin',
                articles: result,
                message: req.flash('messageArticle')[0]
            });
        })
        .catch(err => console.log(err));
    }
    else if(req.user.role_id == 4){
        Article.getAll()
        .then(result => {
            res.render('admin/article/list',{
                layout: 'main-admin',
                articles: result,
                message: req.flash('messageArticle')[0]
            });
        })
        .catch(err => console.log(err));
    }
    
});

router.get('/edit/:id', function(req, res) {

    Article.getById(req.params.id)
    .then(result => {
        //console.log(result.user_id);
        checkRoleEdit(req,res,result.user_id);
    })
    .catch(err => console.log(err));

    let category;
    Category.getAll()
    .then(result => {
        category = result;
        return Article.getById(req.params.id);
    })
    .then(result => {
        let select;
        for (var i = 0; i < category.length; i++) {
            if(category[i].id == result.category_id){
                select += '<option selected value="'+ category[i].id +'">'+ category[i].name +'</option>';
            }
            else
            select += '<option value="'+ category[i].id +'">'+ category[i].name +'</option>';
        }
        //console.log('here');
        res.render('admin/article/edit',{
            layout: 'main-admin',
            title: 'Sửa bài viết',
            article: result,
            category: select
        }); 
    })
    .catch(err=>console.log(err));
});

router.post('/delete',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        Article.getById(req.body.id)
        .then(u => {
            return User.getById(u.user_id);
        })
        .then(u => {
            if(req.user.role_id != u.role_id && req.user.role_id < u.role_id)
                return res.end()
            else if(req.user.role_id < u.role_id)
                return res.end()
            else return Article.delete(req.body.id)
        })
        .then( result => {
            console.log('Xoá bài viết thành công!');
            res.end('Xoá bài viết thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

function checkRoleEdit(req,res,user_id){
    User.getById(user_id)
    .then(u => {
        console.log('user_c role_id: ' + req.user.id + ' article author: ' + u.role_id);
        if(req.user.role_id != u.role_id && req.user.role_id < u.role_id)
            return res.send("401 - Unauthorized: Access is denied due to invalid credentials");
        else if(req.user.role_id < u.role_id)
            return res.send("401 - Unauthorized: Access is denied due to invalid credentials");
    })
    .catch(err => console.log(err));
    
}




module.exports = router;



