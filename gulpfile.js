/* Chris Jend - 30/092016 
	gulpfile.js - prevkonsep*/

/* eslint disable */

"use strict";

var gulp = require( "gulp" ),
    gEslint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" );

    gulp.task( "lint", function() {
        return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
    } );

    gulp.task( "build", function() {
        return gulp
            .src( "src/**/*.js")
            .pipe( gBabel() )
            .pipe( gulp.dest( "bin" ) ) 
    } );
    gulp.task( "watch", function(){
        gulp.watch( "src/**/*.js", [ "build"] );
    });

    gulp.task( "default", [ "build "] );
    
    gulp.task( "work", [ "build", "watch" ] );

