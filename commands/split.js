'use strict';
var exec = require('child_process').exec;
var fs = require('fs');

module.exports.builder = {
  f: {
    alias: 'fileName',
    default: 'movie.mov',
    describe: 'split a movie into its component frames'
  },
  o: {
    alias: "outputDir",
    default: "output",
    describe: "a directory to put the frames in, will create if doesn't exist"
  }
};

function toTiles(fileName, outputDir, callback){
	try{
    const string = `ffmpeg -r 24 -i ${fileName} ${outputDir}/%d.png`;
    console.log(string);
    exec(string, function (error, stdout, stderr) {
			    console.log('stdout: ' + stdout);
			    console.log('stderr: ' + stderr);
			    if (error !== null) {
			      console.log('exec error: ' + error);
				}
				callback(fileName);
			});
	}catch (exc){
		  console.log(exc);
	}
};

module.exports.handler = (argv) => {
  toTiles(argv.f, argv.o, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("converted to tiles")
    }
  });
};
module.exports.toTiles = toTiles;
