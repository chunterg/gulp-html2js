var gulp = require('gulp');
var html2js = require('../index');
gulp.task('html2amd', function() {
  gulp.src('./test.aa.html')
  	.pipe(html2js())
  	.pipe(gulp.dest('./output'))
});

gulp.task('html2js', function() {
  gulp.src('./test.aa.html')
  	.pipe(html2js({
  		type:'amd'
  	}))
  	.pipe(gulp.dest('./output/tpl'))
});

gulp.task('trans',['html2amd','html2js'])