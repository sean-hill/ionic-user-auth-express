// Gulp Tasks

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

// Nodemon task
gulp.task('nodemon', function(){

	nodemon({ script: 'server.js', ext: 'js', ignore: [] })
		.on('restart', function(){
			console.log('Server restarted');
		});

});

// Default task
gulp.task('default', ['nodemon']);