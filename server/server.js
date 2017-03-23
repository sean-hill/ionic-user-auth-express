// API Server

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development'
}

process.on("uncaughtException", function(error, stack){

	console.log("Uncaught Error");
	console.log(error.stack);

});



// Server Variables
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var Conf = require('./conf');
var cors =  require('cors');
var app = express();
app.use(cors());//all routes allow cors access
app.options('*', cors());//all domians are allowed cors access.  See cors documentation for limiting this
var port = process.env.PORT || 5000;



// Middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());



// Database connection
var mongoose = require('mongoose');
mongoose.connect(Conf.mongo_config.connect_string(), { db: { safe:true } }, function(err){
  if (err) {
    throw err;
  }
  else {
    console.log('Mongoose Connected');
  }
});

mongoose.connection.on("error", function(err){
  console.log("Mongoose error:", err);
});

mongoose.connection.on("disconnected", function(){
  console.log("Mongoose disconnected!");
});

mongoose.set('debug', true);



// Server configuration
// Development only
if ('development' == app.get('env')) {
  console.log('STATE: Development')
  mongoose.set('debug', true);
}

// Production only
if ('production' == app.get('env')) {
  console.log('STATE: Production')
}



// Api Middlewares
app.use('/api', require('./api-manifest'));

app.get('/', function(req, res){
	res.send('base-auth');
});



// Start the server listening
app.listen(port, function(){
	console.log('base-auth listening on port', port);
});
