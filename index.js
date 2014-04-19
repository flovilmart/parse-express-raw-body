var Buffer = require("buffer").Buffer;
module.exports = function () {
  return function parseExpressRawBody(req, res, next) {

    // Skip if express.BodyParser already parsed the body.
    // Express uses this _body flag to keep track of whether the request body
    // is already parsed so that it only gets parsed once.
    if (req._body) {
      return next();
    }

    var buf = new Buffer(0);

    // Flag as parsed
    req._body = true;

    req.on('data', function(chunk) {
      buf = Buffer.concat([buf, chunk]);
    });

    req.on('end', function() {
      req.body = buf;
      next();
    });
  };
}
