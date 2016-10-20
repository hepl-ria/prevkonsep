/*
*
* /src/server.js - Main entry point
*
*/

/*eslint-disable*/

"use strict";

var gulp = require( "gulp" ),
    gEslint = require( "gulp-eslint" ),
    gBabel =  require( "gulp-babel" );


gulp.task( "lint", function(){
    return gulp
        .src( "src/**/*.js" )
        .pipe( gEslint() )
        .pipe( gEslint.format() );
});

gulp.task( "watch", function(){
    gulp.watch( "src/**/*.js", [ "build" ] );
} );

gulp.task( "default", [ "build" ] );

gulp.task( "build", function(){ //on prend tout les fichiers de src, on les passe a babel et il va els réecrire dans bin
    return gulp
        .src( "src/**/*.js" )
        .pipe( gBabel() )
        .pipe( gulp.dest( "bin" ) )
})

gulp.task( "work", ["build", "watch"]);
