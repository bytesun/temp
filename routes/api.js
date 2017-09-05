var express = require('express');
var router = express.Router();
var mongoose = require( 'mongoose' );
var Blog = mongoose.model('Blog');
var Comment = mongoose.model('Comment');
var Thought = mongoose.model('Thought');
var Todo = mongoose.model('Todo');
var Note = mongoose.model('Note');

 // router.post('/blogs', function (req, res) {

	// var newBlog = new Blog(req.body);
	// newBlog.createdate = new Date();
	// newBlog.save(function(err,blog){
	// 	if(err){
	// 		 res.send({
	// 			"count":0,
	// 			"message":err
	// 		});
	// 	}else{
	// 		res.send({
	// 			"count":1,
	// 			"message":"Created a new blog"
	// 		});
	// 	}
	// });
 // });

router.post('/blogs', function (req, res) {
	var blog = new Blog(req.body);
    blog.createdate = new Date();
	blog.save(function(err,blog){
		if(err){
			res.send({error:err});
		}
		res.send(blog);
	});	

});
  
router.get('/blogs', function (req, res) {
    
	 Blog.find(null)
	 	.sort({'createdate':-1})
	 	// .skip((page - 1)*10)
	 	.limit(100)
	 	.exec(function(err, blogs, total){
			if (err) {
			  blogs = [];
			}
			res.send(blogs);
	 	});

});
router.delete('/blogs/:id', function (req, res) {
	console.log("[server] delete blog:"+req.params.id);

    Blog.findByIdAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)},function(err){
    	if(err){
    		console.log(err);
    		res.send({error:err});
    	}else{
    		res.send({count:1});
    	}
    });
    

});  

//-------------------------------thoughts----------------------------------
router.post('/thoughts', function (req, res) {
	var thought = new Thought(req.body);
    thought.createdate = new Date();
	thought.save(function(err,thought){
		if(err){
			res.send({error:err});
		}
		res.send(thought);
	});	

});
  
router.get('/thoughts', function (req, res) {
    
	 Thought.find(null)
	 	.sort({'createdate':-1})
	 	// .skip((page - 1)*10)
	 	.limit(100)
	 	.exec(function(err, thoughts, total){
			if (err) {
			  thoughts = [];
			}
			res.send(thoughts);
	 	});

});
router.delete('/thoughts/:id', function (req, res) {
	console.log("[server] delete thought:"+req.params.id);

    Thought.findByIdAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)},function(err){
    	if(err){
    		console.log(err);
    		res.send({error:err});
    	}else{
    		res.send({count:1});
    	}
    });
    

}); 

//-------------------------todo---------------------------------
router.post('/todos', function (req, res) {
	var todo = new Todo(req.body);
    
	todo.save(function(err,todo){
		if(err){
			res.send({error:err});
		}
		res.send(todo);
	});	

});
  
router.get('/todos', function (req, res) {
    
	 Todo.find(null)
	 	.sort({'duedate':-1})
	 	// .skip((page - 1)*10)
	 	.limit(100)
	 	.exec(function(err, todos, total){
			if (err) {
			  todos = [];
			}
			res.send(todos);
	 	});

});
router.delete('/todos/:id', function (req, res) {
	console.log("[server] delete todo:"+req.params.id);

    Todo.findByIdAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)},function(err){
    	if(err){
    		console.log(err);
    		res.send({error:err});
    	}else{
    		res.send({count:1});
    	}
    });
    

}); 
//---------------------------------Note-----------------------------------
router.post('/notes', function (req, res) {
	var note = new Note(req.body);
    note.createdate = new Date();
	note.save(function(err,note){
		if(err){
			res.send({error:err});
		}
		res.send(note);
	});	

});
  
router.get('/notes', function (req, res) {
    
	 Note.find(null)
	 	.sort({'createdate':-1})
	 	// .skip((page - 1)*10)
	 	.limit(100)
	 	.exec(function(err, notes, total){
			if (err) {
			  notes = [];
			}
			res.send(notes);
	 	});

});
router.delete('/notes/:id', function (req, res) {
	console.log("[server] delete note:"+req.params.id);

    Note.findByIdAndRemove({_id : new mongoose.mongo.ObjectID(req.params.id)},function(err){
    	if(err){
    		console.log(err);
    		res.send({error:err});
    	}else{
    		res.send({count:1});
    	}
    });
    

}); 
module.exports = router;
