var fs = require('fs');

var takeScreenshot = function(specName) {
  var dir = 'tests/screenshots/';
  var name = specName.split(' ').join('_');

  if (!fs.existsSync(dir)) fs.mkdirSync(dir);

  browser.takeScreenshot().then(function(png) {
    var stream = fs.createWriteStream(dir + name + '.png');
    stream.write(new Buffer(png, 'base64'));
    stream.end();
  });
};


module.exports = takeScreenshot;
