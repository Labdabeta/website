const http         = require('http'),
      fs           = require('fs'),
      path         = require('path'),
      contentTypes = require('./utils/content-types'),
      sysInfo      = require('./utils/sys-info'),
      env          = process.env;

function err404(res, code) {
    res.writeHead(404, {"Content-Type": "text/html"});
    fs.readFile('./static/'+code+'/html404.html', function (err, data) {
        if (err) {
            res.write("<p><b>404 - page not found. </b></p>" + 
                    "<p><b>Also 404 error page not found. Ok I wont lie, this is bad!</b></p>",
                    function (err) { res.end(); });
        } else {
            res.write(data, function (err) { res.end(); });
        }
    });
}

let server = http.createServer(function (req, res) {
  let url = req.url;
  if (url == '/') {
    url += 'en/index.html';
  }

  // IMPORTANT: Your application HAS to respond to GET /health with status 200
  //            for OpenShift health monitoring

  if (url == '/health') {
    res.writeHead(200);
    res.end();
  } else if (url.indexOf('/info/') == 0) {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-cache, no-store');
    res.end(JSON.stringify(sysInfo[url.slice(6)]()));
  } else {
    fs.readFile('./static' + url, function (err, data) {
      if (err) {
        if (url.startsWith('/fr')) { err404(res,'fr'); }
        else if (url.startsWith('/eo')) { err404(res,'eo'); }
        else { err404(res,'en'); }
      } else {
        let ext = path.extname(url).slice(1);
        res.setHeader('Content-Type', contentTypes[ext]);
        if (ext === 'html') {
          res.setHeader('Cache-Control', 'no-cache, no-store');
        }
        res.end(data);
      }
    });
  }
});

server.listen(env.NODE_PORT || 3000, env.NODE_IP || 'localhost', function () {
  console.log(`Application worker ${process.pid} started...`);
});
server.listen(8080); //for testing purposes
