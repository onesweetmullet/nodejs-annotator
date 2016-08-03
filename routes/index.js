var express = require('express')
  router = express.Router(),
  request = require('request');

var options = {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36'
  }
};

/* GET home page. */
router.get('/', function(req, res, next) {

  options.url = "http://www.imdb.com";

  if (req.query.url)
    options.url = req.query.url;

  request(options, function(error, response, html) {
    if (error)
      res.status(500).json(error);

    console.log('here');

    res.render('index', { title: 'Express', pageContent: html });
  });


});

module.exports = router;
