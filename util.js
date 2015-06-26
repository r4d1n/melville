module.exports = {
  // Promise wrapper from Kyle Simpson's book
  // https://github.com/getify/You-Dont-Know-JS/blob/master/async%20%26%20performance/ch3.md
  Promisify : function (fn) {
    return function() {
      var args = [].slice.call( arguments );
      return new Promise (function(resolve,reject) {
        fn.apply(
          null,
          args.concat( function(err,v){
            if (err) {
              reject( err );
            }
            else {
              resolve( v );
            }
          } )
        );
      });
    };
  },

  makePaths: function (dir) {
    let paths = fs.readdirSync(dir);
    return paths.filter((element) => {
      return !/README/.test(element);
    }).map((element) => {
      return dir+element;
    })
  }

}
