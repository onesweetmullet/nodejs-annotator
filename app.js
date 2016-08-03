var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    routes = require('./routes/index'),
    users = require('./routes/users'),
    httpProxy = require('http-proxy');

var app = express();

//var proxy = httpProxy.createProxyServer({ secure: false });
//var scriptElm = '<script src="test.js"></script>';
//
//function modifyHtml( str ) {
//  // Add or script to the page
//  var myHeaderDiv = '<div id="#nodejs-annotator-header">this is my header</div>';
//  var myFooterDiv = '<div id="#nodejs-annotator-footer">this is my footer</div>';
//
//  // inject a header
//  if (str.indexOf('<body>') > -1) {
//    str = str.replace('<body>', '<body>' + myHeaderDiv);
//  }
//
//  // inject a footer
//  if( str.indexOf( '</body>' ) > -1 )
//    str = str.replace( '</body>', myFooterDiv + '</body>' );
//
//  // inject test.js
//  if( str.indexOf( '</body>' ) > -1 ) {
//    str = str.replace( '</body>', scriptElm + '</body>' );
//  } else if ( str.indexOf( '</html>' ) > -1 ){
//    str = str.replace( '</html>', scriptElm + '</html>' );
//  } else {
//    str = str + scriptElm;
//  }
//
//  return str;
//}
//
//proxy.on( 'proxyRes', function ( proxyRes, request, response ) {
//  if( proxyRes.headers &&
//      proxyRes.headers[ 'content-type' ] &&
//      proxyRes.headers[ 'content-type' ].match( 'text/html' ) ) {
//
//    var _end = response.end,
//        chunks,
//        _writeHead = response.writeHead,
//        _write = response.write;
//
//    response.writeHead = function(){
//      if( proxyRes.headers && proxyRes.headers[ 'content-length' ] ){
//        response.setHeader(
//            'content-length',
//            parseInt( proxyRes.headers[ 'content-length' ], 10 ) + scriptElm.length
//        );
//      }
//
//      // This disables chunked encoding
//      response.setHeader( 'transfer-encoding', '' );
//
//      // Disable cache for all http as well
//      response.setHeader( 'cache-control', 'no-cache' );
//
//      _writeHead.apply( this, arguments );
//    };
//
//    response.write = function( data ) {
//      if( chunks ) {
//        chunks += data;
//      } else {
//        chunks = data;
//      }
//    };
//
//    response.end = function() {
//      if( chunks && chunks.toString )
//        _write.apply( this, [ modifyHtml( chunks.toString() ) ] );
//      _end.apply( this, arguments );
//    };
//  }
//});
//
//app.enable('trust proxy');
//
//app.use(function(req, res, next) {
//  console.log('inside app.use() middleware');
//
//  proxy.web(req, res, { target: 'https://www.cnn.com'}, function(e) {
//    if (e)
//      res.status(500).json(e);
//  });
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
