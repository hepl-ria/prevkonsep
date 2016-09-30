/* ria/prevkonsep
 *
 * /gulpfile.js - gulp tasks
 *
 * Coded by mucht@mathieuclaessens.be
 * started at 30/09/2016
*/

/* eslint-disable */

"use strict";

var
    gulp = require( "gulp" ),
    gEslint = require( "gulp-eslint" ),
    babel = require("gulp-babel");

gulp.task( "lint", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
} );

gulp.task( "build", function(){
  return gulp
    .src( "src/**/*.js" )
    .pipe( babel() )
    .pipe( gulp.dest( "bin" ) );
} );
