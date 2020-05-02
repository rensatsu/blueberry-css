'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const touch = require('gulp-touch-cmd');

const sassFiles = [
    'blueberry.scss',
    'twitter.scss',
];

async function styles() {
    await sassFiles.forEach(async (src) => {
        await gulp.src('scss/' + src)
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(gulp.dest('css/'))
            .pipe(touch()) /* fix to update modified time */
    });
};

async function watch() {
    await gulp.series('styles');
    await gulp.watch('./scss/**/*.scss', gulp.series(styles));
};

exports.watch = watch;
exports.styles = styles;
exports.default = gulp.series(styles);
