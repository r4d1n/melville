let fs = require('fs')
, readline = require('readline')
, _ = require('lodash')

let target = 'whales.json';
let output = fs.createWriteStream(target, {flags: 'w'});
let append = fs.createWriteStream(target, {flags: 'a'});

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let directory = './text/mobydick/';
let bigArr = [];

function makePaths (dir) {
  let paths = fs.readdirSync(dir);
  return paths.filter((element) => {
    return !/README/.test(element);
  }).map((element) => {
    return dir+element;
  })
}

function run (pattern, dir, cb) {
  let counter = 0;
  let paths = makePaths(dir)
  _.each(paths, (el) => {
    let input = fs.createReadStream(el);
    let rl = readline.createInterface({
      input: input,
      //output: output,
      terminal: false
    });

    rl.on('line', function(line) {
      let obj = {};
      let match = regex.exec(line);
      if (match) {
        counter++;
        let chapter = /moby-(\d+)/.exec(el)[1];
        obj["match #" + counter] = {};
        //console.log(counter);
        let entry = { chapter, words : []}
        let i = 1;
        while (i < match.length) {
          entry.words.push(match[i]);
          i++;
        }
        entry.chapter = chapter;
        obj["match #" + counter] = entry;
        if (counter === 1) {
          output.write("\n" + JSON.stringify(obj)); 
        } else {
          output.write("\n," + JSON.stringify(obj)); 
        }
      }
    })
    if (el === paths[paths.length - 1]) rl.close();
  })
  if (cb) cb();
}

output.write('[', run(regex, directory, () => {
  append.write(']', () => {
    console.log('finished');
  });
}));

//append.write('aslkjfla;sjfl;kasjflk;ajsfdasa', console.log(this));
