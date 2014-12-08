'use strict';

var _ = require('lodash');
var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");
var uuid = require('node-uuid');
var config = require('../../config/environment');

/**
 * Creates a new upload
 *
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
exports.create = function (req, res, next) {
  var fileName = '',
      uniqueName = '',
      extension = '',
      uploadPath = path.normalize(config.dataDir + '/uploads'),
      file = req.files.file,
      responseData = {};

  // catch too big files
  if(file.size > config.maxUploadSize) {
    return res.json(200, {error:'too big'});
  }

  // grab the extension and get us a unique file
  extension = path.extname(file.name);
  uniqueName = uuid.v4();
  fileName = uniqueName + extension;

  // actually move the file in place and reply with a public URL for preview
  moveUploadedFile(file,fileName, function() {
      responseData = {
        success:true,
        imageUrl:'/uploads/' + fileName,
        uniqueName:uniqueName
      };
      return res.send(responseData);
    },
    function() {
      responseData = {
        error:'Problem copying the file!'
      };
      return res.send(responseData);
    });
};

/**
 * Deletes a file from filesystem
 *
 * @param req
 * @param res
 */
exports.destroy = function(req, res) {
  var uuid = req.params.uuid,
      dirToDelete = config.assetsUploadDir + uuid,
      responseData = {};

  // go home file, you're drunk :)
  fs.unlink(dirToDelete, function(error) {
    handleError(res,error);

    responseData = {
      success:true
    };

    return res.send(responseData);
  });
};

/**
 * move a file
 *
 * @param destinationDir
 * @param sourceFile
 * @param destinationFile
 * @param success
 * @param failure
 */
function moveFile(destinationDir, sourceFile, destinationFile, success, failure) {
  mkdirp(destinationDir, function(error) {
    var sourceStream, destStream;
    if (error) {
      console.error('Problem creating directory ' + destinationDir + ": " + error);
      failure();
    }
    else {
      sourceStream = fs.createReadStream(sourceFile);
      destStream = fs.createWriteStream(destinationFile);
      sourceStream
        .on("error", function(error) {
          console.error('Problem copying file: ' + error.stack);
          failure();
        })
        .on("end", success)
        .pipe(destStream);
    }
  });
}

/**
 * move an uploaded file
 *
 * @param file
 * @param filename
 * @param success
 * @param failure
 */
function moveUploadedFile(file, filename, success, failure) {
  var destinationDir = config.assetsUploadDir,
    fileDestination = destinationDir + filename;
  moveFile(destinationDir, file.path, fileDestination, success, failure);
}

function handleError(res, err) {
  return res.send(500, err);
}