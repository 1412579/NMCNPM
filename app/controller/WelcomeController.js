//app/controller/WelcomeController.js
var Articles = require('../model/article.js');
var Catalog = require('../model/catalog.js');

var WelcomeController = {
	index: (req, res) => {
		// var objUser = {};
		// objUser.id = 3;
		// var userInfo = Articles.getArticleById(objUser)
		// .then(function(userIn){
		// 	//console.log(userIn);
		// 	res.render('user/index',{
		// 		userInfo: userIn
		// 	});
		// })
		// .catch(function(errors) {
		// 	console.log(errors);
		//   });;
		Catalog.getAllIndex()
		.then( result => {
			res.render('user/index',{
				message: req.flash('signupSuccess')[0],
				catalog: result
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


