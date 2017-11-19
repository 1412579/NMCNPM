const pool = require('../model/pg');


var Articles = {
	getById: function(article) {
    return new Promise(function(resolve, reject) {
      var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.id=${article}`;
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
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false order by articles.updated_at desc  LIMIT 6 `;
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
    updateView: (id) =>{
        return new Promise(function(resolve, reject) {
            var sql = `update articles set view = view + 1 where id = ${id}`;
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
    get4hot: () =>{
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false order by articles.updated_at desc, articles.view desc  LIMIT 4 `;
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
    count: () => {
        return new Promise(function(resolve, reject) {
            var sql = `select count(*) as a_count from articles`;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows[0].a_count);
                }
            })
        })
    },
    loadmore: (pageNow) => {
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false order by articles.updated_at desc OFFSET ${pageNow * 6} LIMIT 6 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        })
    },
    getByCateSlug: (slug) => {
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false and category.slug = '${slug}' order by articles.updated_at desc limit 6 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        })

    },
    getByCateSlugLoadMore: (slug,pageNow) => {
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category where articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false and category.slug = '${slug}' order by articles.updated_at desc OFFSET ${pageNow * 6} LIMIT 6 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        })

    },
    countByCate: (slug) => {
        return new Promise(function(resolve, reject) {
            var sql = `select count(*) as a_count from articles,category where articles.category_id = category.id and category.slug = '${slug}'`;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows[0].a_count);
                }
            })
        })
    },
    getByCatalogSlug: (slug) => {
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category,catalog
            where  articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false and category.catalog_id = catalog.id and catalog.slug = '${slug}' order by articles.created_at desc LIMIT 6 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        })
    },
    getByCatalogSlugLoadMore: (slug,pageNow) => {
        return new Promise(function(resolve, reject) {
            var sql = `select articles.*, users.fullname as user_name, category.name as cate_name from articles, users, category,catalog
            where  articles.user_id = users.id and articles.category_id = category.id and articles.ishide = false and category.catalog_id = catalog.id and catalog.slug = '${slug}' order by articles.created_at desc OFFSET ${pageNow * 6} LIMIT 6 `;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows);
                }
            })
        })
    },
    countByCata: (slug) => {
        return new Promise(function(resolve, reject) {
            var sql = `select count(*) as a_count from articles, category,catalog
            where  articles.category_id = category.id and articles.ishide = false and category.catalog_id = catalog.id and catalog.slug = '${slug}'`;
            pool.query(sql, function(errors, result) {
                if(errors) {
                    reject(errors);
                } else {
                    //console.log(result);
                    resolve(result.rows[0].a_count);
                }
            })
        })
    }
}

module.exports = Articles;