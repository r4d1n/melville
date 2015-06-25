let fs = require('fs')
, readline = require('readline')
, _ = require('lodash')

let output = fs.createWriteStream('whales.json', {flags: 'w'});

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let directory = './text/mobydick/';

function makePaths (dir) {
  let paths = fs.readdirSync(dir);
  return paths.filter((element) => {
    return !/README/.test(element);
  }).map((element) => {
    return dir+element;
  })
}

function formatJSON (key, val) {

}

function run (pattern, dir, target) {
  let counter = 0;
  let paths = makePaths(dir)
  _.each(paths, (el) => {
    let input = fs.createReadStream(el);
    let rl = readline.createInterface({
      input: input,
      output: output,
      terminal: false
    });

    rl.on('line', function(line) {
      let match = regex.exec(line);
      if (match) {
        counter++;
        console.log(counter);
        let entry = {};
        entry[el] = [];
        let i = 1;
        while (i < match.length - 1) {
          entry[el].push(match[i]);
          i++;
        }
        entry = JSON.stringify(match) + '\n';
        output.write(entry);
      }
    })
  })
}

run(regex, directory, output);
