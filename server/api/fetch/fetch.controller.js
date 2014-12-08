'use strict';

var _ = require('lodash');
var request = require('request');
var fs = require("fs");
var cheerio = require('cheerio');
var path = require("path");
var uuid = require('node-uuid');
var config = require('../../config/environment');
var urlparser = require('url');

/**
 * Fetching meta information of a URL
 *
 * @param req
 * @param res
 */
exports.fetch = function(req, res) {
  var url = req.param('url');

  // auto-prefix http in case it's missing
  if(url.indexOf('http') === -1) {
    url = 'http://'+url;
  }

  // request html page, parse its content, return some json
  request({
      uri:url,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2049.0 Safari/537.36'
      }
    },
    function(err, resfetcher, html){
      if(err) { return handleError(resfetcher, err); }

      var $,
          ogimage,
          image,
          parsedUrl,
          imageUrl,
          title,
          extension = '',
          fileName = '',
          uniqueName = '',
          data = { title:'', imageUrl:'', uuid:'' };

      console.log(resfetcher.headers['content-type']);
      var pattern = /text\/html(;.*)?/i;
      if(resfetcher.headers['content-type'].match(pattern)) {
        // todo for some reason, unicode characters break, even when converting all the things to utf8
        $ = cheerio.load(html);

        // fetch the <title> element's content
        title = $('title').html();
        if(title !== '') {
          data.title = title.trim();
        }

        // fetch the og:image or first image of the page
        ogimage = $('meta[property="og:image"]').attr('content');
        image = $('img').attr('src');

        // Download image to our server
        if(ogimage !== undefined || image !== undefined) {
          imageUrl = ogimage || image || '';

          // grab the extension and get us a unique file
          parsedUrl = urlparser.parse(imageUrl);
          extension = sanitizeExtension(path.extname(parsedUrl.path));
          uniqueName = uuid.v4();
          fileName = uniqueName + extension;

          // slurrppp download...
          download(imageUrl, fileName, function() {
            data.imageUrl = '/uploads/' +fileName;
            data.uniqueName = uniqueName;

            return res.json(201, data);
          });
        } else {
          return res.json(201, data);
        }
      } else {
        return res.json(201, data);
      }
  });
};

var sanitizeExtension = function(extension) {
  var bang = [];
  bang = extension.split('?');
  return bang[0];
}

/**
 * Download an image to server
 *
 * @param uri
 * @param filename
 * @param callback
 */
var download = function(uri, filename, callback){
  var destinationDir = config.assetsUploadDir,
    fileDestination = destinationDir + filename;

  request.head(uri, function(err, res, body){

    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    var pattern = /image\/(gif|jpeg|png|jpg)(;.*)?/i;
    if(res.headers['content-type'].match(pattern)) {
      console.log(uri);
      request(uri).pipe(fs.createWriteStream(fileDestination)).on('close', callback);
    }
  });
};

function handleError(res, err) {
  return res.send(500, err);
}