let fs = require('fs')
, _ = require('lodash')
, split = require('split')
, util = require('./util')

let target = 'whales.json';

//let append = fs.createWriteStream(target, {flags: 'a'});

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let directory = './text/mobydick/';

let rs = fs.createReadStream(directory+'moby-009.txt')
//let ws = fs.createWriteStream(target, {flags: 'w'});
let ws = fs.createWriteStream('test.txt', {flags: 'w'});

//rs.pipe(ws);
let counter = 0;
let matches = [];

rs
.pipe(split())
.on('data', (chunk) => {
  let obj = {};
  let match = regex.exec(chunk);
  if (match) {
    counter++;
    //let chapter = /moby-(\d+)/.exec(el)[1];
    let chapter = '009';
    obj["match #" + counter] = {};
    //console.log(counter);
    //let entry = { chapter, words : []}
    let entry = {match: counter, chapter : chapter, words: []};
    let i = 1;
    while (i < 4) {
      entry.words.push(match[i]);
      i++;
    }
    matches.push(entry);
  }
})
.on('end', () => {
  ws.write(JSON.stringify(matches))
})
