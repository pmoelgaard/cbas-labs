'use strict';

module.exports = function(server) {
  var router = server.loopback.Router();
  router.get('/system/status', server.loopback.status());
  server.use(router);
};
