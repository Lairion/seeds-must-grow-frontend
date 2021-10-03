const express = require('express');
const app = express();
const expressStaticGzip = require("express-static-gzip");
const port = 3000

var fs = require('fs');
var sys = require('sys');

app.use(
    '/build/static',
    expressStaticGzip('build/static', {
      enableBrotli: true,
      orderPreference: ['br', 'gz'],
      setHeaders: function (res, path) {
        res.setHeader("Cache-Control", "public, max-age=31536000");
      }
    })
);
app.set("view options", {layout: false});
app.use(express.static(__dirname +"/build"));
app.get('/', function(req, res){
    res.render('/build/index.html');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
