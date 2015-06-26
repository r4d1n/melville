let fs = require('fs');

module.exports = {
  makePaths: function (dir) {
    let paths = fs.readdirSync(dir);
    return paths.filter((element) => {
      return !/README/.test(element);
    }).map((element) => {
      return dir+element;
    })
  }
}
