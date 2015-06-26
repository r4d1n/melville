let fs = require('fs')
, _ = require('lodash')
, split = require('split')
, util = require('./util')

let target = 'whales.json';

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let directory = './text/mobydick/';
let ws = fs.createWriteStream(target, {flags: 'w'});

function matchDir (dir, pattern) {
  let files = util.makePaths(dir)
  let matches = [];
  let counter = 0;

  return new Promise((resolve, reject) => {
    function check() {
      if (files.length === 0) {
        // done!
        resolve(matches);
      } else {
        let path = files.shift();
        let rs = fs.createReadStream(path)
        rs
        .pipe(split())
        .on('data', (chunk) => {
          let entry = util.getMatches(chunk, path, pattern);
          if(entry) {
            entry.match = ++counter;
            matches.push(entry);
          }
        })
        .on('end', check);
      }
    }

    if (_.isArray(files)) {
        check();
    } else {
      reject(new Error('no result!'))
    }

  });

}

matchDir(directory, regex).then((matches) => {
  let finalCount = matches.length;
  ws.write(JSON.stringify(matches))
  console.log('parsing complete \n' + finalCount + ' matches found');
}).catch((err) => {
  console.log(err);
})
