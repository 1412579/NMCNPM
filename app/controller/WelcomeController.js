//app/controller/WelcomeController.js
var Article = require('../model/article.js');
var Catalog = require('../model/catalog.js');
var Category = require('../model/category.js');

var WelcomeController = {
	index: (req, res) => {
		let g_catalog;
		let g_4highlight;
		let g_get10news;
		let g_category;
		let g_fourhot;
		Catalog.getAllIndex()
		.then( result => {
			g_catalog = result;
			return Article.get4highlight();
		})
		.then(result => {
			g_4highlight = result;
			return Article.get10news();
		})
		.then(result => {
			g_get10news = result;
			return Category.getAllIndex();
		})
		.then(result => {
			g_category = result;
			return Article.get4hot();
		})
		.then(result => {
			g_fourhot = result;
			return Article.count();
		})
		.then(result => {
			res.render('user/index',{
				catalog: g_catalog,
				highlight: g_4highlight,
				tennewss: g_get10news,
				category: g_category,
				fourhot: g_fourhot,
				a_count: result,
			});
		})
		.catch(err => console.log(err));
		
		
	},
	category: (req, res) => {
		let g_catalog;
		let g_get10news;
		let g_category;
		let g_fourhot;
		Catalog.getAllIndex()
		.then(result => {
			g_catalog = result;
			return Article.getByCateSlug(req.params.category_slug);
		})
		.then(result => {
			g_get10news = result;
			return Category.getAllIndex();
		})
		.then(result => {
			g_category = result;
			return Article.get4hot();
		})
		.then(result => {
			g_fourhot = result;
			return Article.countByCate(req.params.category_slug);
		})
		.then(result => {
			res.render('user/category',{
				catalog: g_catalog,
				tennewss: g_get10news,
				category: g_category,
				fourhot: g_fourhot,
				a_count: result,
				slug: req.params.category_slug
			});
		})
		.catch(err => console.log(err));
		
		
	},
	catalog: (req, res) => {
		let g_catalog;
		let g_get10news;
		let g_category;
		let g_fourhot;
		Catalog.getAllIndex()
		.then(result => {
			g_catalog = result;
			return Article.getByCatalogSlug(req.params.catalog_slug);
		})
		.then(result => {
			g_get10news = result;
			return Category.getAllIndex();
		})
		.then(result => {
			g_category = result;
			return Article.get4hot();
		})
		.then(result => {
			g_fourhot = result;
			return Article.countByCata(req.params.catalog_slug);
		})
		.then(result => {
			res.render('user/catalog',{
				catalog: g_catalog,
				tennewss: g_get10news,
				category: g_category,
				fourhot: g_fourhot,
				a_count: result,
				slug: req.params.catalog_slug
			});
		})
		.catch(err => console.log(err));
		
		
	},
	about: function(req, res) {
		res.render('user/about',{
			
		});
	},
	detail: function(req, res) {
		let g_catalog;
		let g_art;
		let g_category;
		Article.updateView(req.params.id)
		.catch(err => console.log(err));
		Catalog.getAllIndex()
		.then( result => {
			g_catalog = result;
			return Article.getById(req.params.id);
		})
		.then(result => {
			g_art = result;
			return Category.getAllIndex();
		})
		.then(result => {
			g_category = result;
			return Article.get4hot();
		})
		.then(result => {
			res.render('user/detail',{
				catalog: g_catalog,
				article: g_art,
				category: g_category,
				fourhot: result
			});
		})
		.catch(err => console.log(err));
	},
	profile: function(req, res) {
		res.render('user/profile',{
			
		});
	},
	loadmore: (req,res) => {
		if (req.xhr || req.headers.accept.indexOf('json') > -1) {
			//console.log(req.query.now)
			Article.loadmore(req.query.now)
			.then(result => {
				let stringres =``;
				for(var i = 0;i<result.length;i++){
					stringres += `<li class="top">
						<a href="/${result[i].slug}-${result[i].id}" title="${result[i].title}">
						<img alt="" src="/upload/thumbnail/${result[i].thumbnail}" width="310px" height="200px">
						</a>

						<h3><a title="${result[i].title}" href="/tin-game/${result[i].id}-${result[i].slug}">${result[i].title}</a></h3>
						<p>${result[i].summary}</p>
						<p class="time">
						<a href="javascript:void(0);" class="author">${result[i].user_name}</a>
						- 
						<a href="#" class="categame">${result[i].cate_name}</a>
							- ${result[i].created_at}
						</p>
					</li>`;
					if(i == result.length - 1){
						res.end(stringres);
					}
				}
			})
			.catch(err => {
				console.log(err);
				res.end();
			});
		}
	},
	loadmorecate: (req,res) => {
		if (req.xhr || req.headers.accept.indexOf('json') > -1) {
			//console.log(req.query.now)
			Article.getByCateSlugLoadMore(req.query.slug,req.query.now)
			.then(result => {
				let stringres =``;
				for(var i = 0;i<result.length;i++){
					stringres += `<li class="top">
						<a href="/${result[i].slug}-${result[i].id}" title="${result[i].title}">
						<img alt="" src="/upload/thumbnail/${result[i].thumbnail}" width="310px" height="200px">
						</a>

						<h3><a title="${result[i].title}" href="/tin-game/${result[i].id}-${result[i].slug}">${result[i].title}</a></h3>
						<p>${result[i].summary}</p>
						<p class="time">
						<a href="javascript:void(0);" class="author">${result[i].user_name}</a>
						- 
						<a href="#" class="categame">${result[i].cate_name}</a>
							- ${result[i].created_at}
						</p>
					</li>`;
					if(i == result.length - 1){
						res.end(stringres);
					}
				}
			})
			.catch(err => {
				console.log(err);
				res.end();
			});
		}
	},
	loadmorecata: (req,res) => {
		if (req.xhr || req.headers.accept.indexOf('json') > -1) {
			//console.log(req.query.now)
			Article.getByCatalogSlugLoadMore(req.query.slug,req.query.now)
			.then(result => {
				let stringres =``;
				for(var i = 0;i<result.length;i++){
					stringres += `<li class="top">
						<a href="/${result[i].slug}-${result[i].id}" title="${result[i].title}">
						<img alt="" src="/upload/thumbnail/${result[i].thumbnail}" width="310px" height="200px">
						</a>

						<h3><a title="${result[i].title}" href="/tin-game/${result[i].id}-${result[i].slug}">${result[i].title}</a></h3>
						<p>${result[i].summary}</p>
						<p class="time">
						<a href="javascript:void(0);" class="author">${result[i].user_name}</a>
						- 
						<a href="#" class="categame">${result[i].cate_name}</a>
							- ${result[i].created_at}
						</p>
					</li>`;
					if(i == result.length - 1){
						res.end(stringres);
					}
				}
			})
			.catch(err => {
				console.log(err);
				res.end();
			});
		}
	}
}

module.exports = WelcomeController;


