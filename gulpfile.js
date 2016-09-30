/* prevkonsep
 *
 * /gulpfile - gulp tasks
 *
 * coded by Anne
 * started at 30/09/2016
 */

/* eslint-disable */

 "use strict";

 var 
 	gulp = require( "gulp" ),
 	gEslint = require( "gulp-eslint" ),
 	gBabel = require( "gulp-babel" );

 gulp.task( "lint", function() {
 	return gulp
 			.src( [ "src/**/*.js" ] )
 			.pipe( gEslint() )
 			.pipe( gEslint.format() );
 } );

 gulp.task( "build", function() {
 	return gulp
 			.src( "src/**/*.js" )
 			.pipe( gBabel() )
 			.pipe( gulp.dest( "bin" ) );
 } );
