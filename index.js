const request = require('request');
const cookie = require("cookie");
const publicIp = require('public-ip');

var username; // = '<your username>';
var password; // = '<your password>';
var domain; // = '<your domain>'; // like yourname.dlinkddns.com

function getCookies(res){
  res.responseCookies = {};
  if (res.headers.hasOwnProperty('set-cookie')) {
    res.headers['set-cookie'].forEach(function(c) {
        var parsedCookie = cookie.parse(c);
        var eq_idx = c.indexOf('=');
        var key = c.substr(0, eq_idx).trim()
        parsedCookie.value = parsedCookie[key];
        delete parsedCookie[key];
        res.responseCookies[key] = parsedCookie;
    });
  }
  return res.responseCookies;
}

publicIp.v4().then(iptoSet => {
  console.log(iptoSet);
  var opts = {
    url: 'https://www.dlinkddns.com/login/?next=/',
    timeout: 120000,
    method: 'GET',
    headers: {},
    encoding: null,
    maxRedirects: 21 
  };
  var csrf;
  request(opts, function(err, res, body){
    if(err){
      return console.log(err);
    }
    var cookies = getCookies(res)     
    csrf = cookies.csrftoken;
  
    var payload = 'csrfmiddlewaretoken=' + csrf.value + '&username=' + username + '&password=' + password + '&login_submit=Log%20In';
    var opts2 = 
    { 
      url: 'https://www.dlinkddns.com/login/?next=/',
      timeout: 120000,
      method: 'POST',
      headers:
      { accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
        cookie: 'csrftoken=' + csrf.value,
        'Content-Length': payload.length,
        'Content-Type': 'application/x-www-form-urlencoded' },
      encoding: null,
      maxRedirects: 21,
      body: payload 
    };
    request(opts2, function(err, res, body){
      if(err){
        return console.log(err);
      }
      var sessionId;
      var cookies = getCookies(res);
      if(cookies.csrftoken){
        csrf = cookies.csrftoken;
      }
      if(cookies.sessionid) {
        sessionId = cookies.sessionid;
      }
  
      var payload2 = 'csrfmiddlewaretoken=' + csrf.value + '&ip=' + iptoSet + '&commit=save';
      var opts3 = { 
        url: 'https://www.dlinkddns.com/host/' + domain + '.dlinkddns.com',
        timeout: 120000,
        method: 'POST',
        headers:
        { accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-US,en;q=0.9,th;q=0.8',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
          cookie: 'csrftoken=' + csrf.value + ';sessionid=' + sessionId.value,
          'Content-Length': payload2.length,
          'Content-Type': 'application/x-www-form-urlencoded' },
        encoding: null,
        maxRedirects: 21,
        body: payload2 
      };
  
      request(opts3, function(err, res, body){
        if(err){
          return confirm.log(err);
        }
      });
    });
  });
});


