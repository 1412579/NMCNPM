const pool = require('../model/pg');


var Articles = {
	getById: function(article) {
    return new Promise(function(resolve, reject) {
      var sql = `select * from articles where id=${article}`;
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows[0]);
        }
      });
    });
  },
  newArticle: (articleInfo) => {
    return new Promise(function(resolve, reject) {
      var sql = `insert into articles(thumbnail,title,slug,summary,content,ishide,ishighlight,view,user_id,category_id,created_at,updated_at) values ('${articleInfo.thumbnail}','${articleInfo.title}','${articleInfo.slug}','${articleInfo.summary}','${articleInfo.content}','${articleInfo.ishide}','${articleInfo.ishighlight}',0,'${articleInfo.user_id}','${articleInfo.category_id}','${articleInfo.created_at}','${articleInfo.updated_at}')`;
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows[0]);
        }
    })
   });
  },
  getAll: () => {
    return new Promise(function(resolve, reject) {
      var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id`;
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows);
        }
    })
   });
  },
  getFromAdmin: () => {
    return new Promise(function(resolve, reject) {
      var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and users.role_id <= 3`;
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows);
        }
    })
   });
  },
  getFromPartner: () => {
    return new Promise(function(resolve, reject) {
      var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and users.role_id == 2`;
      pool.query(sql, function(errors, result) {
        if(errors) {
            reject(errors);
        } else {
            //console.log(result);
            resolve(result.rows);
        }
    })
   });
  },
  visible: function(info){
        return new Promise((resolve,reject)=>{
            console.log(info);
            var query = `update articles set ishide = ${info.hide} where id = ${info.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
    highlight: function(info){
        return new Promise((resolve,reject)=>{
            console.log(info);
            var query = `update articles set ishighlight = ${info.highlight} where id = ${info.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
    updateNoThumbnail: (info) => {
        return new Promise((resolve,reject)=>{
            var query = `update articles set title='${info.title}', slug='${info.slug}',summary='${info.summary}',content='${info.content}',ishide=${info.ishide},ishighlight=${info.ishighlight},category_id=${info.category_id},updated_at='${info.updated_at}' where id = ${info.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
    updateWithThumbnail: (info) => {
        return new Promise((resolve,reject)=>{
            var query = `update articles set thumbnail='${info.thumbnail}',title='${info.title}', slug='${info.slug}',summary='${info.summary}',content='${info.content}',ishide=${info.ishide},ishighlight=${info.ishighlight},category_id=${info.category_id},updated_at='${info.updated_at}' where id = ${info.id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                    resolve( result.rows);
            });
        });
    },
    delete: function(id){
        return new Promise((resolve,reject)=>{
            var query = `delete from articles where id= ${id}`;
            pool.query(query, function(err, result){
                if (err){
                    reject(err);
                }
                else
                resolve( result);
            });
        });
    }, 
    get4highlight: ()=>{
        return new Promise(function(resolve, reject) {
        var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false order by ishighlight asc, updated_at desc  LIMIT 4 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        });
    },
    get10news: ()=>{
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false order by updated_at desc  LIMIT 6 `;
                pool.query(sql, function(errors, result) {
                    if(errors) {
                        reject(errors);
                    } else {
                        //console.log(result);
                        resolve(result.rows);
                    }
                })
            });
    }
}

module.exports = Articles;