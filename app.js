'use strict';

// Node modules
const fs = require('fs'),
    request = require('request'),
    progress = require('request-progress'),
    imagemin = require('imagemin'),
    imageminMozjpeg = require('imagemin-mozjpeg'),
    imageminPngquant = require('imagemin-pngquant');

// Console text colors
const fontColors = {
    red: '\x1b[31m%s\x1b[0m',
    green: '\x1b[32m%s\x1b[0m',
    yellow: '\x1b[33m%s\x1b[0m',
    magenta: '\x1b[35m%s\x1b[0m'
};

// Get current system date and time
function getDateTime() {
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    var year = date.getFullYear();

    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;

    var day = date.getDate();
    day = (day < 10 ? "0" : "") + day;

    return year + "-" + month + "-" + day + "-" + hour + "-" + min + "-" + sec;
}

// Create new directory base on current system date and time
const baseDirectory = './',
    currentDateAndTime = getDateTime();

function createDirectory(callback) {
    fs.mkdirSync(baseDirectory + currentDateAndTime);
    callback();
}

// Get URLs list from .txt file
const urlList = fs.readFileSync('./list.txt').toString().split("\r\n");

// Download images from URLs
function downloadImages() {
    var download = function (url, destination, callback) {
        progress(request.get(url), {
                throttle: 10000,
            })
            .on('error', function (error) {
                console.log(fontColors.red, error);
            })
            .on('progress', function (state) {
                console.log('progress', state);
            })
            .pipe(fs.createWriteStream(destination))
            .on('close', callback);
    };

    urlList.forEach(function (string) {
        var filenameFromUrl = string.split('/').pop();
        var filename = baseDirectory + currentDateAndTime + '/' + string.split('/').pop();
        console.log(fontColors.yellow, '\n✔ Rozpoczęcie pobierania pliku\n' + filenameFromUrl + '\n');
        download(string, filename, function () {
            console.log(fontColors.green, '\n✔ POBIERANIE ZAKOŃCZONE\n' + filename + '\n');
            compressImages(filenameFromUrl);
        });
    });
}

// Compress images function doing after download files
function compressImages(file) {
    imagemin([baseDirectory + currentDateAndTime + '/' + file], baseDirectory + currentDateAndTime + '_compressed', {
        plugins: [
        imageminMozjpeg({
                targa: false
            }),
        imageminPngquant({
                quality: '80'
            })
    ]
    }).then(files => {
        console.log(fontColors.magenta, '\n✔ KOMPRESJA ZAKOŃCZONA\n' + baseDirectory + currentDateAndTime + '/' + file + '\n');
    });
}

createDirectory(downloadImages);