let fs = require('fs')
, _ = require('lodash')
, split = require('split')
, util = require('./util')

let target = 'whales.json';

//let append = fs.createWriteStream(target, {flags: 'a'});

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let directory = './text/mobydick/';

//let rs = fs.createReadStream(directory+'moby-009.txt');
let ws = fs.createWriteStream(target, {flags: 'w'});
//let ws = fs.createWriteStream('test.txt', {flags: 'w'});

//rs.pipe(ws);
// function checkFiles(files) {
//   if (files.length > 0) {
//     // do something
//   } else {
//
//   }
// }

function getMatches(chunk, path) {
  let match = regex.exec(chunk);
  if (match) {
    let chapter = /moby-(\d+)/.exec(path)[1];
    //let chapter = '009';
    //console.log(counter);
    //let entry = { chapter, words : []}
    let entry = {chapter : chapter, words: []};
    // let entry = {match: counter, chapter : chapter, words: []};
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

function dirPipe (dir) {
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
          var entry = getMatches(chunk, path);
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
      // resolve(matches);
    }

  });

}

dirPipe(directory).then((matches) => {
  ws.write(JSON.stringify(matches))
  // console.log(matches);
}).catch((err) => {
  console.log(err);
})
