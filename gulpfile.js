var gulp = require('gulp');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

var jsFiles = ['*.js', 'src/**/*.js'];

//Task that checks the code for errors, quality and style
gulp.task('lint', function () {
    //The return means that we return this stream so that it can be used as a subtask in other tasks.
    return gulp.src(jsFiles)
        .pipe(eslint())
        .pipe(eslint.format());
});


//Task to inject css and js files in the html files
//Uses gulp-inject and wiredep
gulp.task('inject', function () {
    var wiredep = require('wiredep').stream;
    var inject = require('gulp-inject');

    var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {
        //This read: false property does so that the files are not read but just the file names. 
        //We do only need the file names and are not interested in the content. 
        read: false
    });
    var injectOptions = {
        ignorePath: '/public'
    };

    var options = {
        /*
        Wiredep needs to know where to find the main bower.json and also where the bower packages are installed.
        Wiredep reads the main bower.json and then goes to the bower.json for each of the packages 
        installed with bower. It looks at the package bower.json and inject the files listed there in the main.
        Wiredep also iterates through the dependencies found in each bower.json file.
        For both bootstrap and front awesome we need to overwrite the main so that also the css-files are injected.
        The overwrite is done in ./bower.json.
        */
        bowerJson: require('./bower.json'),
        directory: './public/lib',
        //ignorePath removes this part of the file path when it is injected in the destination file. 
        //This part of the file path is not needed as our public folder is static. 
        ignorePath: '../../public/'
    };

    return gulp.src('./src/views/*.ejs')
        .pipe(wiredep(options))
        .pipe(inject(injectSrc, injectOptions))
        .pipe(gulp.dest('./src/views'));
});

//Will run the tasks lint and inject and then the task serve
//Uses gulp-nodemon
gulp.task('serve', ['lint', 'inject'], function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting...');
        });
});