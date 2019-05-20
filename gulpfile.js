'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const rsync = require('gulp-rsync');

const sassFiles = [
    'app-engine-blueberry.scss',
    'blueberry.scss',
    'simple-error.scss',
];

const rsyncConfig = {
    root: 'dist/',
    username: 'rensatsu',
    hostname: 'zumfut.rencloud.xyz',
    destination: '/var/www/sites/static/css/',
    archive: true,
    silent: false,
    compress: true,
    port: 19348,
    clean: true,
};

async function styles() {
    await sassFiles.forEach(async (src) => {
        await gulp.src('scss/' + src)
            .pipe(sass({
                outputStyle: 'compressed'
            }).on('error', sass.logError))
            .pipe(gulp.dest('dist/'));
    });
};

async function deploy() {
    await gulp.src('dist/**')
        .pipe(rsync(rsyncConfig));
    console.log('Deploy finished');
};

async function watch() {
    await gulp.series('styles', 'deploy');
    await gulp.watch('./scss/**/*.scss', gulp.series(styles, deploy));
};

exports.watch = watch;
exports.deploy = deploy;
exports.styles = styles;
exports.default = gulp.series(styles, deploy);
