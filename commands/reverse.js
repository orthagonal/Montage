'use strict';
const split = require('./split.js');
const compile = require('./compile.js');
const fs = require('fs');
var async = require('async');
var _ = require('lodash');

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
function copyInReverseOrder(fromDir, outputDir, start, end, next){
	console.log("copyInReverseOrder: %d to %d  ", start, end)
	for (var i = end; i >= start; i--){
		try{
			console.log("inputting %d", i)
			var fileName = i + ".png"
			var data = fs.readFileSync(fromDir + fileName)
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

function reverseVideo(infile, outfile, inputDir, outputDir, rate, allDone){
  async.auto({
    delete: (callback) => {
      deleteAll(inputDir);
      deleteAll(outputDir);
      callback();
    },
    tiles: ['delete', (result, callback) => {
      split.toTiles(infile, outputDir, callback);
    }],
		reverse: ['tiles', (result, callback) => {
			fs.readdir(inputDir, function(err, files){
				copyInReverseOrder( 1, files.length, 1);
				compile.fromTiles(outputDir, outfile, rate, callback);
			});
		}]
  });
}

function deleteAll(inputDir){
	var files = fs.readdir(inputDir)
	_.each(files, function(file){
		fs.unlinkSync(file);
	})
}

module.exports.handler = (argv) => {
  reverseVideo(argv.f, argv.d, argv.i, argv.o, argv.r, (err) => {
    console.log("converted to tiles")
  });
};
module.exports.reverseVideo = reverseVideo;
module.exports.copyInReverseOrder = copyInReverseOrder;
module.exports.deleteAll = deleteAll;
