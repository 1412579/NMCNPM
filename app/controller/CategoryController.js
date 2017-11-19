//app/controller/CategoryController.js


var express = require('express');
var router = express.Router();
var Category = require('../model/category.js');
var Catalog = require('../model/catalog.js');
var moment = require('moment');
var slug = require('slug');

router.get('/add', (req, res) => {
    Catalog.getAll()
    .then(result => {
        res.render('admin/category/add',{
            layout: 'main-admin',
            title: 'Thêm loại tin mới',
            catalog: result
        }); 
    })
    .catch(err => console.log(err));
});

router.post('/add', (req, res) => {
    console.log(req.body.name);
    console.log(req.body.order);

    var temp = req.body.checkbox ? 'true' : 'false';
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var cateInfo = {
        name: req.body.name,
        orderb: req.body.order,
        slug: slug(req.body.name,"-").toLowerCase(),
        isHide: temp,
        created_at: getTimeNow,
        updated_at: getTimeNow,
        catalog_id: req.body.catalog
    };

    Category.newCate(cateInfo)
    .then(()=>{
        req.flash('messageCate', 'Đã thêm loại tin thành công!');
        res.redirect('/admin/Category/list');
    })
    .catch(err=>console.log(err));
});

router.get('/list', (req, res) =>{
    Category.getAll()
    .then((result)=>{
        res.render('admin/Category/list',{
            list: result,
            layout: 'main-admin',
            title: 'Danh sách loại tin',
            message: req.flash('messageCate')[0]
        });
    })
    .catch((err) => {
        console.log(err);
        res.end();
    });
        
});

router.get('/edit/:id', (req, res) => {
    let catalog;
    Catalog.getAll()
    .then(result => {
        catalog = result;
        return Category.getById(req.params.id);
    })
    .then(result => {
        let select;
        for (var i = 0; i < catalog.length; i++) {
            if(catalog[i].id == result.catalog_id){
                select += '<option selected value="'+ catalog[i].id +'">'+ catalog[i].name +'</option>';
            }
            else
            select += '<option value="'+ catalog[i].id +'">'+ catalog[i].name +'</option>';
        }
        res.render('admin/category/edit',{
            layout: 'main-admin',
            title: 'Sửa loại tin',
            cate: result,
            catalog: select
        }); 
    })
    .catch(err=>console.log(err));
});

router.post('/edit/:id', (req,res)=>{
    var temp = req.body.checkbox  ? 'true' : 'false';
    console.log(req.body.checkbox);
    console.log(temp);
    var getTimeNow = moment().format('YYYY-MM-DD HH:mm:ss');
    var cataInfo = {
        id: req.body.id,
        name: req.body.name,
        orderb: req.body.order,
        slug: slug(req.body.name,"-").toLowerCase(),
        ishide: temp,
        updated_at: getTimeNow,
        catalog_id: req.body.catalog
    };
    console.log(cataInfo);
    Category.updateById(cataInfo)
    .then(() => {
        req.flash('messageCate', 'Đã sửa loại tin thành công!');
        res.redirect('/admin/category/list');
    })
    .catch(err => console.log(err));
})

router.post('/update-visible',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        Category.visible(req.body)
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

router.post('/delete',(req,res) => {
    if (req.xhr || req.headers.accept.indexOf('json') > -1) {
        Category.delete(req.body.id)
        .then( result => {
            console.log('Xoá loại tin thành công!');
            res.end('Xoá loại tin thành công!');
        })
        .catch(err => {
            console.log(err);
            return res.end();
        });
    }
})

module.exports = router;


