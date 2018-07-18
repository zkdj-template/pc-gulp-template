/**
 * Created by leo on 2017/3/30.
 */
var  gulp = require('gulp'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    browserSync = require('browser-sync').create(),
    less = require('gulp-less'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    minify = require('gulp-minify'),
    zip = require('gulp-zip'),
    moment = require("moment"),
    ftp = require('gulp-ftp'),
    fileCopy = require('gulp-file-copy'),
    git = require('gulp-git'),
    runSequence = require('run-sequence'),
    argv = require('minimist')(process.argv.slice(2)),
    del = require('del'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    jshint=require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    rename = require("gulp-rename"),
    htmlmin = require('gulp-htmlmin');
//ngAnnotate = require('gulp-ng-annotate');
var path={
    input:{
        html:['src/html/*.html'],
        manage:['src/manage/*.html'],
        js:['src/js/**/*.js'],
        css:['src/css/*.css'],
        img:['src/images/**'],
        data:['src/data/**'],
        resource:['src/vendor/**/**']
    },
    output:{
        css:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/css',
        js:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/js',
        img:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/images' ,
        html:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/html' ,
        manage:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/manage',
        data: '../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/data',
        resource:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/vendor'
    },
    del:{
        css:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/css',
        js:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/js',
        img:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/images' ,
        html:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/html' ,
        manage:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/manage',
        data: '../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/data',
        resource:'../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/vendor'
    }
};
//HTMl 压缩
gulp.task('minhtml',function(){
    var options = {
        removeComments: false,//清除HTML注释
        collapseWhitespace: false,//压缩HTML
        collapseBooleanAttributes: false,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: false,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: false,//删除<style>和<link>的type="text/css"
        minifyJS: false,//压缩页面JS
        minifyCSS: false//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .on('error',function(error){
            console.log(error.message);
        })
        .pipe(gulp.dest(path.output.html))

});
// less 编译
gulp.task('less', function () {
    return gulp.src('src/css/lessstyle/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/css'));
});
// sass 编译
gulp.task('sass', function () {
    return gulp.src('src/css/sassstyle/*.scss')
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(gulp.dest('src/css'))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.output.css))
});
// css 压缩
gulp.task('mincss',function(){
    return  gulp.src(path.input.css)
        .pipe(gulp.dest(path.output.css))
        .pipe(minifyCss())
        .pipe(gulp.dest(path.output.css))
});
// JS 压缩并混淆加密
gulp.task('minjs',function(){
    /*
     * JShint语法配置
     * http://www.jianshu.com/p/4cb23f9e19d3
     * */
    var jshintConfig={
        asi:true,//忽略缺少;
        strict:false,//不使用严格模式
        eqnull:true,
        eqeqeq: false,
    };

    gulp.src(path.input.js)
        .pipe(jshint(jshintConfig))
        .pipe(jshint.reporter(stylish))
        .pipe(uglify())
        .pipe(gulp.dest(path.output.js))
        .on('error',function (error) {
            console.log(error.message)
        });
        // .pipe(gulp.dest(path.output.js))
});
// JS 语法检查
function Jshit(){
    gulp.src(path.input.js)
        .pipe(jshint())
        .pipe(jshint.reporter())
        .pipe(concat('allindex.js'))
        .pipe(gulp.dest(path.output.js))
}
gulp.task('jshint', Jshit);
// 图片压缩

gulp.task('imgmin',function(){
    return  gulp.src(path.input.img)
        .pipe(imgmin([
            imgmin.gifsicle({interlaced: true}),
            imgmin.jpegtran({progressive: true}),
            imgmin.optipng({optimizationLevel: 5}),
            imgmin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(path.output.img))
});
// 文件copy
function data_copy(){
    gulp.src(path.input.data)
        .pipe(gulp.dest(path.output.data))
}
function manage_copy(){
    gulp.src(path.input.manage)
        .pipe(gulp.dest(path.output.manage))
}
function file_copyResource(){
    gulp.src(path.input.resource)
        .pipe(gulp.dest(path.output.resource))
}
gulp.task('data',data_copy);
gulp.task('manage',manage_copy);
gulp.task('resource',file_copyResource);
// 文件清除，用于每次连续生成DEV的时候，清除原来的
function del_file(path){
    return  del([path])
}
gulp.task('clean',function(){
    del_file('../../gitLab/pj_111_mees/Code/mees/model-web/src/main/resources/static/');
});

/*
 * 实时刷新  connect+watch
 * 不能自动打开浏览器
 *
 * */
gulp.task('connect',function(){
    connect.server({
        root:'src',
        port:9090,
        livereload:true
    });
});
gulp.task('allfile', function () {
    gulp.src('src/**')
        .pipe(connect.reload());
});
gulp.task('watch',function(){
    gulp.watch('src/**',['allfile']);
});
gulp.task('liveport',['connect','watch']);
//   实时监听 browser  支持浏览器窗口弹出
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src/",
            directory: true  // 是否打开文件目录
        }
    });
    gulp.watch("src/**",['minhtml','mincss','sass','minjs','manage','data','imgmin','resource']);
    gulp.watch("src/**").on('change', browserSync.reload);

});
// gulp.task('default',['minhtml','sass','manage','data','minjs','mincss','imgmin','resource']);
gulp.task('default',['minjs']);


