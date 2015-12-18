module.exports = function(req, res, next) {
  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  if (req.headers.authorization ) {
    var token = req.headers.authorization.split(' ')[1];
    if (token) {
      require('request').get({
        uri: 'https://186.33.210.56:9000/o/validate_token/' + token,
        headers:{'content-type': 'application/x-www-form-urlencoded', 'Authorization': 'Credential BEEeD62Nwr7fGQGIEsv2pcHgCRBcIRHNYi2WbC0P t.CuVCxUMm?YzaXt;!C@39vIqTkLy9xz:vc;r@lHbc2dY3hiwv!cBqQrb6OV7.RYRAaroQ5zXLboGzlXOO5STJUflGuW:rptCrIXXbpiDYVr92vu6@=m87w.oKJvs@:j'},
      }, function(err, response, body) {
          if (err) {
            return res.forbidden('You are not permitted to perform this action.');
          }
          var data = JSON.parse(body);
          if (data.is_valid) {
            return next();
          } else {
            return res.forbidden('You are not permitted to perform this action.');
          }
      });
    } else {
      return res.forbidden('You are not permitted to perform this action.');
    }
  }  else {
    return res.forbidden('You are not permitted to perform this action.');
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)

};
