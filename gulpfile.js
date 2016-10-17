
/* eslint-disable */

"use strict";

var gulp = require( "gulp" ),
    gEsLint = require( "gulp-eslint" ),
    gBabel = require( "gulp-babel" );


gulp.task( "lint", function(){
  return gulp
      .src( "src/**/*.js" )
      .pipe( gEsLint() )
      .pipe( gEsLint.format() );
});

gulp.task( "build", function() {
  return gulp
  .src( "src/**/*.js" )
    .pipe( gBabel() )
    .pipe( gulp.dest("bin"));
});
