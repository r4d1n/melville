let fs = require('fs');
let _ = require('lodash');

let targetDir = './moby/';
let output = 'whales.json';


var Transform = require('stream').Transform;


fs.readdir(targetDir, (err, files) => {
  if (err) console.warn(err);
  _.each(files, (val, index) => {
    let rs = fs.createReadStream(targetDir+val)
    // let rs = fs.createReadStream('./moby/moby-007.txt');
    rs.readable = true;
    rs.setEncoding('utf8');

    let ws = fs.createWriteStream('outputs/' + index + '-' + output, {encoding: 'utf8'});
    ws.writeable = true;

    var parser = new Transform({ encoding: 'utf8'});
    parser._transform = function(data, encoding, done) {
      // console.log(whaleWords(data));
      let parsed = JSON.stringify(whaleWords(data))
      this.push(parsed);
      done();
    };

    rs
    .pipe(parser)
    .pipe(ws);
  })
})

//
// // fs.readdir(targetDir, parseFiles);
//
//
//
//     rs.on('error', (err) => {
//       console.warn(err);
//     })
//     rs.on('data', (chunk) => {
//       let data = whaleWords(chunk);
//       // let match = { file : whaleWords(chunk) } ;
//     })
//     .pipe(writeOut);
//     rs.on('end', function() {
//       console.log('rs end')
//       writeOut.end()
//     })
//


function whaleWords(input) {
  // console.log('whale words input: ' + input)
  let entries = [];
  let exec = (/\s(\w+)\s(whale)\b(\w+)\s/gim.exec(input));
  if (exec) {
    // console.log(exec)
    let i = 1;
    while (i < exec.length) {
      entries.push(exec[i]);
      i++;
    }
  }
  return entries;
}
