const fs = require('fs');
const split = require('./split.js');
const compile = require('./compile.js');
const reverse = require('./reverse.js');

module.exports.builder = {
  i: {
    alias: 'iterations',
    default: 1,
    describe: 'number of repeats'
  },
  s: {
    alias: "start",
    default: 0,
    describe: "frame # to start the mirror sequence"
  },
  e: {
    alias: "end",
    default: 10,
    describe: "frame # to end at"
  },
  f: {
    alias: "fromDir",
    describe: 'tile set to turn into an oscillator',
    default: "movie.mov"
  },
  o: {
    alias: "outputDir",
    describe: 'output directory',
    default: "output"
  },
  r: {
    alias: "rate",
    describe: 'data rate for the output video',
    default: "2500k"
  }
};

// copies a sequence of frames from start to end
function copyInForwardOrder( fromDir, outputDir, start, end, next){
	console.log("copyInForwardOrder: %d to %d  ", start, end)
	for (var i = start; i < end; i++){
		try{
			var fileName = i + ".png"
			var data = fs.readFileSync(fromDir + outputDir,  fileName)
			if (!data)
				return;
			var outputName = next + ".png";
			next++;
			console.log(outputName)
			fs.writeFileSync(outputDir + outputName, data);
		} catch (exc){
			return;
		}
	}
	return next;
}

// makes a repeating seamless sequence of the number of iterations
// probably only have to do 1 iteration in most cases
function reuse(fromDir, outputDir, iterations, start, end){
	var next = 1;
	for (var i = 0; i < iterations; i++){
		next = copyInForwardOrder(fromDir, outputDir, start, end, next)
		next = reverse.copyInReverseOrder(start, end, next)
	}
}

// makes a mirror-sequence from the given place
function makeMirrorSequence(iterations, start, end, fromDir, outputDir){
	reuse(fromDir, outputDir, iterations, start, end);
	compile.fromTiles(fromDir, outputDir);
}

module.exports.handler = (argv) => {
  makeMirrorSequence(argv.i, argv.s, argv.e, argv.f, argv.o);
};
