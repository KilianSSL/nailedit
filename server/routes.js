/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/uploads', require('./api/upload'));
  app.use('/api/votes', require('./api/vote'));
  app.use('/api/comments', require('./api/comment'));
  app.use('/api/articles', require('./api/article'));
  app.use('/api/users', require('./api/user'));
  app.use('/api/fetch', require('./api/fetch'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
