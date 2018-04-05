const conf = require('./gulp.conf');
var proxy = require('http-proxy-middleware');
var api = proxy('/appsummary/', {target: 'http://116.62.162.198:8080/', changeOrigin: true, logLevel: 'debug'});

module.exports = function () {
  return {
    server: {
      baseDir: [
        conf.paths.tmp,
        conf.paths.src
      ],
      middleware: [api]
    },
    open: 'external'
  };
};
