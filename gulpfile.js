/* auré/prevkonsep
*
* /gulpfile - gulp tasks
*
*
* coded by auré
* started at 30/09/2016
*/

/* eslint-disable */

"use strict";

var gulp = require("gulp"),
	gESLint = require("gulp-eslint"),
	gBabel = require("gulp-babel");

// tache gulp
gulp.task("lint", function(){
	return gulp
			.src("src/**/*.js")
			.pipe(gESLint())
			.pipe(gESLint.format());
});

// tache babel
gulp.task("build", function(){
	return gulp
			.src("src/**/*.js")
			.pipe(gBabel())
			.pipe(gulp.dest("bin"));
});



