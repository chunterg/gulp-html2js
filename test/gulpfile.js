var gulp = require('gulp');
var tpl2js = require('../index');
gulp.task('html2amd', function() {
  gulp.src('./test.aa.html')
  	.pipe(tpl2js())
  	.pipe(gulp.dest('./output'))
});

gulp.task('tpl2js', function() {
  gulp.src('./src/test.aa.html')
  	.pipe(tpl2js({
  		type:'amd'
  	}))
  	.pipe(gulp.dest('./output/'))
});

gulp.task('trans',['html2amd','tpl2js'])