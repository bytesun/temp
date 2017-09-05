
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var blogSchema = new Schema({
  title:  String,
  content: String,
  tags:   String,
  createdate: Date
});

var commentSchema = new Schema({
    comment: String,
    createdate: Date
});

var thoughtSchema = new Schema({
    content: String,
    tags: String,
    createdate: Date
});

var Todo = new Schema({
    thing: String,
    duedate: Date,
    status: Number
});

var Note = new Schema({
    title: String,
    content: String,
    createdate: Date,
    category: Number,
    tags: String
});

mongoose.model('Blog', blogSchema);
mongoose.model('Comment', commentSchema);
mongoose.model('Thought', thoughtSchema);
mongoose.model('Todo', Todo);
mongoose.model('Note', Note);

var host = process.env.OPENSHIFT_MONGODB_DB_HOST||"localhost";
var port = process.env.OPENSHIFT_MONGODB_DB_PORT||'27017';
var username = process.env.OPENSHIFT_MONGODB_DB_USERNAME||'test';
var password = process.env.OPENSHIFT_MONGODB_DB_PASSWORD||'11111111';
 
mongoose.connect( 'mongodb://'+username+':'+password+'@'+host+':'+port+'/amsun' );

