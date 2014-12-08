'use strict';

// Development specific configuration
// ==================================
module.exports = {
  tmpDir:'data/_tmp/',
  assetsUploadDir:'client/assets/uploads/',

  maxUploadSize:(5*1024*1024),

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/redditclone-dev'
  },
  seedDB: true
};
