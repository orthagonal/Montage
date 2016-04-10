'use strict';
const split = require('./split.js');
const compile = require('./compile.js');


module.exports.builder = {
  f: {
    alias: 'fileName',
    default: 'movie.mov',
    describe: 'the movie to reverse'
  },
  d: {
    alias: 'destination',
    default: 'outMovie.mp4',
    describe: 'name of the output movie'
  },
  i: {
    alias: "inputDir",
    default: "input",
    describe: "a directory to put the frames in, will create if doesn't exist"
  },
  o: {
    alias: "outputDir",
    default: "output",
    describe: "a directory to put the frames in, will create if doesn't exist"
  }
};

// inverts/renumbers a sequence of frames from start to end
function copyInReverseOrder(start, end, next){
	console.log("copyInReverseOrder: %d to %d  ", start, end)
	for (var i = end; i >= start; i--){
		try{
			console.log("inputting %d", i)
			var fileName = i + ".png"
			var data = fs.readFileSync(inputDir + fileName)
			if (!data)
				return;
			var outputName = next + ".png";
			next++;
			console.log(outputName)
			fs.writeFileSync(outputDir + outputName, data);
		} catch(exc){
			return;
		}
	}
	return next;
}

function reverseVideo(infile, outfile, inputDir, outputDir, allDone){
  async.auto({
    delete: (callback) => {
      deleteAll(inputDir);
      deleteAll(outputDir);
      callback();
    },
    tiles: ['delete', (callback) => {
      split.toTiles(infile, outputDir, callback);
    }],
		reverse: ['tiles', (callback) => {
			fs.readdir(inputDir, function(err, files){
				copyInReverseOrder( 1, files.length, 1);
				compile.fromTiles(outputDir, outfile, callback);
			});
		}]
  });
}

module.exports.handler = (argv) => {
  reverseVideo(argv.f, argv.d, argv.i, argv.o, (err) => {
    console.log("converted to tiles")
  });
};
module.exports.reverseVideo = reverseVideo;
module.exports.copyInReverseOrder = copyInReverseOrder;
