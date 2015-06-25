let dir = './moby/';
let fs = require('fs')
, readline = require('readline')
, _ = require('lodash')

let output = fs.createWriteStream('lines.js', {flags: 'w'});

function makePaths (dir) {
  let paths = fs.readdirSync(dir);
  return paths.filter((element) => {
    return !/README/.test(element);
  }).map((element) => {
    return dir+element;
  })
}

let regex = /(\w+)\s(whale)\s(\w+)/gim;
let paths = makePaths(dir)
// console.log(paths);
let counter = 0;
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
      let entry = {};
      entry[el] = [];
      let i = 1;
      while (i < match.length - 1) {
        entry[el].push(match[i]);
        i++;
      }
      entry = JSON.stringify(match) + '\n';
      //console.log(entry);
      console.log(counter);
      output.write(entry);
    }
  })
})

// fs.readdir(dir, (err, files) => {
// _.each(files, (val, index) => {
// console.log(typeof (dir+val));
// let input = fs.createReadStream(dir+'moby-README.txt');

// // console.log(output)
// // console.log(val)
// // output._write =
//

// // .on('close', function() {
// //   console.log('Process complete');
// //   process.exit(0);
// // })
// // })
// // })

// var ws = fs.createWriteStream('lines.js');
//
// var arr = [1,2,3,4,5]
// _.each(arr, (n) => {
// ws.write('wtf : ' + n + ' / ');
// })
