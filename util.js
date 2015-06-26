let fs = require('fs');

module.exports = {

  makePaths: function (dir) {
    let paths = fs.readdirSync(dir);
    return paths.filter((element) => {
      return !/README/.test(element);
    }).map((element) => {
      return dir+element;
    })
  },

  getMatches: function (chunk, path, regex) {
    let match = regex.exec(chunk);
    if (match) {
      let chapter = /moby-(\d+)/.exec(path)[1];
      let entry = {chapter : chapter, words: []};
      let i = 1;
      while (i < 4) {
        entry.words.push(match[i]);
        i++;
      }
      return entry;
    } else {
      return null;
    }
  }

}
