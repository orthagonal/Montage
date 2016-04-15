'use strict';
var fs = require('fs');
module.exports.builder = {
  r: {
    alias: "rate",
    default: "2500",
    describe: "date rate"
  },
  f: {
    alias: 'fileName',
    default: 'movie.mov',
    describe: 'split a movie into its component frames'
  },
  i: {
    alias: "inputDir",
    default: "input",
    describe: "source directory for the frames"
  }
};
// convert a set of frames to a video:
function fromTiles(dir, fileName, rate, callback){
	if (fs.existsSync(fileName))
			fs.unlinkSync(fileName);
	try{
		var string = `ffmpeg -r 24 -i ${dir} %d.png -b ${rate}k -codec:v libx264 ${fileName}`;
		console.log(string)
		exec(string,
			function (error, stdout, stderr) {
	    	console.log('stdout: ' + stdout);
			  console.log('stderr: ' + stderr);
			  if (error !== null) {
			    console.log('exec error: ' + error);
				}
				callback(error);
			}
		);
	}catch (exc){
		console.log(exc);
	}
}

module.exports.fromTiles = fromTiles;
module.exports.handler = (argv) => {
  fromTiles(argv.i, argv.f, argv.r, (err) => {
    console.log("converted to tiles")
  });
};
