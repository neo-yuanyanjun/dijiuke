/**
 * @file upload tst
 * @author Yuan Yanjun
 */

var express = require('express');
var router = express.Router();
var multer = require('multer');

var uploading = multer({
    dest: __dirname + '../public/uploads/',
    limits: {fileSize: 1000000, files: 1}
});

router.post('/', uploading, function (req, res) {
    res.JSON({test: 'test'});
});

module.exports = router;
