var express = require('express');
var router = express.Router();
var passport = require('passport');
var Account = require('../models/account');
var mongoose = require( 'mongoose' );
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');
var Thought = mongoose.model('Thought');

  router.get("/", function(req,res){
	  res.render('index');
  });
router.get('/register', function(req, res) {
   res.render('register');
 });

 router.post('/register', function(req, res) {
     Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
         if (err) {
             return res.render('register', { account : account });
         }

         passport.authenticate('local')(req, res, function () {
             res.redirect('/');
         });
     });
 });

router.get('/login', function(req, res) {
    res.render('login', { user : req.user });
});
router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/orcsun');
}); 
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

router.get('/ping', function(req, res){
    res.status(200).send("pong!");
});
  router.get('/think', function (req, res) {
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var onepage = 10;
	var numberofpage = req.query.np ? parseInt(req.query.np) : 1;
	var countQuery = Blog.count();
	if (numberofpage = 1 ){
		countQuery.exec(function (e, count) {
			if(count > onepage ){
				if(count%onepage == 0){
					numberofpage =  parseInt(count/onepage)
				}else{
					numberofpage =  parseInt(count/onepage)+1
				}
			}
		  console.log('count', count); // can be more than 2, this is not calculated, mongo stores this value internally
		})
	}
	
	 	 Blog.find(null)
	 	.sort({'createdate':-1})
	 	.skip((page - 1)*onepage)
	 	.limit(onepage)
	 	.exec(function(err, blogs){
			if (err) {
			  blogs = [];
			}
			 Comment.find('comment')
			 	.sort({'createdate':-1})
			 	// .skip((page-1)*10)
			 	// .limit(10)
			 	.exec(function(err, comments){
					res.render('blog', {
						  title: 'Yesterday Is Another Day',
						  blogs: blogs,
						  numberofpage: numberofpage,
						  comments:comments,
						  page: page,
						  //isFirstPage: (page - 1) == 0,
						  //isLastPage: ((page - 1) * 10 + blogs.length) == total,
				
					 });
					 
				});	

		 });
  });
  

  router.post('/search', function (req, res) {

	var page = req.query.p ? parseInt(req.query.p) : 1;
	var keyword = req.body.searchkey
	console.log("keyword:"+keyword);
	var query = {};
	if (keyword) {
        query = { '$or': [{"title" : new RegExp(keyword, "i")},{"tags" : new RegExp(keyword, "i")},{"content" : new RegExp(keyword, "i")}]};
		console.log("query:"+query);
      }


	 	 Blog.find(query)
	 	.sort({'createdate':-1})
	 	.skip((page-1)*10)
	 	.limit(10)
	 	.exec(function(err, blogs, total){
	 		if (err) {
				  blogs = [];
				} 
				
			res.render('blog', {
				  title: 'Yesterday Is Another Day',
				  blogs: blogs,
				  numberofpage: (total/10)+1,
				  page: page,
				  comments:[],
				  isFirstPage: (page - 1) == 0,
				  isLastPage: ((page - 1) * 10 + blogs.length) == total,

				});
		 });
  });
    
 

  router.get("/orcsun", function(req, res){
  	if(req.user)
		res.render("orcsun");
	else
		res.render("login");
  });
  
  
  router.post('/new_comment', function (req, res) {
  	 console.log("post /new comment ----lyn----");
	var newComment = new Comment({
		comment : req.body.comment,
		createdate : new Date()
	});
	newComment.save(function(err,comment){
		if(err){
			//req.flash('error', err);
			res.redirect('/think');
		}
		//req.flash('success','Post a blog!');
		res.redirect('/think');
	});
  });


  router.get('/comments', function (req, res) {
  	     console.log("get /comments ----lyn----");
		var page = req.query.p ? parseInt(req.query.p) : 1;
		 Comment.count('comment',function(err,total){
		 	console.log("get / comments----lyn----total:"+total);
		 });
		  
		 Comment.find(null)
	 	.sort({'createdate':-1})
	 	.skip((page-1)*10)
	 	.limit(10)
	 	.exec(function(err, comments, total){
	 		if (err) {
			  comments = [];
			}else{
				console.log("comments:"+comments.length);
			}		
			console.log("page: %d, comments:%d, total: %d",page,comments.length,total);
			res.send(comments);
		 });
	  });
  
  
  router.get('/collection', function (req, res) {
  	 
	var page = req.query.p ? parseInt(req.query.p) : 1;
	var numberofpage = req.query.np ? parseInt(req.query.np) : 1;
	var onepage = 10;
	var countQuery = Thought.count();
	if (numberofpage = 1 ){
		countQuery.exec(function (e, count) {
			if(count > onepage ){
				if(count%onepage == 0){
					numberofpage =  parseInt(count/onepage)
				}else{
					numberofpage =  parseInt(count/onepage)+1
				}
			}
		  console.log('count', count); // can be more than 2, this is not calculated, mongo stores this value internally
		})
	}	

		 
		 Thought.find(null)
	 	.sort({'createdate':-1})
	 	.skip((page-1)*onepage)
	 	.limit(onepage)
	 	.exec(function(err, thoughts){
	 		if (err) {
				 thoughts = [];
			}	
			res.render('thought', {
	
			  thoughts: thoughts,
			  numberofpage: numberofpage,
			  page: page,

			});
		 });
  });  
  
  router.post('/new_thought', function (req, res) {
  	 console.log("post /new thought ----lyn----");
	var  content = req.body.content,
		  tags = req.body.tags;
		  
	var newThought = new Thought({
		content : content,
		tags : tags,
		createdate : new Date()
	});
	newThought.save(function(err,thought){
		if(err){
			//req.flash('error', err);
			return res.redirect('/collection');
		}
		//req.flash('success','Post a blog!');
		res.redirect('/collection');
	});
  });  
module.exports = router;
