//app/controller/WelcomeController.js
var Article = require('../model/article.js');
var Catalog = require('../model/catalog.js');

var WelcomeController = {
	index: (req, res) => {
		let g_catalog;
		let g_4highlight;
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
			res.render('user/index',{
				message: req.flash('signupSuccess')[0],
				catalog: g_catalog,
				highlight: g_4highlight,
				tennewss: result
			});
		})
		.catch(err => console.log(err));
		
		
	},
	about: function(req, res) {
		res.render('user/about',{
			
		});
	},
	detail: function(req, res) {
		res.render('user/detail',{
			
		});
	},
	profile: function(req, res) {
		res.render('user/profile',{
			
		});
	}
}

module.exports = WelcomeController;


