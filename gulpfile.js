/*
* @Author: micheal
* @Date:   2017-03-02 21:45:49
* @Last Modified by:   micheal
* @Last Modified time: 2017-03-17 13:33:58
*/

  'use strict';
  var gulp=require('gulp');
  var $=require('gulp-load-plugins')();
  var open=require('open');

  var app={
  	srcPath:'src/',
  	devPath:'bulid/',
  	prdPath:'dist/'
  };

  gulp.task('lib',function(){
  	gulp.src('bower_components/**/*.js')
  	.pipe(gulp.dest(app.devPath+'vender'))
  	.pipe(gulp.dest(app.prdPath+'vender'))
  	.pipe($.connect.reload());
  }); 

  gulp.task('html',function(){
  	gulp.src(app.srcPath+'/**/*.html')
  	.pipe(gulp.dest(app.devPath))
  	.pipe(gulp.dest(app.prdPath))
  	.pipe($.connect.reload());
  });

  gulp.task('json',function(){
  	gulp.src(app.srcPath+'data/**/*.json')
  	.pipe(gulp.dest(app.devPath+'data'))
  	.pipe(gulp.dest(app.prdPath+'data'))
  	.pipe($.connect.reload());
  });

  gulp.task('less',function(){
  	gulp.src(app.srcPath+'stytle/**/index.less')
    .pipe($.plumber())
  	.pipe($.less())
  	.pipe(gulp.dest(app.devPath+'css'))
  	.pipe($.cssmin())
  	.pipe(gulp.dest(app.prdPath+'css'))
  	.pipe($.connect.reload());
  });

  gulp.task('js',function(){
  	gulp.src(app.srcPath+'script/**/*.js')
    .pipe($.plumber())
  	.pipe($.concat('index.js'))
  	.pipe(gulp.dest(app.devPath+'js'))
  	.pipe($.uglify())
  	.pipe(gulp.dest(app.prdPath+'js'))
  	.pipe($.connect.reload());
  })

  gulp.task('image',function(){
  	gulp.src(app.srcPath+'image/**/*')
  	.pipe(gulp.dest(app.devPath+'image'))
  	.pipe($.imagemin())
  	.pipe(gulp.dest(app.prdPath+'image'))
  	.pipe($.connect.reload());
  })

  gulp.task('clean',function(){
  	gulp.src([app.devPath,app.prdPath])
  	.pipe($.clean())
  })

  gulp.task('build',['image','js','less','lib','html','json']);

  gulp.task('serve',['build'],function(){
  	$.connect.server({
  		root: [app.devPath],
  		livereload:true,
  		port:1234
  	});
  	open('http://localhost:1234');
  	gulp.watch('bower_components/**/*.js',['lib']);
  	gulp.watch(app.srcPath+'/**/*.html',['html']);
  	gulp.watch(app.srcPath+'data/**/*.json',['json']);
  	gulp.watch(app.srcPath+'stytle/**/index.less',['less']);
  	gulp.watch(app.srcPath+'script/**/*.js',['js']);
  	gulp.watch(app.srcPath+'image/**/*',['image']);
  });

  gulp.task('default',['serve']);