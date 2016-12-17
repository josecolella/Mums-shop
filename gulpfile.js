const gulp = require('gulp'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    cleanCSS = require('gulp-clean-css');

gulp.task('minify-css', function() {
    return gulp.src('public/stylesheets/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('images', function() {
    gulp.src('public/images/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/dist/images'))
});


gulp.task('compress', function(cb) {
    pump([
            gulp.src('public/js/*.js'),
            uglify(),
            gulp.dest('public/dist/js')
        ],
        cb
    );
});


gulp.task('default', ['images', 'compress', 'minify-css']);
